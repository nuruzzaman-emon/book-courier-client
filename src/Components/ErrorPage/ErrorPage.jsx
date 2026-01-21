import React from "react";
import errorAnimation from "./ErrorAnimation.json";
import Lottie from "lottie-react";
import { Link } from "react-router";
const ErrorPage = () => {
  return (
    <div className=" my-6 ">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-5xl font-bold text-center text-red-500 ">ERROR</h1>
        <Lottie className="h-96" animationData={errorAnimation} loop={true} />
        <h2 className="   text-3xl font-bold  text-red-500">Page Not Found</h2>

        <Link to={"/"}>
          <span className="btn btn-primary my-2 text-center left-[44%]">
            {" "}
            Go Back To Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
