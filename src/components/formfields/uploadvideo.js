import React, { Component } from "react";

class ThumbVideo extends Component {
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
      <div className="videoView">
        <video controls autoPlay src={thumb}></video>
      </div>
    );
  }
}

export default ThumbVideo;
