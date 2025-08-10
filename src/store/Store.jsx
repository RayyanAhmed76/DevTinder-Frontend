import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import ConnectionReduce from "./ConnectionSlice";
import RequestReduce from "./RequestSlice";

const Store = configureStore({
  reducer: {
    user: userreducer,
    feed: feedReducer,
    connection: ConnectionReduce,
    request: RequestReduce,
  },
});

export default Store;
