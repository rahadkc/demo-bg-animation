import React, { Component } from "react";
import avatar from "../../assets/images/avatar.svg";

class ThumbImg extends Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { thumb } = this.state;
    return (
      <img
        src={
          thumb
            ? thumb
            : this.props.image !== undefined
            ? this.props.image
            : !this.props.defaultImg
            ? null
            : avatar
        }
        alt=""
        className="image"
      />
    );
  }
}

export default ThumbImg;
