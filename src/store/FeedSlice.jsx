import { createSlice } from "@reduxjs/toolkit";

const feedslice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    Addfeed(state, action) {
      return action.payload;
    },
    RemoveFeed(state, action) {
      const newfeed = state.filter((feed) => feed._id !== action.payload);
      return newfeed;
    },
  },
});

export const { Addfeed, RemoveFeed } = feedslice.actions;

export default feedslice.reducer;
