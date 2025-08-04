/** @format */

import React from "react";
import "./searchResults.css";
import TrackList from "../tracklist/Tracklist.jsx";

class SearchResults extends React.Component {
 render() {
  return (
   <div className="SearchResults">
    <h2>Results</h2>
    <TrackList />
   </div>
  );
 }
}

export default SearchResults;
