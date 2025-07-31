import React from "react";
import { Route, Routes } from "react-router";
import Home from "./partials/Home";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Login from "./components/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
