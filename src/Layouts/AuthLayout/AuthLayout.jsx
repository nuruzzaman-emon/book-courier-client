import React from "react";
import { Outlet } from "react-router";
import AuthAnimation from "../../Pages/AuthPage/AuthAnimation/AuthAnimation";

const AuthLayout = () => {
  return (
    <div className=" w-11/12 mx-auto md:flex items-center justify-between">
      <Outlet></Outlet>
      <AuthAnimation></AuthAnimation>
    </div>
  );
};

export default AuthLayout;
