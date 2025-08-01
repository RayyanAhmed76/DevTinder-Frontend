import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import background_image from "/background_image.jpg";

const Home = () => {
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
