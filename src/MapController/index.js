import React, { Component } from "react";
import InfoPanel from "../InfoPanel";
import SearchBar from "../SearchBar";
import "./styles.css";

class MapController extends Component {
  render() {
    const { searchLocation, setLocations, locations, updateInfoPanel } = this.props;

    return (
      <div className="outer-container">
        <SearchBar
          locations={locations}
          setLocations={setLocations}
          searchLocation={searchLocation}
        />
        <InfoPanel updateInfoPanel={updateInfoPanel}/>
      </div>
    );
  }
}

export default MapController;
