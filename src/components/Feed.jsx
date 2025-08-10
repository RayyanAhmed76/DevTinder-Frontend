import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addfeed } from "../store/FeedSlice";

import ProfileCard from "./ProfileCard";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { h1 } from "framer-motion/client";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getfeed = async () => {
    try {
      const res = await axios.get("http://localhost:7777/feed", {
        withCredentials: true,
      });
      dispatch(Addfeed(res.data));
      console.log(res.data);
    } catch (error) {
      console.log(error.messages);
    }
  };

  useEffect(() => {
    getfeed();
  }, []);

  console.log(feed);
  if (!feed) return;

  return (
    feed && (
      <>
        {feed.length <= 0 ? (
          <div className="overflow-x-hiden">
            <Navbar />
            <h1 className="text-center mt-5 text-lg text-gray-400">
              No connections yet
            </h1>
            <Footer />
          </div>
        ) : (
          <div className="flex justify-center justify-center">
            <ProfileCard data={feed[0]} />
          </div>
        )}
      </>
    )
  );
};

export default Feed;
