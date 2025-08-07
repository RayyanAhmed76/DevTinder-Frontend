import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./UserSlice";
import feedReducer from "./FeedSlice";

const Store = configureStore({
  reducer: {
    user: userreducer,
    feed: feedReducer,
  },
});

export default Store;
