import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Adduser } from "../store/UserSlice";
import { div } from "framer-motion/client";

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
    <div className="bg-[rgba(0,0,0,.6)] w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[50]">
      <div className="flex justify-center items-center min-h-screen px-4 absolute  ">
        <div className="card bg-zinc-800 shadow-sm w-[90%] max-w-md p-6">
          {/* Header */}
          <div className="flex  justify-center items-center font-semibold text-2xl sm:text-3xl mb-10 mt-4">
            <h1>Login</h1>
            <i
              onClick={goBack}
              className="ri-close-fill absolute right-0 p-4 cursor-pointer text-lg md:text-2xl lg:text-3xl sm:text-xl"
            ></i>
          </div>

          <div className="flex flex-col gap-8">
            <label className="input validator w-full flex items-center gap-3 text-base md:text-lg">
              <input
                ref={emailRef}
                type="email"
                placeholder="Enter Email address"
                className="w-full text-base md:text-lg"
                value={EmailID}
                onChange={(e) => setEmailID(e.target.value)}
              />
            </label>

            <label className="input validator w-full flex items-center gap-3 text-base md:text-lg">
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                className="w-full text-base md:text-lg"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className="flex flex-col gap-6">
              <button
                onClick={handleLogin}
                className="btn bg-white hover:bg-zinc-400 duration-300 text-black  flex 
            items-center justify-center mt-5 py-3 text-base sm:text-lg md:text-xl"
              >
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
    </div>
  );
};

export default Login;
