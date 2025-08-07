import React from "react";
import { Route, Routes } from "react-router";
import Home from "./partials/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editprofile from "./components/Editprofile";
import Feed from "./components/Feed";
import ProfileCard from "./components/ProfileCard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/profile" element={<Profile />}>
          <Route path="/profile/edit" element={<Editprofile />} />
          <Route path="/profilecard" element={<ProfileCard />} />
        </Route>
        <Route path="/feed" element={<Feed />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default App;
