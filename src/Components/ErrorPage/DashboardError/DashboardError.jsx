import React from "react";
import dashboardError from "./dashboarderr.json";
import Lottie from "lottie-react";
import { Link } from "react-router";

const DashboardError = () => {
  return (
    <div className="flex  justify-center ">
      <div className="relative">
        <h1 className="absolute left-[33%] -top-4  text-5xl font-extrabold text-red-500">
          ERORR
        </h1>
        <Lottie animationData={dashboardError} loop={true} />
        <h2 className=" absolute -bottom-5 left-[27%] text-4xl font-bold  text-red-500">
          Page Not Found
        </h2>
        <Link to={"/"}>
          <span className="btn btn-primary absolute -bottom-20 left-[35%] text-center">
            Go Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardError;
