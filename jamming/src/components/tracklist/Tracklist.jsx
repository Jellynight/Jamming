/** @format */

import React from "react";
import "./tracklist.css";
import Track from "../track/Track.jsx";

class Tracklist extends React.Component {
 render() {
  return (
   <div className="TrackList">
    {this.props.tracks.map((track) => (
     <Track
      key={track.id}
      name={track.name}
      artist={track.artist}
      album={track.album}
      id={track.id}
      onAdd={this.props.onAdd}
      isRemove={this.props.isRemove}
      onRemove={this.props.onRemove}
     />
    ))}
   </div>
  );
 }
}

export default Tracklist;
