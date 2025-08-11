/** @format */
import { createAsyncThunk } from "@reduxjs/toolkit";
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

const token = {};
var client_id = '5365a44a42e344cfa3ef2ac6d3b5937a';
var client_secret = 'e2b1f29afdcb440fb6279963458c3787';

 const fetchToken = createAsyncThunk(
 "spotify/fetchToken",
 async () => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
   method: "POST",
   headers: {
    Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
    "Content-Type": "application/x-www-form-urlencoded",
   },
   body: "grant_type=client_credentials",
  });
  const data = await res.json();
  token.push(data.access_token);
  return data.access_token;
 }
);


const fetchWebApi = createAsyncThunk(
 "spotify/fetchWebApi",
 async (endpoint, method, body) => {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
   method: "POST",
   body: JSON.stringify(body),
  });
  await res.json();
  return res;
 }
);

const getTopTracks = createAsyncThunk("spotify/getTopTracks", async (track) => {
 // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 return await fetchWebApi(
  `v1/me/top/tracks?q=${track}&time_range=medium_term&limit=5&offset=5`,
  "GET"
 ).items;
});

/*const topTracks = getTopTracks();
console.log(
 topTracks?.map(
  ({ name, artists }) =>
   `${name} by ${artists.map((artist) => artist.name).join(", ")}`
 )
);*/

export { fetchWebApi, getTopTracks, fetchToken };