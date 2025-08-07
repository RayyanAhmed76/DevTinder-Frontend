import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Adduser } from "../store/UserSlice";
import { useLocation } from "react-router";
import Editprofile from "./Editprofile";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const fetchuser = async () => {
    try {
      const res = await axios.get("http://localhost:7777/profile/view", {
        withCredentials: true,
      });
      dispatch(Adduser(res.data));
      console.log(user + "  uiserrrr");
    } catch (error) {
      res.status(401).send(error.message);
    }
  };

  useEffect(() => {
    console.log("profileeee");
    if (!user) {
      fetchuser();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }

  return (
    user && (
      <div>
        {pathname === "/profile" ? (
          <ProfileCard data={user} />
        ) : (
          <Editprofile data={user} />
        )}
      </div>
    )
  );
};

export default Profile;
