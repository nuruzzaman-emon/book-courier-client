import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://book-courier2-server.vercel.app",
});

import React, { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    //request interceptors =
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          config.headers.Authorization = `Bearer ${await user.getIdToken()}`;
        } else {
          delete config.headers.Authorization;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    //response interceptors
    const resInterceptor = axiosSecure.interceptors.response.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
