import React, {  } from "react";
import UserDashboard from "./UserDashboard/UserDashboard";
import LibrarianDashboard from "./LibrarianDashboard/LibrarianDashboard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import useRole from "../../hooks/useRole";
import Loading from "../../Components/Loading/Loading";
import Forbidden from "../../Components/Forbidden/Forbidden";

const Dashboard = () => {
  const { role, roleLoading } = useRole();
  // console.log(role);
  
  if (roleLoading) return <Loading />;
  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  } else if (role === "librarian") {
    return <LibrarianDashboard></LibrarianDashboard>;
  } else if (role === "user") {
    return <UserDashboard></UserDashboard>;
  }
  return <Forbidden />;
};

export default Dashboard;
