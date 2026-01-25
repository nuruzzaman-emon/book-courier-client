import React from "react";
import { BiSolidBookOpen } from "react-icons/bi";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="btn btn-xs md:btn-md btn-primary px-3  py-3">
        {/* Animated book icon */}
        <BiSolidBookOpen className="text-white animate-pulse w-4 h-4 md:w-10 md:h-10" />
        <h2 className="font-extrabold text-xs md:text-xl text-white tracking-wide drop-shadow-lg animate-pulse">
          Book Nest
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
