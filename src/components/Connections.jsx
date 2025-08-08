import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Connections = () => {
  return (
    <div className=" overflow-y-auto overflow-x-hidden  ">
      <Navbar />
      <div className="overflow-y-auto">
        <h1 className="text-3xl font-semibold text-center mt-3">Connections</h1>
        <div className="p-5 mb-5 ">
          <div className="bg-zinc-700 mb-3 shadow-sm p-4 rounded-lg ">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className=" relative flex items-center">
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Connections;
