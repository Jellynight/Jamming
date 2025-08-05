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
  const topTracks = useSelector(selectTopTracks);
  dispatch(getTopTracks(searchTerm));

  return (
    <div className="Results">
      <h2>Results</h2>
      <TrackList tracks={topTracks} />
    </div>
  );
};

/*
class SearchResults extends React.Component {
 render() {
  return (
   <div className="SearchResults">
    <h2>Results</h2>
    <TrackList />
   </div>
  );
 }
}*/

export default Results;
