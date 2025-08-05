/** @format */

import { configureStore } from "@reduxjs/toolkit";
import spotifySliceReducer from "../Utils/CreateSlice";

const store = configureStore({
 reducer: {
  spotify: spotifySliceReducer,
 }
});

export default store;
