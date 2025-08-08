import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addfeed } from "../store/FeedSlice";
import ProfileCard from "./ProfileCard";
import Footer from "./Footer";
import Navbar from "./Navbar";

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

  return (
    feed && (
      <div className="flex justify-center justify-center">
        <ProfileCard data={feed[0]} />
      </div>
    )
  );
};

export default Feed;
