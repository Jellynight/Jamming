/** @format */

import React from "react";
import "./App.css";
import SearchBar from "../searchbar/Searchbar.jsx";
import SearchResults from "../searchResults/SearchResults.jsx";
import Playlist from "../playlist/PLaylist.jsx";
import "./App.css";
import Spotify from "../Utils/Spotify.js";

class App extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   SearchResults: [
    {
     name: "Track Name",
     artist: "Artist Name",
     album: "Album Name",
     id: "1",
    },
   ],
   playlistName: "New Playlist",
   playlistTracks: [
    {
     name: "Track Name",
     artist: "Artist Name",
     album: "Album Name",
     id: "1",
    },
   ],
  };
  this.searchTerm = "";
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.search = this.search.bind(this);
 }
 addTrack(track) {
  if (
   this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
  ) {
   return;
  } else {
   // Add the track to the playlist

   this.setState({
    playlistTracks: [...this.state.playlistTracks, track],
   });
  }
 }
 removeTrack(track) {
  // Remove the track from the playlist
  const newPlaylistTracks = this.state.playlistTracks.filter(
   (savedTrack) => savedTrack.id !== track.id
  );
  this.setState({ playlistTracks: newPlaylistTracks });
 }
 updatePlaylistName(name) {
  this.setState({ playlistName: name });
 }
 savePlaylist() {
  const trackURIs = this.state.playlistTracks.map((track) => track.uri);
  // Call the Spotify API to save the playlist with the given name and tracks
      Spotify.savePlaylist(this.state.playlistName, trackURIs)
       .then(() => {
      this.setState({
       playlistName: "New Playlist",
       playlistTracks: [],
      });
       })
       .catch((error) => console.error("Error saving playlist:", error));
 }
 search(term) {
      // Call the Spotify API to search for tracks with the given term
      console.log(term);
      Spotify.search(term).then((tracks) => {
       this.setState({ SearchResults: tracks });
      });
 }
 render() {
  return (
   <div>
    <h1>
     Ja<span className="highlight">mmm</span>ing
    </h1>
    <div className="App">
     <SearchBar onSearch={this.search} />
     <div className="App-playlist">
      <SearchResults
       SearchResults={this.state.SearchResults}
       onAdd={this.addTrack}
      />
      <Playlist
       Playlist={this.state.playlistName}
       PlaylistTracks={this.state.playlistTracks}
       onRemove={this.removeTrack}
       onNameChange={this.updatePlaylistName}
       onSave={this.savePlaylist}
      />
     </div>
    </div>
   </div>
  );
 }
}

export default App;
