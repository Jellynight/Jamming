/** @format */

import React from "react";
class UserPlaylist extends React.Component {
      constructor(props) {
      super(props);
      this.getPlaylists = this.getPlaylists.bind(this);
 }
      getPlaylists() {
        this.props.getSavedPlaylists();
      }

 render() {
      const array = this.props.savedPlaylists;
      
      const playlistArray =  Array.isArray(array[0]) ? array[0] : array;
      console.log(playlistArray);
      if (!playlistArray || playlistArray.length === 0) {
        return <button onClick={this.getPlaylists}>Get saved playlists</button>;
      } else {
        return (
          <div className="SavedPlaylists">
            <h2>My Saved Playlists</h2>
            {playlistArray.map((playlist) => (
     <div key={playlist.id}>
      <h3>{playlist.name}</h3>
     </div>
    ))}
   </div>
  )}
 }
}

export default UserPlaylist;
