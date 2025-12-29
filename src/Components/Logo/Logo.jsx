import React from "react";
import { BiSolidBookOpen } from "react-icons/bi";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <BiSolidBookOpen size={24}/>
        <h2 className="font-bold md:text-2xl text-primary">Boi Ghor</h2>
      </div>
    </Link>
  );
};

export default Logo;
