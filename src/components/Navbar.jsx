import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Adduser, Removeuser } from "../store/UserSlice";
import axios from "axios";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const feed = useSelector((state) => state.feed);

  const verifylogin = async () => {
    if (user) {
    }
  };
  const fetchuser = async () => {
    try {
      const res = await axios.get("http://localhost:7777/profile/view", {
        withCredentials: true,
      });
      dispatch(Adduser(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchuser();
    }
  }, []);

  const editprofile = () => {
    navigate("/profile/edit");
  };

  const handlelogut = async () => {
    const res = await axios.post(
      "http://localhost:7777/logout",
      {},
      { withCredentials: true }
    );
    dispatch(Removeuser());
    toast.success("Logout Successfull!");
    navigate("/login");
  };
  console.log(user);
  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center  px-4 py-3 bg-transparent z-100 ">
      <div className="flex-1">
        <Link
          to={"/"}
          className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl"
        >
          DevTinder
        </Link>
      </div>
      {user !== null ? (
        <div>
          <div className="dropdown dropdown-end flex flex-col items-center ml-10">
            <div tabIndex={0} role="button" className="  avatar">
              <div className="w-10 sm:w-15 md:w-15  rounded-full cursor-pointer">
                {user && user.photoURL && (
                  <img src={user.photoURL} alt="User" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-zinc-800 hover:bg-zinc-700 rounded-xl shadow-lg shadow-black/30 rounded-box z-50 space-y-1 pb-7 mt-[7.5vh] w-50 p-2 shadow "
            >
              <div className="flex flex-col gap-4 ">
                {pathname === "/" ? (
                  " "
                ) : (
                  <Link
                    to={"/"}
                    className="hover:bg-zinc-800 py-[2%] p-2 rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl"
                  >
                    Home
                  </Link>
                )}

                {pathname === "/feed" ? (
                  " "
                ) : (
                  <Link
                    to={"/feed"}
                    className="hover:bg-zinc-800 py-[2%] p-2 rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl"
                  >
                    Feed
                  </Link>
                )}
                {pathname === "/connections" ? (
                  " "
                ) : (
                  <Link
                    to={"/connections"}
                    className="hover:bg-zinc-800 py-[2%] p-2 rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl"
                  >
                    Connections
                  </Link>
                )}
                {pathname === "/request" ? (
                  " "
                ) : (
                  <Link
                    to={"/request"}
                    className="hover:bg-zinc-800 py-[2%] p-2 rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl"
                  >
                    Request
                  </Link>
                )}

                {pathname === "/profile" ? (
                  <a
                    onClick={editprofile}
                    className="t hover:bg-zinc-800 py-[2%] p-2 cursor-pointer rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl"
                  >
                    Edit Profile
                  </a>
                ) : (
                  <Link
                    to={"/profile"}
                    className="t hover:bg-zinc-800 py-[2%] p-2 rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl"
                  >
                    Profile
                  </Link>
                )}

                <Link
                  to={"/"}
                  onClick={handlelogut}
                  className="hover:bg-zinc-800 py-[2%] p-2 rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl"
                >
                  Logout
                </Link>
              </div>
            </ul>
            <h1>{user.firstName}</h1>
            <hr />
          </div>
        </div>
      ) : (
        <Link
          to={`/login`}
          className="px-[2vh] btn btn-ghost hover:bg-white text-black py-20px font-semibold text-lg sm:text-lg md-text-xl lg:text-2xl xl:text-3xl   text-white rounded-lg hover:text-black"
        >
          Log in
        </Link>
      )}
    </div>
  );
};

export default Navbar;
