import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { SiNginxproxymanager } from "react-icons/si";
import { Link, Outlet } from "react-router";
const menuItems = [
  { to: "/", icon: <AiOutlineHome size={20} />, label: "Homepage" },
  {
    to: "/dashboard/all-users",
    icon: <FaUsers size={20} />,
    label: "All-users",
  },
  {
    to: "/dashboard/manage-books",
    icon: <SiNginxproxymanager size={20} />,
    label: "Manage Books",
  },
  {
    to: "/dashboard/my-profile",
    icon: <CgProfile size={20} />,
    label: "My Profile",
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0b1020] px-3 py-6 text-slate-100 sm:px-6 sm:py-10">
      <h2 className="mb-6 text-center text-3xl font-black tracking-tight text-slate-100 sm:text-4xl">
        Admin Dashboard
      </h2>
      <div className="drawer mx-auto max-w-[1600px] overflow-hidden rounded-3xl border border-slate-700/70 bg-[#151d31] shadow-2xl shadow-black/30 lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content min-w-0 bg-[#151d31]">
          {/* Navbar */}
          <nav className="navbar sticky top-0 z-10 w-full border-b border-slate-700/70 bg-[#151d31]/95 text-slate-100 backdrop-blur">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-slate-200 lg:hidden"
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
            <div className="px-4 text-xl font-extrabold tracking-tight sm:text-2xl">Admin workspace</div>
          </nav>
          {/* Page content here */}
          <div className="min-h-[75vh] bg-[#0f1728] p-3 sm:p-6">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-[#171d35] py-5 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow text-white">
              {menuItems.map((item, i) => (
                <li key={i}>
                  <Link
                    to={`${item.to}`}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right rounded-xl px-3 py-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    data-tip={item.label}
                  >
                    {/* icon */}
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

export default AdminDashboard;
