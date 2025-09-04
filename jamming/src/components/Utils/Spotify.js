/** @format */

import { Buffer } from "buffer";

let token = "";

const url = "https://accounts.spotify.com";
const client_id = "5365a44a42e344cfa3ef2ac6d3b5937a"; // Your Spotify client ID
const client_secret = "e2b1f29afdcb440fb6279963458c3787"; // Your Spotify client secret

const Spotify = {
 async getAccessToken() {
  if (token) {
   return token;
  } else if (!token) {
   const res = await fetch(`${url}/api/token`, {
    method: "POST",
    headers: {
     Authorization: `Basic ${new Buffer.from(
      client_id + `:` + client_secret
     ).toString("base64")}`,
     "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
   });

   const data = await res.json();
   token = data.access_token;
   return data.access_token;
  }
 },
 async getUserId() {
  // Implementation for getting user ID
  //const accessToken = await this.getAccessToken();
  const clientId = client_id;
  const scopes = ["user-read-private", "user-read-email"];
// old redirect api: https://github.com/Jellynight/Jamming/jamming .git removed from spotify
//new installed api: https://192.168.0.248:3000/callback
  const authUrl =
   `https://accounts.spotify.com/authorize?` +
   `client_id=${clientId}` +
   `&response_type=code` +
   `&redirect_uri=https://192.168.0.248:3000/callback` +
   `&scope=${encodeURIComponent(scopes.join(" "))}`;

  window.location.href = authUrl;
  const hash = window.location.hash;
  token = new URLSearchParams(hash.substring(1)).get("access_token");

  return ;
 },
 async search(term) {
  // Implementation for searching tracks
  token = await this.getAccessToken();
  const searched = await fetch(
   `https://api.spotify.com/v1/search?q=${term}&type=track&market=ES&limit=20&offset=0`,
   {
    method: "GET",
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  const jsonData = await searched.json();
  return jsonData.tracks.items;
 },

 async savePlaylist(name, trackURIs) {
  // Implementation for saving playlist
  if (!name || !trackURIs.length) {
   console.error("Playlist name or track URIs are missing");
   return;
  }
  const accessToken = await this.getAccessToken();
  return await fetch("https://api.spotify.com/v1/me/playlists", {
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
