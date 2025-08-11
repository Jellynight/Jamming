/** @format */

let token = '';
const redirect_uri = "http://localhost:3000/"; // Update this to your redirect URI
const client_id = "5365a44a42e344cfa3ef2ac6d3b5937a"; // Your Spotify client ID
const client_secret = "e2b1f29afdcb440fb6279963458c3787"; // Your Spotify client secret

const url = "https://accounts.spotify.com/api/token";

const Spotify = {
  async getAccessToken() {
  if (!token) {
   return token;
  } else if (!token) {
   const res = await fetch(`${url}`, {
    headers: {
     Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
     "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: "grant_type=client_credentials",
    redirect_uri: redirect_uri,
    json: true,
   });
      const data = await res.json();
      token = data.access_token;
      return data.access_token;
  }
 },
 async getUserId() {
      // Implementation for getting user ID
      const accessToken = this.getAccessToken();
      console.log(accessToken);
      const response = await fetch("https://api.spotify.com/v1/me", {
       headers: {
        Authorization: `Bearer ${accessToken}`,
       },
      });
      const data = await response.json();
      console.log("User ID:", data);
      return data.id;
 },
 search(term) {
  // Implementation for searching tracks
  console.log(token)
  return new Promise((res, rej) => {
   const accessToken = this.getAccessToken();
   fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
    headers: {
     Authorization: `Bearer ${accessToken}`,
    },
    redirect_uri: redirect_uri
   }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        const tracks = data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
        res(tracks);
        console.log(tracks)
      });
    } else {
      console.error("Failed to search tracks");
      rej("Failed to search tracks");
    }
   });
  });
  
 },

 savePlaylist(name, trackURIs) {
  // Implementation for saving playlist
  if (!name || !trackURIs.length) {
   console.error("Playlist name or track URIs are missing");
   return;
  }
  const accessToken = this.getAccessToken();
  return fetch("https://api.spotify.com/v1/me/playlists", {
   method: "POST",
   headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    name: name,
    public: false,
   }),
  })
   .then((response) => response.json())
   .then((data) => {
    const playlistId = data.id;
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
     method: "POST",
     headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
     },
     body: JSON.stringify({ uris: trackURIs }),
    });
   })
   .catch((error) => console.error("Error saving playlist:", error));
 },
};

export default Spotify;
