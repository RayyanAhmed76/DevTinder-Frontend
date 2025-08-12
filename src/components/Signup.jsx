import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Adduser } from "../store/UserSlice";
import { div } from "framer-motion/client";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [EmailID, setEmailID] = useState("");
  const [Password, setPassword] = useState("");

  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => navigate("/");

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/signup",
        { firstName, lastName, EmailID, Password },
        { withCredentials: true }
      );

      dispatch(Adduser(res.data));

      if (firstName && lastName && EmailID && Password) {
        toast.success(`Signup successfull!`);
        fnameRef.current.value = "";
        lnameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
        navigate("/login");
      }
    } catch (error) {
      toast.error("Signup failed!");
      console.error(error);
    }
  };

  return (
    <div className="bg-[rgba(0,0,0,.6)] w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[50]">
      <div className="card bg-zinc-800 rounded-2xl   shadow-lg w-[90%] max-w-md p-6 sm:p-8 absolute  ">
        {/* Header */}
        <div className="flex  justify-center items-center font-semibold text-2xl sm:text-3xl mb-10 mt-4">
          <h1>Signup</h1>
          <i
            onClick={goBack}
            className="ri-close-fill absolute right-0 p-4 cursor-pointer text-lg md:text-2xl lg:text-3xl sm:text-xl"
          ></i>
        </div>

        {/* Form */}
        <div className="flex flex-col items-center px-4 sm:px-6">
          {/* First Name */}
          <label className="input validator mb-4 w-full">
            <input
              ref={fnameRef}
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full"
            />
          </label>

          {/* Last Name */}
          <label className="input validator mb-4 w-full">
            <input
              ref={lnameRef}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full"
            />
          </label>

          {/* Email */}
          <label className="input validator mb-4 w-full">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email Address"
              value={EmailID}
              onChange={(e) => setEmailID(e.target.value)}
              required
              className="w-full"
            />
          </label>

          {/* Password */}
          <label className="input validator mb-6 w-full">
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must include at least 8 characters, a number, a lowercase, and an uppercase letter"
              required
              className="w-full"
            />
          </label>

          {/* Signup Button */}
          <div className="flex flex-col justify-center items-center w-full mb-6">
            <button
              onClick={handleSignup}
              className="btn bg-white text-lg md:text-lg lg:text-xl  hover:bg-zinc-400 duration-300 text-black  w-full sm:w-auto"
            >
              Signup
            </button>
            <div className="flex justify-center w-full mt-6">
              <Link
                to={"/login"}
                className="px-4 py-2 hover:bg-zinc-400 rounded-lg cursor-pointer font-semibold text-base sm:text-lg"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
