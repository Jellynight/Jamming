/** @format */

import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "../Utils/CreateSlice";

const store = configureStore({
 reducer: {
  spotify: spotifyReducer,
 },
});

export default store;
