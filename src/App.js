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
        title: "CGV theater",
        description: "My main theater. 주로 가는 영화관",
        location: { lat: 37.583431, lng: 126.999819 }
      },
      {
        title: "Tomntoms coffee 탐앤탐스 성균관대점",
        description: "I usually go here. 자주 가는 카페",
        location: { lat: 37.582685, lng: 126.998105 }
      },
      {
        title: "Premium PC Room 프리미엄 PC방",
        description: "Sometiems I play games here. 종종 가는 PC방",
        location: { lat: 37.582488, lng: 126.99855 }
      },
      {
        title: "Macdonald 맥도날드 성균관대점",
        description: "Sometimes I go. 가끔 가는 맥날",
        location: { lat: 37.583365, lng: 126.9988504 }
      },
      {
        title: "Phobo 포보 쌀국수",
        description: "If I wanna eat cheap pho. 저렴하게 쌀국수 먹고 싶을 때 감",
        location: { lat: 37.583306, lng: 126.998548 }
      },
      {
        title: "Kimkane 김가네 대학로본점",
        description: "When I wanna eat rice simply. 간단히 밥이 먹고 싶을 때 감",
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
      const re = new RegExp(`${query}`, "gi");
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

    return (
      <main>
        <Header />
        <div className="wrapper">
          <MapController
            locations={this.locations}
            searchLocation={this.searchLocation.bind(this)}
            setLocations={this.setLocations.bind(this)}
          />
          <Map locations={locations} />
        </div>
      </main>
    );
  }
}

export default App;
