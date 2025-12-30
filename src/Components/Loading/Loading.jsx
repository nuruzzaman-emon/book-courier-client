import React from "react";
import animationData from "./JustFlowTeal.json";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div className="flex justify-center ">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Loading;
