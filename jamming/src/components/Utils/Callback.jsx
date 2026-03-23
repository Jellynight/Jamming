/** @format */

import React from "react";
import Spotify from "../Utils/Spotify";

class Callback extends React.Component {
 async componentDidMount() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
   sessionStorage.setItem("code", code);
  }
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  const updatedUrl = url.search ? url.href : url.href.replace("?", "");
  window.history.replaceState({}, document.title, updatedUrl);

  const verifier = sessionStorage.getItem("code_verifier");

  if (!code || !verifier) {
   console.log("Missing code or verifier");
   return;
  }

  try {
   // Exchange code for token
   await Spotify.fetchToken();

   // Fetch user info
   await Spotify.fetchUser();

   // Redirect to profile
   window.location.href = "/profile";
  } catch (err) {
   console.error("Token exchange failed:", err);
  }
 }

 render() {
  if (!sessionStorage.getItem("access_token")) {
   return <div style={{ color: "white" }}>Login to Authenticate</div>;
  }
}
}

export default Callback;
