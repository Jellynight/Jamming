/** @format */
import { sha256, base64encode } from "./CodeChallenge";
import { generateRandomString } from "./CodeVerifier";

const redirect_uri = "http://127.0.0.1:3000/callback";
const url = "https://accounts.spotify.com/api/token";
const client_id = process.env.REACT_APP_CLIENT_ID;

const Spotify = {

 async fetchApiCode() {
  console.log("Fetching API code...");
  const scope = [
   "user-read-private",
   "user-read-email",
  ];

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
   window.location.href = authUrl
   
  } catch (error) {
   console.log(error);
  }
 },

 async fetchToken() {
  const code = sessionStorage.getItem("code");
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
    
    return data.access_token;
   } catch (error) {
    console.log("error fetching token", error);
   }
  } else {
   console.log(
    "Missing code or code verifier",
    "\n",
    "code:",
    code,
    "\n",
    "codeVerifier:",
    codeVerifier
   );
  }
 },

 async fetchUser() {
  try {
      console.log('fetching user data')
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
    refresh_token: sessionStorage.refresh_token,
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
   `https://api.spotify.com/v1/search?q=${term}&type=track&market=ES&limit=10&offset=0`,
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

};

export default Spotify;
