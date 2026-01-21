import React from "react";
import authErrAnimation from "./authError.json";
import Lottie from "lottie-react";
import { Link } from "react-router";

const AuthError = () => {
  return (
    <div className="flex justify-center my-6">
      <div className="relative">
        <Lottie animationData={authErrAnimation} loop={true} />
        <h2 className=" absolute bottom-20 left-[40%] text-3xl font-bold  text-red-500">
          Page Not Found
        </h2>

        <Link to={"/"}>
          <span className="btn btn-primary absolute bottom-5  left-[44%]">
            {" "}
            Go Back To Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AuthError;
