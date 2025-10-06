/** @format */

import React from "react";
import "./tracklist.css";
import Track from "../track/Track.jsx";

class Tracklist extends React.Component {
 render() {
  if (this.props.tracks.length < 0 || !this.props.tracks) {
   return <div>No tracks found</div>;
  } else {
   return (
    <div className="TrackList">
     {this.props.tracks
      .filter((track) => track && track.album && track.album.name)
      .map((track) => (
       <Track
        key={track.id}
        name={track.name}
        artist={track.artists.map((artist) => artist.name).join(", ")}
        album={track.album.name}
        id={track.id}
        URI={track.uri}
        onAdd={this.props.onAdd}
        isRemove={this.props.isRemove}
        onRemove={this.props.onRemove}
       />
      ))}
    </div>
   );
  }
 }
}

export default Tracklist;
