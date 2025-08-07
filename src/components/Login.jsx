import React, { useEffect, useRef, useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Adduser } from "../store/UserSlice";

const Login = () => {
  const [EmailID, setEmailID] = useState(null);
  const [Password, setpassword] = useState(null);
  const navigate = useNavigate();
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const goback = () => {
    navigate("/");
  };

  const handlelogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          EmailID,
          Password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(Adduser(res.data));

      if (EmailID && Password !== null) {
        toast.success(`Welcome, ${res.data.firstName}`);
        emailref.current.value = "";
        passwordref.current.value = "";
        navigate("/feed");
      }
    } catch (error) {
      toast.error("Invalid credentials!");
      console.log(error);
      emailref.current.value = "";
      passwordref.current.value = "";
    }
  };

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
    <div className=" card bg-zinc-800 h-auto w-80 md:w-100 lg:w-120 xl:w-150 2xl:w-180 shadow-sm">
      <div className="flex relative justify-center items-center font-semibold text-3xl mb-[20%] mt-[3%]">
        <h1>Login</h1>
        <i
          onClick={goback}
          className="ri-close-fill absolute right-0 p-4 cursor-pointer"
        ></i>
      </div>
      <div className=" flex flex-col items-center">
        <label className="input validator mb-[8%] w-mx-auto md:w-[40vh] lg:w-[50vh] xl:w-[55vh] ">
          <svg
            className="h-[1em]  opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            ref={emailref}
            type="email"
            placeholder="Enter Email address"
            title="Please enter a valid Email address"
            value={EmailID}
            onChange={(e) => setEmailID(e.target.value)}
            required
          />
        </label>
        <label className="input validator mb-[20%] w-mx-auto md:w-[40vh] lg:w-[50vh] xl:w-[55vh]">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            ref={passwordref}
            type="password"
            required
            placeholder="Password"
            minlength="8"
            value={Password}
            onChange={(e) => setpassword(e.target.value)}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>

        <div className="flex justify-center h-full items-end mb-[10%]">
          <Link
            onClick={handlelogin}
            className="btn bg-white text-black border-[#e5e5e5] cursor-pointer"
          >
            <svg
              aria-label="Email icon"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="black"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            Login with Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
