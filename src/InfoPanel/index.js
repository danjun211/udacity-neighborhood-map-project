import React, { Component } from "react";
// import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./styles.css";

class InfoPanel extends Component {
  state = {
    photos: [],
    isShrinked: true,
    placeInfo: {
      name: "",
      description: "",
      address: "",
      call: ""
    }
  };

  componentDidMount() {
    this.context.addEventListener("update", this.handleUpdate.bind(this));
  }

  componentWillUnmount() {
    this.context.removeEventListener("update", this.handleUpdate.bind(this));
  }

  handleUpdate(event) {
    this.setState({
      photos:
        event.detail.photos && typeof event.detail.photos !== "undefined"
          ? event.detail.photos
          : [],
      placeInfo: event.detail.placeInfo
    });
  }

  handleOpener() {
    const isShrinked = !this.state.isShrinked;

    this.setState({
      isShrinked
    });

    const map = window.document.getElementById("map");

    map.dispatchEvent(new CustomEvent("update", {
        detail: {
          isShrinked: !isShrinked
        }
      }));
  }

  render() {
    const { photos, placeInfo, isShrinked } = this.state;

    const carousel =
      photos.length > 0 ? (
        <Carousel showThumbs={false}>
          {photos.map((photo, i) => {
            const imgName = `${placeInfo.title} ${i}th image`;
            return (
              <div key={i}>
                <img src={photo.getUrl()} alt={imgName}/>
              </div>
            );
          })}
        </Carousel>
      ) : (
        ""
      );

    return (
      <div
        id="info-panel"
        className={isShrinked ? "shrink" : ""}
        ref={elem => (this.context = elem)}
      >
        <button
          className="info-panel-opener"
          onClick={this.handleOpener.bind(this)}
        >
          open
        </button>
        <div className="content">
          <div className="detail" aria-label="selected place info">
            <h2 className="name">{placeInfo.name}</h2>
            <p className="description">{placeInfo.description}</p>
            <p className="address">Address: {placeInfo.address}</p>
            <p className="call">Call: {placeInfo.call}</p>
          </div>
          {carousel}
        </div>
      </div>
    );
  }
}

export default InfoPanel;
