/** @format */

import React from "react";
import "./App.css";
import SearchBar from "../searchbar/Searchbar.jsx";
import SearchResults from "../searchResults/SearchResults.jsx";
import Playlist from "../playlist/PLaylist.jsx";
import "./App.css";
import Profile from "../profile/Profile.jsx";
import Spotify from "../Utils/Spotify.js";
import Callback from "../Utils/Callback.jsx";

class App extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   searchResults: [],
   playlistName: "",
   playlistTracks: [],
   user: {
    name: "",
    email: "",
    id: "",
    login: false,
   },
  };
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.search = this.search.bind(this);
 }
 addTrack(trackId) {
  console.log(trackId);
  const track = this.state.searchResults.find((t) => t.id === trackId);
  if (!trackId) {
   console.error("Invalid track object:", trackId);
   return;
  } else if (
   this.state.playlistTracks.find((savedTrack) => savedTrack.id === trackId)
  ) {
   console.log("track already in playlist");
   return;
  } else {
   // Add the track to the playlist
   console.log("adding track to playlist", trackId);
   this.setState({
    playlistTracks: [...this.state.playlistTracks, track],
   });
   console.log(this.state.playlistTracks);
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

 async search(term) {
  // Call the Spotify API to search for tracks with the given term
  const response = await Spotify.search(term);
  this.setState({ searchResults: response.tracks.items });
 }

async componentDidMount() {
  const path = window.location.pathname;
  const code = new URLSearchParams(window.location.search).get("code");

  if (path === "/callback" && code) {
   // Optional: restore login state from sessionStorage
   
   const displayName = await sessionStorage.getItem("user_name");
   const email = await sessionStorage.getItem("email")
   .then(() => {
      this.setState({
    user: {
     name: displayName,
     email: email,
     login: true,
    },
   });
   })
   
  }
 }

 render() {
  return (
   <div>
    <h1>
     Ja<span className="highlight">mmm</span>ing
    </h1>
    <div className="App">
     <Profile user={this.state.user} />
     <Callback />
     <SearchBar onSearch={this.search} />
     <div className="App-playlist">
      <SearchResults
       trackArray={this.state.searchResults}
       onAdd={this.addTrack}
       onRemove={false}
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
