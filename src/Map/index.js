import React, { Component } from "react";
import "./styles.css";
import googleMapApi from "../googlemap-api-key.json";

class Map extends Component {
  constructor(props) {
    super(props);

    this.markers = [];
    this.state = {
      isReady: false,
      isShrinked: false
    };
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      googleMapApi.key
    }&libraries=places`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => {
      this.setState({ isReady: true });
    });

    this.context.addEventListener("update", this.handleUpdate.bind(this));

    document.body.appendChild(script);
  }

  componentWillUnmount() {
    this.context.removeEventListener("update", this.handleUpdate.bind(this));
  }

  componentDidUpdate() {
    if (this.state.isReady && !this.map) {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.584876, lng: 126.998633 },
        zoom: 17,
        mapTypeId: "roadmap"
      });
    }
    this.clearMarkers();
    this.drawMarkers(this.props.locations);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  setPlaceIdThenDraw({ title, location, description }) {
    var request = {
      location: this.map.getCenter(),
      radius: "500",
      query: title
    };

    this.placesService.textSearch(request, (results, status) => {
      let placeId = null;
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        placeId = results[0].place_id;
      }

      const marker = new window.google.maps.Marker({
        map: this.map,
        position: location,
        placeId: placeId,
        title: title
      });
      marker["description"] = description;
      marker.addListener("click", this.handleMarkerClick.bind(this, marker));
      this.markers.push(marker);
    });
  }

  drawMarkers(locations) {
    this.markers = [];
    this.placesService = new window.google.maps.places.PlacesService(this.map);

    for (let i = 0; i < locations.length; i++) {
      this.setPlaceIdThenDraw(locations[i]);
    }
  }

  handleMarkerClick(marker) {
    this.getPlaceInformation(marker.placeId, {
      title: marker.title,
      description: marker.description
    });
  }

  getPlaceInformation(placeId, { title, description }) {
    const infoPanel = window.document.getElementById("info-panel");
    if (placeId !== null) {
      this.placesService.getDetails({ placeId: placeId }, (place, status) => {
        if (status === "OK") {
          infoPanel.dispatchEvent(
            new CustomEvent("update", {
              detail: {
                photos: place.photos,
                placeInfo: {
                  name: title,
                  description: description,
                  address: place.formatted_address,
                  call: place.formatted_phone_number
                }
              }
            })
          );
        }
      });
    } else {
      infoPanel.dispatchEvent(
        new CustomEvent("update", {
          detail: {
            photos: [],
            placeInfo: {
              name: title,
              description: description,
              address: "",
              call: ""
            }
          }
        })
      );
    }
    if (infoPanel.classList.contains("shrink")) {
      const infoPanelOpener = infoPanel.querySelector(".info-panel-opener");
      infoPanelOpener.click();
    }
  }

  handleUpdate(event) {
    this.setState({
      isShrinked: event.detail.isShrinked
    });
  }

  render() {
    return (
      <div
        id="map"
        role="application"
        aria-label="Map displaying location of my neighbors"
        ref={elem => (this.context = elem)}
        className={this.state.isShrinked ? "shrink" : ""}
      />
    );
  }
}

export default Map;
