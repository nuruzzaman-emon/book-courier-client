import React, {  } from "react";
import UserDashboard from "./UserDashboard/UserDashboard";
import LibrarianDashboard from "./LibrarianDashboard/LibrarianDashboard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const { role } = useRole();
  // console.log(role);
  
  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "librarian") {
    return <LibrarianDashboard></LibrarianDashboard>;
  } else {
    return <UserDashboard></UserDashboard>;
  }
};

export default Dashboard;
