/** @format */
import { sha256, base64encode } from "./CodeChallenge";
import { generateRandomString } from "./CodeVerifier";

const redirect_uri = "http://127.0.0.1:3000/callback";
const url = "https://accounts.spotify.com/api/token";
const client_id = process.env.REACT_APP_CLIENT_ID;

const refreshToken = sessionStorage.getItem("refresh_token");
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");
sessionStorage.setItem("code", code);
const currentToken = {
 get access_token() {
  return sessionStorage.getItem("access_token") || null;
 },
 get refresh_token() {
  return sessionStorage.getItem("refresh_token") || null;
 },
 get expires_in() {
  return sessionStorage.getItem("expires_in") || null;
 },
 get expires() {
  return sessionStorage.getItem("expires") || null;
 },

 save: function (response) {
  const { access_token, refresh_token, expires_in } = response;
  sessionStorage.setItem("access_token", access_token);
  sessionStorage.setItem("refresh_token", refresh_token);
  sessionStorage.setItem("expires_in", expires_in);

  const now = new Date();
  const expiry = new Date(now.getTime() + expires_in * 1000);
  sessionStorage.setItem("expires", expiry);
 },
};


const Spotify = {

async fetchApiCode() {
      console.log("Fetching API code...");
 const scope = ["user-read-private", "user-read-email", "playlist-modify-public", "playlist-modify-private", "playlist-read-private"];
 
const codeVerifier = generateRandomString(64);
const hashed = await sha256(codeVerifier);
const codeChallenge = base64encode(hashed);
sessionStorage.setItem("code_verifier", codeVerifier);

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
 const codeVerifier = sessionStorage.getItem("code_verifier");
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
   sessionStorage.setItem("access_token", data.access_token);
   sessionStorage.setItem("refresh_token", data.refresh_token);
   sessionStorage.setItem("expires_in", data.expires_in);
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
      console.log("Missing code or code verifier", '\n','code:', code, '\n', 'codeVerifier:', codeVerifier);
 }
},
async fetchUser  () {
 try {
  await fetch("https://api.spotify.com/v1/me", {
   headers: {
    Authorization: "Bearer " + sessionStorage.getItem("access_token"),
   },
  })
   .then((userData) => userData.json())
   .then((res) => {
    sessionStorage.setItem("email", res.email);
    sessionStorage.setItem("user_name", res.display_name);
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
     Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
   }
  );
  const jsonData = await response.json();
  return jsonData;
 },

 async savePlaylist(name, trackURIs) {
  // Implementation for saving playlist
  if (!name || !trackURIs.length) {
   console.error("Playlist name or track URIs are missing", name, trackURIs);
   return;
  }

  return await fetch("https://api.spotify.com/v1/me/playlists", {
   method: "POST",
   headers: {
    Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
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
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
     },
     body: JSON.stringify({ uris: trackURIs }),
    });
   })
   .catch((error) => console.error("Error saving playlist:", error));
 },
 getUserPlaylists() {
      fetch("https://api.spotify.com/v1/me/playlists", {
         method: "GET",
         headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
             "Content-Type": "application/json",
         }   
      })
 }
};

export default Spotify;
