import React, { Component } from "react";
import "./styles.css";

class Map extends Component {

  constructor(props) {
    super(props);

    this.markers = [];
    this.state = {
      isReady: false
    };
  }

  componentDidMount() {
    const apiKey = "AIzaSyDdgp-igwGeBr-HAaEup3yPB3V2Cxn-58E";
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => {
      this.setState({ isReady: true });
    });

    document.body.appendChild(script);
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

  drawMarkers(locations) {

    this.markers = [];
    for (let i = 0; i < locations.length; i++) {
      let position = locations[i].location;
      let title = locations[i].title;
      let marker = new window.google.maps.Marker({
        map: this.map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: i
      });
      this.markers.push(marker);
    }
  }

  render() {
    return <div id="map" />;
  }
}

export default Map;
