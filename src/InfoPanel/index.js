import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

    map.dispatchEvent(
      new CustomEvent("update", {
        detail: {
          isShrinked: !isShrinked
        }
      })
    );
  }

  renderCarousel(photos, title) {
    return photos.length > 0 ? (
      <Carousel showThumbs={false}>
        {photos.map((photo, i) => {
          const imgName = `${title} ${i}th image`;
          return (
            <div key={i}>
              <img src={photo.getUrl()} alt={imgName} />
            </div>
          );
        })}
      </Carousel>
    ) : (
      <div style={{ textAlign: "center" }}>No photos here.</div>
    );
  }

  renderPlaceDetail({ name, description, address, call }) {
    if (typeof name !== "undefined" && name !== "") {
      return (
        <div className="detail" aria-label="selected place info">
          <h2 className="name">{name}</h2>
          <p className="description">{description}</p>
          <p className="address">Address: {address}</p>
          <p className="call">Call: {call}</p>
        </div>
      );
    } else {
      return (
        <div
          className="detail"
          aria-label="selected place info"
          style={{ textAlign: "center" }}
        >
          No information here
        </div>
      );
    }
  }

  render() {
    const { photos, placeInfo, isShrinked } = this.state;

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
          <FontAwesomeIcon icon={isShrinked ? "angle-up" : "angle-down"} />
        </button>
        <div className="content">
          {this.renderPlaceDetail(placeInfo)}
          {this.renderCarousel(photos, placeInfo.name)}
        </div>
      </div>
    );
  }
}

export default InfoPanel;
