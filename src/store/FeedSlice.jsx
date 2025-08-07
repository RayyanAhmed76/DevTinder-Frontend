import { createSlice } from "@reduxjs/toolkit";

const feedslice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    Addfeed(state, action) {
      return action.payload;
    },
    Removefeed: (state, action) => null,
  },
});

export const { Addfeed, Removefeed } = feedslice.actions;

export default feedslice.reducer;
