/** @format */

import React from "react";
import "./searchResults.css";
import TrackList from "../tracklist/Tracklist.jsx";

class SearchResults extends React.Component {
 render() {
  return (
   <div className="SearchResults">
    <h2>Results</h2>
    {/* <TrackList tracks={this.props.searchResults} /> */}
    {/* Using the TrackList component to display the search results */}
    {/* The tracks prop is passed down to the TrackList component */}
    <TrackList
     tracks={this.props.SearchResults}
     onAdd={this.props.onAdd}
     isRemoval={false}
    />
   </div>
  );
 }
}

export default SearchResults;
