import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./UserSlice";

const Store = configureStore({
  reducer: {
    user: userreducer,
  },
});

export default Store;
