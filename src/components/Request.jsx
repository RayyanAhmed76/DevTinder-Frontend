import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";

const Request = () => {
  const navigate = useNavigate();

  const profileview = async () => {
    navigate("/request/profile");
  };
  return (
    <div className=" overflow-x-hidden  ">
      <Navbar />
      <div className="overflow-y-auto">
        <h1 className="text-3xl font-semibold text-center mt-3">Request</h1>
        <div className="p-5 mb-5 ">
          <div className="bg-zinc-700 mb-3 shadow-sm p-4 rounded-lg ">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div
                onClick={profileview}
                className=" relative flex items-center  cursor-pointer"
              >
                <img
                  className="w-20 h-20 rounded-full mr-5"
                  src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
                  alt="Profile"
                />
                <div className="flex flex-col text-white">
                  <h1 className="text-lg font-semibold mb-1">Rayyan Ahmed</h1>
                  <p>Hey, this is Rayyan, a truly inspired web dev.</p>
                </div>
              </div>

              <div className="flex justify-center md:justify-between items-center gap-3">
                <i className="ri-close-large-line text-xl px-4 py-2 hover:text-red-500 cursor-pointer bg-red-300 rounded-full"></i>
                <i className="ri-check-fill text-xl px-4 py-2 hover:text-green-500 cursor-pointer bg-green-300 rounded-full"></i>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Request;
