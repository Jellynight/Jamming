/** @format */

import React from "react";
import "./searchResults.css";
import TrackList from "../tracklist/Tracklist.jsx";
import { useSelector, useDispatch } from "react-redux";
import { selectSearchTerm, selectTopTracks } from "../Utils/CreateSlice";
import { getTopTracks } from "../Utils/SpotifyApi";

const Results = () => {
  const dispatch = useDispatch();
  console.log(selectSearchTerm)
  const searchTerm = useSelector(selectSearchTerm);
  dispatch(getTopTracks(searchTerm));
const topTracks = useSelector(selectTopTracks);
  return topTracks
};

class SearchResults extends React.Component {
 render() {
  return (
   <div className="SearchResults">
      <h2>Results</h2>
      {/* <TrackList tracks={this.props.searchResults} /> */}
      {/* Using the TrackList component to display the search results */}
      {/* The tracks prop is passed down to the TrackList component */}
    <TrackList />
   </div>
  );
 }
}

export default SearchResults;
