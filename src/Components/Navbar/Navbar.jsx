import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { motion } from "motion/react";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const { role } = useRole();

  const links = (
    <>
      <li className="md:text-lg font-semibold hover:text-primary transition-colors duration-300">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="md:text-lg font-semibold hover:text-primary transition-colors duration-300">
        <NavLink to="/all-books">All Books</NavLink>
      </li>
      <li className="md:text-lg font-semibold hover:text-primary transition-colors duration-300">
        <NavLink
          to={
            role === "admin"
              ? "/dashboard/all-users"
              : role === "librarian"
                ? "/dashboard/my-books"
                : "/dashboard/my-orders"
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    signOutUser();
  };

  return (
    <div className="navbar w-11/12 mx-auto bg-base-100 shadow-lg rounded-2xl p-2 md:p-4 my-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-xl"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            <img
              src={user.photoURL}
              alt="User"
              className="w-6 md:w-10 h-6 md:h-10 rounded-full ring-2 ring-primary"
            />
            <motion.button
              whileHover={{
                rotateX: 20,
                rotateY: 15,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
              }}
              style={{ transform: "translateZ(100px)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={handleSignOut}
              className="btn btn-xs md:btn-md btn-primary hover:bg-secondary transition-colors  duration-200"
            >
              Sign Out
            </motion.button>
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <motion.span
                whileHover={{
                  rotateX: 20,
                  rotateY: 15,
                  boxShadow: "1px 3px 4px 1px 10px",
                }}
                style={{ transform: "translateZ(100px)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="btn btn-xs md:btn-md btn-primary hover:bg-secondary transition-colors duration-300"
              >
                Login
              </motion.span>
            </Link>
            <Link to="/auth/register">
              <motion.span
                whileHover={{
                  rotateX: 20,
                  rotateY: 15,
                  boxShadow: "1px 3px 4px 1px 10px",
                }}
                style={{ transform: "translateZ(100px)" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="btn btn-xs md:btn-md btn-outline btn-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Register
              </motion.span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
