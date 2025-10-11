/** @format */

import { useEffect, useRef } from "react";
import Spotify from "./Spotify"; // adjust path as needed

export default function Callback() {
 const hasRun = useRef(false);

 useEffect(() => {
  if (hasRun.current) return;
  hasRun.current = true;
  const code = new URLSearchParams(window.location.search).get("code");
  if (!code) {
   console.log("no code found");
   sessionStorage.clear();
   return;
  }

  async function completeLogin() {
   try {
    await Spotify.fetchToken();
    await Spotify.fetchUser();
    sessionStorage.setItem("login", true);
   } catch (error) {
    console.error("Login failed:", error);
   }
  }

  completeLogin();
 }, []);

 return null;
}
