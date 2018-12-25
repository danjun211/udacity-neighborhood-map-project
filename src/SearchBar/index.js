import React, { Component } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchBar extends Component {
  state = {
    searchResult: []
  };

  renderSearchResult() {
    const { searchResult } = this.state;
    const { setLocations } = this.props;

    return (
      <div className="search-result">
        <ul className="list-group" aria-label="searched list of places">
          {searchResult.map((loc, i) => (
            <li
              tabIndex="0"
              className="list-group-item list-group-item-action"
              onClick={setLocations.bind(this, [loc])}
              key={i}
            >
              {loc.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  getSearchedLocations(query) {
    return query !== "" && this.state.searchResult.length > 0
      ? this.state.searchResult
      : this.props.locations;
  }

  searchLocationsByQuery(query = "", isRemarking = false) {
    const { searchLocation, setLocations } = this.props;

    if (query === "") {
      this.setState({
        searchResult: []
      });
    } else {
      this.setState({
        searchResult: searchLocation(query)
      });
    }

    if (isRemarking) {
      setLocations(this.getSearchedLocations(query));
    }
  }

  clearInput() {
    const searchInput = document.querySelector(".search-input");
    searchInput.value = "";
    this.searchLocationsByQuery("", true);
  }

  render() {
    const { setLocations } = this.props;

    return (
      <div className="search-container">
        <div className="search-bar">
          <input
            className="form-control search-input"
            type="text"
            placeholder="Search neighborhoods"
            onKeyUp={e => {
              const query = e.currentTarget.value;
              const isRemarking = e.keyCode === 13 ? true : false;
              this.searchLocationsByQuery(query, isRemarking);
            }}
          />
          <div
            className="search-control-item search"
            role="button"
            tabIndex="0"
            onClick={setLocations.bind(this, this.getSearchedLocations())}
            onKeyPress={setLocations.bind(this, this.getSearchedLocations())}
          >
            <FontAwesomeIcon icon="search" />
          </div>
          <div
            tabIndex="0"
            role="button"
            className="search-control-item my-close"
            onClick={() => this.clearInput()}
            onKeyPress={() => this.clearInput()}
          >
            <FontAwesomeIcon icon="times" />
          </div>
        </div>
        {this.renderSearchResult()}
      </div>
    );
  }
}

export default SearchBar;
