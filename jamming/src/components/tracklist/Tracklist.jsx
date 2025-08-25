/** @format */

import React from "react";
import "./tracklist.css";
import Track from "../track/Track.jsx";

class Tracklist extends React.Component {
 render() {
        const { tracks } = this.props;
        console.log(tracks[0])
  if (Array.isArray(tracks)) {
    return <div>No tracks found</div>;
  } else {
      return (
   <div className="TrackList">
    {this.tracks.map((track) => (
     <Track
      key={track.id}
      name={track.name}
      artist={track.artist[0].name}
      album={track.album.name}
      id={track.id}
      onAdd={this.props.onAdd}
      isRemove={this.props.isRemove}
      onRemove={this.props.onRemove}
     />
    ))}
   </div>
  );
 }}
  
}

export default Tracklist;
