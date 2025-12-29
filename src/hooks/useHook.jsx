import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";

const useHook = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useHook;
