/** @format */
let token = "";
const redirect_uri = "http://127.0.0.1:3000/callback";
const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

const Spotify = {
 async requestAuthorization() {
  // sends api request to spotify to allow app access to user account
  token = localStorage.getItem("access_token");

  if (token) {
   return;
  } else if (!token) {
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

    return;
   } catch (error) {
    console.log(error);
   }
  }
 },
 async getTokenThenId() {
  // Your Spotify client secret from environment variable
  await this.requestAuthorization();
  const urlParams = document.location.search.split("code=")[1];
  console.log(urlParams);
  if (!urlParams) {
   return console.log("no code found in document location");
  } else if (urlParams) {
   try {
    fetch(`https://accounts.spotify.com/api/token`, {
     method: "POST",
     body: new URLSearchParams({
      code: urlParams,
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
      localStorage.setItem("access_token", data.access_token);
      token = data.access_token;
      const userId = fetch("https://api.spotify.com/v1/me", {
       headers: {
        Authorization: "Bearer " + data.access_token,
       },
      });
      userId
       .then((response) => response.json())
       .then((data) => {
        localStorage.setItem("user_name", data.display_name);
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("email", data.email);
        localStorage.setItem("img_url", data.images[0]?.url);
       });
     });
   } catch (error) {
    console.log(error);
   }
  }
  return;
 },

 async search(term) {
  // Implementation for searching tracks

  const response = await fetch(
   `https://api.spotify.com/v1/search?q=${term}&type=track&market=ES&limit=20&offset=0`,
   {
    method: "GET",
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  const jsonData = await response.json();
  return jsonData.tracks.items;
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
