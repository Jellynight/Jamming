/** @format */

import React from "react";
import "./tracklist.css";
import Track from "../track/Track.jsx";

class Tracklist extends React.Component {
 render() {
  return (
   <div className="TrackList">
    {this.props.tracks.map((track) => (
     <Track key={track.id} track={track} />
    ))}
   </div>
  );
 }
}

export default Tracklist;
