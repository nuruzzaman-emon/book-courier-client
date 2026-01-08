import React from "react";
import Banner from "./Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LatestBook from "./LatestBook/LatestBook";
import Loading from "../../Components/Loading/Loading";
import Coverage from "./Coverage/Coverage";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: books = [], isLoading: dataLoading } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-books?limit=8`);
      return res.data;
    },
  });

  const { data: mapData, isLoading: mapLoading } = useQuery({
    queryKey: ["mapData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coverage");
      return res.data;
    },
  });

  if (dataLoading || mapLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-11/12 mx-auto">
      <Banner books={books}></Banner>
      <LatestBook books={books}></LatestBook>
      <Coverage mapData={mapData}></Coverage>
    </div>
  );
};

export default Home;
