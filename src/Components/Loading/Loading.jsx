import React from "react";
import animationData from "./JustFlowTeal.json";

const Loading = () => {
  return (
    <div className="flex justify-center ">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Loading;
