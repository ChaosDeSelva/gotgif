import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

export default class LightboxGif extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      imageObject: this.props.imageObject,
      imagePopupUrl: ''
    };
  }

  render() {
    const { imageObject, isOpen, imagePopupUrl } = this.state;

    return (
      <div>
        <img
          src={imageObject.images.downsized.url}
          alt={imageObject.images.title}
          style={{ width: 300, cursor: "pointer" }}
          onClick={() => this.setState({ imageObject:imageObject, isOpen: true, imagePopupUrl: imageObject.images.original.url })}
          className="infinite-scroll__list-item" />

        {isOpen && (
          <Lightbox
            mainSrc={imagePopupUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}
