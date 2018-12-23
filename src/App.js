import React, { Component } from "react";
import Header from "./Header";
import Map from "./Map";
import MapController from "./MapController";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faTimes);

class App extends Component {
  constructor(props) {
    
    super(props);
    this.locations = [
      {
        title: "CGV 대학로",
        location: { lat: 37.583431, lng: 126.999819 }
      },
      {
        title: "탐앤탐스 성균관대점",
        location: { lat: 37.582685, lng: 126.998105 }
      },
      {
        title: "프리미엄 PC",
        location: { lat: 37.582488, lng: 126.99855 }
      },
      {
        title: "맥도날드 성균관대점",
        location: { lat: 37.583365, lng: 126.9988504 }
      },
      {
        title: "포보 쌀국수",
        location: { lat: 37.583306, lng: 126.998548 }
      },
      {
        title: "김가네 대학로본점",
        location: { lat: 37.583306, lng: 126.998548 }
      }
    ];

    this.state.locations = this.locations;
  }

  state = {
    locations: []
  };

  searchLocation(query) {
    if (typeof query !== "undefined" && query !== "") {
      const re = new RegExp(`${query}`, "g");
      const searchLocations = this.locations.filter(loc => {
        return re.test(loc.title);
      });

      return searchLocations;
    } else {
      return [];
    }
  }

  setLocations(locations) {
    this.setState({
      locations: locations
    });
  }

  render() {
    const { locations } = this.state;
    // console.log(locations);

    return (
      <main>
        <Header />
        <MapController
          locations={this.locations}
          searchLocation={this.searchLocation.bind(this)}
          setLocations={this.setLocations.bind(this)}
        />
        <Map locations={locations} />
      </main>
    );
  }
}

export default App;
