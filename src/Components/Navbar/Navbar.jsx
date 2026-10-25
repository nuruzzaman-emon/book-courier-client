import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { motion as Motion } from "motion/react";
import Theme from "../Theme/Theme";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  

  const links = (
    <>
      <li>
        <NavLink to="/" end className="rounded-full px-4 py-2 font-semibold">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-books"
          className="rounded-full px-4 py-2 font-semibold"
        >
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-profile"
          className="rounded-full px-4 py-2 font-semibold"
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="mx-auto my-2 w-[calc(100%-1rem)] max-w-7xl sm:my-3 sm:w-[calc(100%-2rem)]">
      <div className="navbar min-h-0 rounded-2xl border border-base-300/70 bg-base-100/95 px-2 py-2 shadow-lg shadow-primary/10 backdrop-blur-md sm:px-4 md:py-3">
        <div className="navbar-start min-w-0 gap-1">
          <div className="dropdown lg:hidden">
            <button
              type="button"
              tabIndex={0}
              aria-label="Open navigation menu"
              className="btn btn-ghost btn-square btn-sm text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-56 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-xl"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-2 px-1 [&_a.active]:bg-primary/10 [&_a.active]:text-primary [&_a.active]:no-underline">
            {links}
          </ul>
        </div>

        <div className="navbar-end flex-nowrap gap-1 sm:gap-2">
          {user ? (
            <Motion.button
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              onClick={signOutUser}
              className="btn btn-primary btn-xs rounded-full px-3 sm:btn-sm sm:px-4"
            >
              Sign Out
            </Motion.button>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="btn btn-ghost btn-xs rounded-full px-3 text-primary sm:btn-sm sm:px-4"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-primary btn-xs rounded-full px-3 shadow-md shadow-primary/20 sm:btn-sm sm:px-4"
              >
                Register
              </Link>
            </>
          )}
          <Theme />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
