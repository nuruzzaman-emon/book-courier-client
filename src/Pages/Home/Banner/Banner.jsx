import React from "react";
import useHook from "../../../hooks/useHook";

const Banner = () => {
  const { createUser } = useHook();
  console.log(createUser);
  return <div>this is banner</div>;
};

export default Banner;
