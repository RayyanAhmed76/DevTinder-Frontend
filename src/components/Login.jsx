import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Adduser } from "../store/UserSlice";

const Login = () => {
  const [EmailID, setEmailID] = useState(null);
  const [Password, setPassword] = useState(null);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const goBack = () => navigate("/");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        { EmailID, Password },
        { withCredentials: true }
      );

      dispatch(Adduser(res.data));

      if (EmailID && Password !== null) {
        toast.success(`Welcome, ${res.data.firstName}`);
        emailRef.current.value = "";
        passwordRef.current.value = "";
        navigate("/feed");
      }
    } catch (error) {
      toast.error("Invalid credentials!");
      console.error(error);
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:7777/profile/view", {
        withCredentials: true,
      });
      dispatch(Adduser(res.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div
        className="card bg-zinc-800 shadow-sm w-full 
    max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl 
    rounded-xl p-6 sm:p-8 md:p-10 lg:p-12"
      >
        {/* Header */}
        <div
          className="flex relative justify-center items-center font-semibold 
      text-2xl sm:text-3xl md:text-4xl mb-10 mt-2"
        >
          <h1>Login</h1>
          <i
            onClick={goBack}
            className="ri-close-fill absolute right-0 p-4 cursor-pointer text-xl md:text-2xl"
          ></i>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-8">
          {/* Email */}
          <label className="input validator w-full flex items-center gap-3 text-base md:text-lg">
            {/* SVG here */}
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter Email address"
              className="w-full text-base md:text-lg"
              value={EmailID}
              onChange={(e) => setEmailID(e.target.value)}
            />
          </label>

          {/* Password */}
          <label className="input validator w-full flex items-center gap-3 text-base md:text-lg">
            {/* SVG here */}
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="w-full text-base md:text-lg"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Buttons */}
          <div className="flex flex-col gap-6">
            <button
              onClick={handleLogin}
              className="btn bg-white text-black border border-[#e5e5e5] flex 
            items-center justify-center gap-2 py-3 text-base sm:text-lg md:text-xl"
            >
              {/* SVG */}
              Login with Email
            </button>

            <Link
              to={"/signup"}
              className="text-center px-4 py-3 hover:bg-zinc-400 rounded-lg 
            cursor-pointer font-semibold text-base sm:text-lg md:text-xl"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
