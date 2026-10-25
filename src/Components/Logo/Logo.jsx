import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-1.5 rounded-xl bg-primary px-2 py-1.5 shadow-md shadow-primary/20 transition-transform duration-200 hover:scale-[1.02] sm:gap-2 sm:px-2.5 sm:py-2 md:gap-2.5 md:px-3 md:py-2">
        {/* Animated book icon */}
        <img src="/bbbook.jfif" alt="" className="h-7 w-7 rounded-md object-cover sm:h-8 sm:w-8 md:h-9 md:w-9" />
        <h2 className="whitespace-nowrap text-sm font-extrabold tracking-wide text-white drop-shadow-sm sm:text-base md:text-lg">
          Book Nest
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
