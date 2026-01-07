import React from "react";
import { BiSolidBookOpen } from "react-icons/bi";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
        {/* Animated book icon */}
        <BiSolidBookOpen size={30} className="text-white animate-bounce" />
        <h2 className="font-extrabold md:text-xl text-white tracking-wide drop-shadow-lg">
          Book Nest
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
