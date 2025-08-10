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
import Connections from "./components/Connections";
import ReqProfile from "./components/ReqProfile";
import Request from "./components/Request";
import Signup from "./components/Signup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/profile" element={<Profile />}>
          <Route path="/profile/edit" element={<Editprofile />} />
          <Route path="/profilecard" element={<ProfileCard />} />
        </Route>
        <Route path="/feed" element={<Feed />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/request" element={<Request />}>
          <Route path="/request/profile" element={<ReqProfile />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default App;
