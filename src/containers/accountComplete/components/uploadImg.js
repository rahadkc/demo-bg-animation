import React, { Component } from "react";
import crose from "../../../assets/images/icons/crose.svg";

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
  handleRemoveImage = () => {
    this.props.setImage("");
  };

  render() {
    const { thumb } = this.state;
    return (
      <div className={this.props.className}>
        <img src={thumb ? thumb : ""} className="image" alt="imagesss" />
        <label onClick={this.handleRemoveImage} className="inputFile">
          <img src={crose} alt="" />
        </label>
      </div>
    );
  }
}

export default ThumbImg;
