/** @format */

import React from "react";
import "./playlist.css";
import TrackList from "../tracklist/Tracklist.jsx";

class Playlist extends React.Component {
 constructor(props) {
  super(props);
  this.handleNameChange = this.handleNameChange.bind(this);
 }
 handleNameChange(event) {
  this.props.onNameChange(event.target.value);
 }
 render() {
  return (
   <div className="Playlist">
    <input
     defaultValue="New Playlist"
     title="New Playlist"
     onChange={this.handleNameChange.bind(this)}
    />
    <TrackList
     tracks={this.props.PlaylistTracks}
     onRemove={this.props.onRemove}
     isRemoval={true}
    />
    <button className="Playlist-save" onClick={this.props.onSave}>
     SAVE TO SPOTIFY
    </button>
   </div>
  );
 }
}

export default Playlist;
