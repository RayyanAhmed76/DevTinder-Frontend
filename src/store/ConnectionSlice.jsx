import { createSlice } from "@reduxjs/toolkit";

const Connectionslice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => action.payload,
  },
});

export const { addConnection } = Connectionslice.actions;
export default Connectionslice.reducer;
