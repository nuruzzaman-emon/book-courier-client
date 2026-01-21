import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineFormatListNumbered, MdPayment } from "react-icons/md";
import { PiListHeartFill } from "react-icons/pi";
import { Link, Outlet } from "react-router";

const menuItems = [
  { to: "/", icon: <AiOutlineHome size={20} />, label: "Homepage" },
  {
    to: "/dashboard/my-orders",
    icon: <MdOutlineFormatListNumbered size={20} />,
    label: "My Orders",
  },
  {
    to: "/dashboard/invoices",
    icon: <MdPayment size={20} />,
    label: "Invoices",
  },
  {
    to: "/dashboard/wishlist",
    icon: <PiListHeartFill size={20} />,
    label: "Wishlist",
  },
  {
    to: "/dashboard/my-profile",
    icon: <CgProfile size={20} />,
    label: "My Profile",
  },
];

const ulVariants = {
  "is-drawer-open": {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  "is-drawer-close": {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const UserDashboard = () => {
  return (
    <div className="bg-[#30336b] py-12 text-white">
      <h2 className="text-5xl text-white font-bold text-center">
        User DashBoard
      </h2>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 text-2xl font-bold">User Panel</div>
          </nav>
          {/* Page content here */}
          <div className="p-4  min-h-screen">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start  is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul variants={ulVariants} className="menu w-full grow">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip={item.label}
                  >
                    {/* Home icon */}
                    {item.icon}
                    <span className="is-drawer-close:hidden">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
