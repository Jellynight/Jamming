/** @format */

import React from "react";
import Tracklist from "../../tracklist/Tracklist";

class UserPlaylist extends React.Component {
 constructor(props) {
  super(props);
  this.getPlaylists = this.getPlaylists.bind(this);
 }
 getPlaylists() {
  this.props.getSavedPlaylists();
 }
 showPlaylist(id) {
  const pickedPlaylist = this.props.savedPlaylists.find(
   (playlist) => playlist.id === id
  );
  console.log(pickedPlaylist);
  //const fetchedPlaylist = fetch(pickedPlaylist.tracks.href, {})
 }

 render() {
  const array = this.props.savedPlaylists;

  const playlistArray = Array.isArray(array[0]) ? array[0] : array;
  if (playlistArray.length === 0) {
   return <button onClick={this.getPlaylists}>Get saved playlists</button>;
  } else {
   return (
    <div className="SavedPlaylists">
     <h2>My Saved Playlists</h2>
     {playlistArray.map((playlist) => (
      <div key={playlist.id}>
       <h3>{playlist.name}</h3>
       <button onClick={() => this.showPlaylist(playlist.id)}>
        View Playlist
       </button>
      </div>
     ))}
     <div>
      <Tracklist
       tracks={this.pickedPlaylist ? this.pickedPlaylist.tracks.items.map(item => item.track) : []}
       onRemove={this.props.onRemove}
      />
     </div>
    </div>
   );
  }
 }
}

export default UserPlaylist;
