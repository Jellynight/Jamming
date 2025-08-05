import { createSlice } from '@reduxjs/toolkit';

function createSliceReducer(
  name,
  initialState,
  reducers = {},
  extraReducers = {}
) {
  return createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      Object.entries(extraReducers).forEach(([actionType, reducer]) => {
        builder.addCase(actionType, reducer);
      });
    },
  });
}

export default createSliceReducer;