/** @format */

const redirect_uri = "http://127.0.0.1:3000/callback";
const url = "https://accounts.spotify.com/api/token";
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
//const code = localStorage.getItem("code") || "undefined";
const token = localStorage.getItem("access_token") || "undefined";
const refreshToken = localStorage.getItem("refresh_token") || "undefined";

export function fetchApiCode() {
 const scopes = ["user-read-private", "user-read-email", "user-library-read"];
 try {
  const authUrl =
   `https://accounts.spotify.com/authorize?` +
   `client_id=${client_id}` +
   `&response_type=code` +
   `&redirect_uri=${redirect_uri}` +
   `&scope=${encodeURIComponent(scopes.join(" "))}`;

  // Redirect to Spotify authorization
  window.location.href = authUrl;
  const code = document.location.search.split("code=")[1];
  localStorage.setItem("code", code);
  return;
 } catch (error) {
  console.log(error);
 }
}

export const fetchTokin = async () => {
      try {
  await fetch(`https://accounts.spotify.com/api/token`, {
   method: "POST",
   body: new URLSearchParams({
    code: localStorage.getItem("code"),
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
   }),
   headers: {
    Authorization:
     "Basic " + btoa(client_id + ":" + client_secret).toString("base64"),
    "content-type": "application/x-www-form-urlencoded",
   },
  })
   .then((response) => response.json())
   .then((data) => {
    console.log(data);

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("expires_in", data.expires_in);
    return data;
   });
 } catch (error) {
  console.log(error);
 }
 return;
}

export const fetchUser = async () => {
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
}

const Spotify = {
 async requestAuthorization() {
  // sends api request to spotify to allow app access to user account
  const scopes = ["user-read-private", "user-read-email", "user-library-read"];
  console.log("requesting authorization");

  try {
   const authUrl =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${client_id}` +
    `&response_type=code` +
    `&redirect_uri=${redirect_uri}` +
    `&scope=${encodeURIComponent(scopes.join(" "))}`;

   // Redirect to Spotify authorization
   window.location.href = authUrl;
   const code = document.location.search.split("code=")[1];
   localStorage.setItem("code", code);
   return;
  } catch (error) {
   console.log(error);
  }
 },
 async getTokenThenId() {
  // Your Spotify client secret from environment variable

  if (localStorage.getItem("access_token") === true) {
   console.log("already have token");
   return;
  } else if (token === "undefined") {
   console.log(token);
   try {
    fetch(`https://accounts.spotify.com/api/token`, {
     method: "POST",
     body: new URLSearchParams({
      code: localStorage.getItem("code"),
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
     }),
     headers: {
      Authorization:
       "Basic " + btoa(client_id + ":" + client_secret).toString("base64"),
      "content-type": "application/x-www-form-urlencoded",
     },
    })
     .then((response) => response.json())
     .then((data) => {
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("expires_in", data.expires_in);
     })
     .then(() => {
      if (localStorage.getItem("username") === true) {
       return;
      }
      fetch("https://api.spotify.com/v1/me", {
       headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
       },
      })
       .then((userData) => userData.json())
       .then((res) => {
        localStorage.setItem("email", res.email);
        localStorage.setItem("user_name", res.display_name);
       });
     });
   } catch (error) {
    console.log(error);
   }
   return;
  }
 },
 async refreshToken() {
  const res = await fetch(url, {
   method: "POST",
   headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
     "Basic " + btoa(client_id + ":" + client_secret).toString("base64"),
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
