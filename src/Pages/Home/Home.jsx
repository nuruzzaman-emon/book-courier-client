import React from "react";
import Banner from "./Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: books = [] } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-books?limit=5`);
      return res.data;
    },
  });
  return (
    <div className="max-w-11/12 mx-auto">
      <Banner books={books}></Banner>
    </div>
  );
};

export default Home;
