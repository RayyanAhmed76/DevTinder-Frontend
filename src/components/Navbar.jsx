import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg px-[2%] mt-[13px] md:mt-[20px]">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl">
          DevTinder
        </a>
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="  avatar">
          <div className="w-10 sm:w-15 md:w-15 rounded-full cursor-pointer">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-50 p-2 shadow "
        >
          <div className="flex flex-col gap-4">
            <Link className="t hover:bg-zinc-800 py-[2%] rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl">
              Profile
            </Link>

            <Link className="hover:bg-zinc-800 py-[2%] rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl">
              Settings
            </Link>

            <Link className="hover:bg-zinc-800 py-[2%] rounded-md text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl">
              Logout
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
