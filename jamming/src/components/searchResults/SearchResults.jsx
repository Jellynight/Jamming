/** @format */

import React from "react";
import "./searchResults.css";
import TrackList from "../tracklist/Tracklist.jsx";

class SearchResults extends React.Component {
 /* <TrackList tracks={this.props.searchResults} 
     Using the TrackList component to display the search results 
     The tracks prop is passed down to the TrackList component */

 render() {
      const tracks = this.props.trackArray;
  const flattenedTracks = Array.isArray(tracks[0]) ? tracks[0] : tracks;
  
  return (
   <div className="SearchResults">
    <h2>Results</h2>

    <TrackList
     tracks={flattenedTracks}
     onAdd={this.props.onAdd}
     isRemoval={false}
    />
   </div>
  );
 }
}

export default SearchResults;
