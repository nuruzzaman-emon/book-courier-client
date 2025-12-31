import React from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Components/Loading/Loading";
import Logo from "../../Components/Logo/Logo";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
//   console.log(location);
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate to="/auth/login" state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
