import axios from "axios";

const instance = axios.create({
  baseURL: "https://book-courier-server-theta.vercel.app",
});

import React from "react";

const useAxios = () => {
  return instance;
};

export default useAxios;
