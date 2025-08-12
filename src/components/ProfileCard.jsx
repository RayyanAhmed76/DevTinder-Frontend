import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Adduser } from "../store/UserSlice";
import { h1 } from "framer-motion/client";
import { useLocation } from "react-router";
import { RemoveFeed } from "../store/FeedSlice";

const ProfileCard = ({ data }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = data;

  const handlebutton = async (status, user_id) => {
    const res = await axios.post(
      `http://localhost:7777/request/send/${status}/${user_id}`,
      {},
      { withCredentials: true }
    );
    dispatch(RemoveFeed(user_id));

    if (status === "interested") {
      toast.success("Request send sucessfully!");
    } else {
      toast.error("Dev ignored!");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-white">Loading profile...</p>
      </div>
    );
  }
  const profile = {
    user_id: user._id,
    photoURL: user.photoURL,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    about: user.about,
    skills: user.skills,
  };

  return (
    <div className="  overflow-x-hidden ">
      <Navbar />
      <div className="min-h-screen flex items-center pt-[15vh] bg-gradient-to-br from-gray-900 to-gray-800 justify-center p-4 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-700 rounded-2xl shadow-xl p-8 max-w-sm w-full mx-auto"
        >
          <div className="flex flex-col items-center md:mt-[30%] gap-6 text-center ">
            <img
              src={profile.photoURL}
              alt="Profile"
              className="w-42 h-42 rounded-full ring-4 ring-pink-500 mx-auto mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold text-white text-center">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-gray-400 text-center">
              {profile.gender}, {profile.age} years old
            </p>
            <p className="mt-4 text-gray-400 md:text-xl">{profile.about}</p>
            <div className="mt-6 w-full text-left flex flex-col items-center  ">
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <ul className="flex flex-wrap gap-2">
                {profile.skills ? (
                  profile.skills.map((skill, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </motion.li>
                  ))
                ) : (
                  <h1>No Skills</h1>
                )}
              </ul>
              {pathname === "/feed" ? (
                <div className="flex gap-4 mt-10">
                  <button
                    onClick={() => {
                      handlebutton("ignored", profile.user_id);
                    }}
                    className="px-5 py-2 rounded-full bg-gray-600 text-white cursor-pointer hover:bg-red-500 transition"
                  >
                    Ignore
                  </button>
                  <button
                    onClick={() => {
                      handlebutton("interested", profile.user_id);
                    }}
                    className="px-5 py-2 rounded-full bg-gray-600 cursor-pointer text-white hover:bg-green-500 transition"
                  >
                    Interested
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileCard;
