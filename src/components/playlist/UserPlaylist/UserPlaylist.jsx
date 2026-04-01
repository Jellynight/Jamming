/** @format */

import React from "react";
import Tracklist from "../../tracklist/Tracklist";
import getUserPlaylists from "../../Utils/GetUserPlaylist";

class UserPlaylist extends React.Component {
 constructor(props) {
  super(props);
  this.getPlaylists = this.getPlaylists.bind(this);
 }
 async getPlaylists() {
  try {
    const data = await getUserPlaylists();
    this.setState({ savedPlaylists: data.items });
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    window.alert("Failed to fetch playlists. App account is not a Premium account.");
  }
 }
 showPlaylist(id) {
  const pickedPlaylist = this.props.savedPlaylists.find(
   (playlist) => playlist.id === id
  );
  console.log(pickedPlaylist);
  try {
    fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
     method: "GET",
     headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
     },
    })
     .then((response) => response.json())
     .then((data) => {
      this.setState({ pickedPlaylist: { ...pickedPlaylist, tracks: data } });
     })
     .catch((error) => {
      console.error("Error fetching playlist tracks:", error);
     });

  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
  }
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
