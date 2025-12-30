import React from "react";
import useHook from "../../../hooks/useAuth";

const Banner = () => {
  const { createUser } = useHook();
  // console.log(createUser);
  return <div>this is banner</div>;
};

export default Banner;
