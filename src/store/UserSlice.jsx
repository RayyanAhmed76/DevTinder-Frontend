import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    Adduser(state, action) {
      return action.payload;
    },
    Removeuser(state, action) {
      return null;
    },
  },
});

export const { Adduser, Removeuser } = userslice.actions;

export default userslice.reducer;
