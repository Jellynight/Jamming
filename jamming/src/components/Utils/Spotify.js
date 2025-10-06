/** @format */
import { sha256, base64encode } from "./CodeChallenge";
import { generateRandomString } from "./CodeVerifier";

const redirect_uri = "http://127.0.0.1:3000/callback";
const url = "https://accounts.spotify.com/api/token";
const client_id = process.env.REACT_APP_CLIENT_ID;

let token = "";
const refreshToken = localStorage.getItem("refresh_token");
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
localStorage.setItem("code", code);
const currentToken = {
 get access_token() {
  return localStorage.getItem("access_token") || null;
 },
 get refresh_token() {
  return localStorage.getItem("refresh_token") || null;
 },
 get expires_in() {
  return localStorage.getItem("refresh_in") || null;
 },
 get expires() {
  return localStorage.getItem("expires") || null;
 },

 save: function (response) {
  const { access_token, refresh_token, expires_in } = response;
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expires_in", expires_in);

  const now = new Date();
  const expiry = new Date(now.getTime() + expires_in * 1000);
  localStorage.setItem("expires", expiry);
 },
};


const Spotify = {

async fetchApiCode() {
      console.log("Fetching API code...");
 const scope = ["user-read-private", "user-read-email"];
 
const codeVerifier = generateRandomString(64);
const hashed = await sha256(codeVerifier);
const codeChallenge = base64encode(hashed);
localStorage.setItem("code_verifier", codeVerifier);

 try {
  const authUrl =
   `https://accounts.spotify.com/authorize?` +
   `&response_type=code` +
   `&client_id=${client_id}` +
   `&scope=${encodeURIComponent(scope.join(" "))}` +
   "&code_challenge_method=S256" +
   `&code_challenge=${codeChallenge}` +
   `&redirect_uri=${redirect_uri}`;

  // Redirect to Spotify authorization
  window.location.href = authUrl;
  
 } catch (error) {
  console.log(error);
 }
},
async fetchToken () {
 const urlParams = new URLSearchParams(window.location.search);
 const code = urlParams.get("code");
 const codeVerifier = localStorage.getItem("code_verifier");
 if (code && codeVerifier) {
  console.log("Fetching token...");
  try {
   const res = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
     "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
     client_id: client_id,
     grant_type: "authorization_code",
     code: code,
     redirect_uri: redirect_uri,
     code_verifier: codeVerifier,
    }),
   });
   const data = await res.json();
   localStorage.setItem("access_token", data.access_token);
   localStorage.setItem("refresh_token", data.refresh_token);
   localStorage.setItem("expires_in", data.expires_in);
   currentToken.save(data);
   const url = new URL(window.location.href);
   url.searchParams.delete("code");
   const updatedUrl = url.search ? url.href : url.href.replace("?", "");
   window.history.replaceState({}, document.title, updatedUrl);
   return data.access_token;
  } catch (error) {
   console.log("error fetching token", error);
  }
 } else {
      console.log("Missing code or code verifier");
 }
},
async fetchUser  () {
 try {
  await fetch("https://api.spotify.com/v1/me", {
   headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
   },
  })
   .then((userData) => userData.json())
   .then((res) => {
    localStorage.setItem("email", res.email);
    localStorage.setItem("user_name", res.display_name);
   });
 } catch (error) {
  console.log(error);
 }
},
 async refreshToken() {
  const res = await fetch(url, {
   method: "POST",
   headers: {
    "Content-Type": "application/x-www-form-urlencoded",
   },
   body: new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: client_id,
   }),
   json: true,
  });
  const response = await res.json();
  console.log(response);
  localStorage.setItem("access_token", response.access_token);
  if (response.refresh_token) {
   localStorage.setItem("refresh_token", response.refresh_token);
  }
 },


 async search(term) {
  // Implementation for searching tracks

  const response = await fetch(
   `https://api.spotify.com/v1/search?q=${term}&type=track&market=ES&limit=20&offset=0`,
   {
    method: "GET",
    headers: {
     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
   }
  );
  const jsonData = await response.json();
  return jsonData;
 },

 async savePlaylist(name, trackURIs) {
  // Implementation for saving playlist
  if (!name || !trackURIs.length) {
   console.error("Playlist name or track URIs are missing");
   return;
  }

  return await fetch("https://api.spotify.com/v1/me/playlists", {
   method: "POST",
   headers: {
    Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },
     body: JSON.stringify({ uris: trackURIs }),
    });
   })
   .catch((error) => console.error("Error saving playlist:", error));
 },
};

export default Spotify;
