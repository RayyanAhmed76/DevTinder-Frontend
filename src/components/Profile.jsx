import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Adduser } from "../store/UserSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const fetchuser = async () => {
    try {
      const res = await axios.get("http://localhost:7777/profile/view", {
        withCredentials: true,
      });
      dispatch(Adduser(res.data));
    } catch (error) {
      res.status(401).send(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchuser();
    }
  }, []);

  const profile = {
    photoUrl: "123",
    firstName: "123",
    lastName: "123",
    age: "123",
    gender: "123",
    about: "123",
    skills: ["rayyan", "ahmed"],
  };

  return (
    <div className=" overflow-y-auto overflow-x-hidden ">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-600 rounded-2xl shadow-xl p-8 w-[40vh]  sm:h-[15vh] md:h-[74vh] lg:h-[60vh] "
        >
          <div className="flex flex-col items-center md:mt-[30%] gap-6 text-center">
            <img
              src={profile.photoUrl}
              alt="Profile"
              className="w-32 h-32 md:w-52 md:h-52 rounded-full object-cover border-4 border-blue-500"
            />
            <h2 className="text-2xl font-bold mt-4">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-sm text-gray-300">
              {profile.gender}, {profile.age} years old
            </p>
            <p className="mt-4 text-gray-400 md:text-xl">{profile.about}</p>
            <div className="mt-6 w-full text-left flex flex-col items-center  ">
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <ul className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
