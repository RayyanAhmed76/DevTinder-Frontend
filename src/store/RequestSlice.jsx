import { createSlice } from "@reduxjs/toolkit";

const Requestslice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    RemoveRequest(state, action) {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addRequest, RemoveRequest } = Requestslice.actions;
export default Requestslice.reducer;
