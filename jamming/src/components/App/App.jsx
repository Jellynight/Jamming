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
import UserPlaylist from "../playlist/UserPlaylist/UserPlaylist.jsx";

class App extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   searchResults: [],
   playlistName: "",
   playlistTracks: [],
   savedPlaylists: [],
   user: {
    name: "",
    email: "",
    id: "",
    login: sessionStorage.getItem("login") || false,
   },
  };
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.search = this.search.bind(this);
  this.login = this.login.bind(this);
  this.logout = this.logout.bind(this);
  this.getSavedPlaylists = this.getSavedPlaylists.bind(this);
 }
 addTrack(trackId) {
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
  console.log(this.state.playlistName);
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

  // filter out tracks already in the playlist
  const tracksFiltered = response.tracks.items.filter(
   (track) => track.id !== this.state.playlistTracks.id
  );
  console.log(tracksFiltered);

  // Update the search results state with the retrieved tracks
  this.setState({ searchResults: response.tracks.items });
 }

 async getSavedPlaylists() {
  const data = await Spotify.getUserPlaylists();
  console.log(data.items);
  this.setState({ savedPlaylists: data.items });
 }

 componentDidMount() {
  // On component mount, check if redirected from Spotify auth with code and token
  const path = window.location.pathname;
  const code = new URLSearchParams(window.location.search).get("code");
  const token = sessionStorage.getItem("access_token");

  // Delay to ensure token is set before updating state
  setTimeout(() => {
   if (path === "/callback" && code && token) {
    // Optional: restore login state from sessionStorage
    console.log("setting user state");

    const displayName = sessionStorage.getItem("user_name");
    const email = sessionStorage.getItem("email");
    this.setState({
     user: {
      name: displayName,
      email: email,
      login: true,
     },
    });
   }
  }, 1000);
 }
 async login() {
  // Initiate Spotify login flow redirecting to Spotify auth page using PKCE auth flow

  try {
   await Spotify.fetchApiCode(); // Redirect happens here
  } catch (error) {
   console.error("loginfailed", error);
   //logout on error
   this.setState({ user: { login: false } });
  }
 }

 logout() {
  // clear session data and reload app to logged out state
  sessionStorage.clear();
  window.location.href = "https://accounts.spotify.com/en/logout";
  window.location.reload();
 }

 render() {
  return (
   <div>
    <h1>
     My <span className="highlight">Sp</span>otify
    </h1>
    <div className="App">
     <Profile user={this.state.user} login={this.login} logout={this.logout} />
     <Callback />
     <UserPlaylist
      savedPlaylists={this.state.savedPlaylists}
      getSavedPlaylists={this.getSavedPlaylists}
     />
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
