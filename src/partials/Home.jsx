import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer";
import background_image from "/background_image.jpg";
import Editprofile from "../components/Editprofile";
import { Adduser } from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
    fetchuser();
  }, []);

  return (
    <div className=" overflow-y-auto overflow-x-hidden ">
      <Navbar />
      <div
        className="bg-cover w-full h-screen "
        style={{ backgroundImage: `url(${background_image})` }}
      >
        {" "}
        <div className="flex object-fit items-center justify-center h-full  ">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
