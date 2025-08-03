import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Removeuser } from "../store/UserSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlelogut = (e) => {
    e.preventDefault;
    dispatch(Removeuser(null));
    toast.success("Logout Successfull!");
  };
  console.log(user);
  return (
    <div className="navbar bg-zinc-800  shadow-lg px-[2%] ">
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
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="  avatar">
              <div className="w-10 sm:w-15 md:w-15 rounded-full cursor-pointer">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`${user.photoURL}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100  rounded-box z-1 pb-5 mt-3 w-50 p-2 shadow "
            >
              <div className="flex flex-col gap-4">
                <Link className="t hover:bg-zinc-800 py-[2%] rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl">
                  Profile
                </Link>

                <Link className="hover:bg-zinc-800 py-[2%] rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl">
                  Settings
                </Link>

                <Link
                  to={"/login"}
                  onClick={handlelogut}
                  className="hover:bg-zinc-800 py-[2%] rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl"
                >
                  Logout
                </Link>
              </div>
            </ul>
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
