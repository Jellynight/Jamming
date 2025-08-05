/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { fetchWebApi } from "./SpotifyApi";
import { getTopTracks } from "./SpotifyApi";

const initialState = {
 topTracks: [],
 isLoading: false,
 hasError: false,
};

const spotifySlice = createSlice({
 // Function to create a slice with the given name, initial state, reducers, and extra reducers
 // This function is used to encapsulate the logic for creating a Redux slice
 // It allows for easier management of state and actions related to Spotify API interactions
 name: "spotify",
 fetchWebApi,
 initialState: initialState,
 reducers: {
  setTopTracks: (state, action) => {
   state.topTracks = action.payload;
  },
  setLoading: (state, action) => {
   state.isLoading = action.payload;
  },
  setError: (state, action) => {
   state.hasError = action.payload;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(getTopTracks.pending, (state) => {
    state.isLoading = true;
    state.hasError = false;
   })
   .addCase(getTopTracks.fulfilled, (state, action) => {
    state.isLoading = false;
    state.topTracks = action.payload;
   })
   .addCase(getTopTracks.rejected, (state) => {
    state.isLoading = false;
    state.hasError = true;
   });
 },
});

export default spotifySlice.reducer;
