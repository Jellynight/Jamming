/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { fetchWebApi } from "./SpotifyApi";
import { getTopTracks } from "./SpotifyApi";

const initialState = {
 topTracks: [],
 searchTerm: '',
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
  setSearchTerm: (state, action) => {
   state.searchTerm = action.payload;
  }
 },
 extraReducers: (builder) => {
  builder
   .addCase(getTopTracks.pending, (state) => {
    state.isLoading = true;
    state.hasError = false;
   })
   .addCase(getTopTracks.fulfilled, (state, action) => {
    state.isLoading = false;
    state.hasError = false;
    state.topTracks = action.payload;
   })
   .addCase(getTopTracks.rejected, (state) => {
    state.isLoading = false;
    state.hasError = true;
   });
 },
});


export default spotifySlice.reducer;

