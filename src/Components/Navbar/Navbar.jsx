import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  console.log(user);
  const links = (
    <>
      <li className="md:text-xl font-semibold">
        <NavLink to="/">Books</NavLink>
      </li>
      <li className="md:text-xl font-semibold">
        <NavLink to="/">About</NavLink>
      </li>
      <li className="md:text-xl font-semibold">
        <NavLink to="/">DashBoard</NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    signOutUser();
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <>
            <img src={user?.photoURL} className="w-10 h-10 rounded-full" />
            <a onClick={handleSignOut} className="btn">
              Sign Out
            </a>
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <button className=" btn btn-xs md:btn-md btn-primary">
                Login
              </button>
            </Link>
            <Link to="/auth/register">
              <button className="btn btn-xs md:btn-md btn-primary">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
