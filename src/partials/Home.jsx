import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "../components/Footer";
import background_image from "/background_image.jpg";
import Editprofile from "../components/Editprofile";
import { Adduser } from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { div } from "framer-motion/client";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
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

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div
        className="bg-cover w-full h-screen flex flex-col  justify-center items-center pt-[30vh] md:pt-[40vh] relative   "
        style={{
          background: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.3),rgba(0,0,0,.8)),url(${background_image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative p-2">
          <h1 className="font-bold text-zinc-200 text-4xl md:text-7xl text-center ">
            Build More Than Just Code
          </h1>
          <p className="text-lg p-3  md:text-center md:text-2xl md:mt-6 md:mb-10 text-zinc-300 mt-3 font-semibold text-start">
            Connect, collaborate, and build amazing projects together.
          </p>{" "}
          <div className="flex justify-center items-center ">
            {user ? (
              <button
                onClick={() => navigate("/feed")}
                className=" px-8 py-3 cursor-pointer mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white 
               font-semibold rounded-full shadow-lg hover:from-pink-600 
               hover:to-red-600 transform hover:scale-105 transition-all duration-300"
              >
                Explore Feed
              </button>
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className=" px-8 py-3 cursor-pointer mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white 
               font-semibold rounded-full shadow-lg hover:from-pink-600 
               hover:to-red-600 transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
            )}
          </div>
        </div>

        <div className="flex object-fit items-center justify-center h-full  ">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
