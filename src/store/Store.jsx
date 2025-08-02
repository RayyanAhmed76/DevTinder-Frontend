import { configureStore } from "@reduxjs/toolkit";
import userslice from "./UserSlice";

const Store = configureStore({
  reducer: {
    user: userslice,
  },
});

export default Store;
