/** @format */
import { createAsyncThunk } from "@reduxjs/toolkit";
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

const token =
 "BQDBKJ5eo5jxbtpWjVOj7ryS84khybFpP_lTqzV7uV-T_m0cTfwvdn5BnBSKPxKgEb11";
const fetchWebApi = createAsyncThunk(
 "spotify/fetchWebApi",
 async (endpoint, method, body) => {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
   method,
   body: JSON.stringify(body),
  });
  return await res.json();
 }
);

const getTopTracks = createAsyncThunk("spotify/getTopTracks", async (searchQuery) => {
 // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 return await (
   fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=5", "GET")
 ).items;
});

const topTracks = getTopTracks();
console.log(
 topTracks?.map(
  ({ name, artists }) =>
   `${name} by ${artists.map((artist) => artist.name).join(", ")}`
 )
);

export { fetchWebApi, getTopTracks, topTracks };
