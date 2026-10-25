import React from "react";
import Banner from "./Banner/Banner";
import { useQuery } from "@tanstack/react-query";
import LatestBook from "./LatestBook/LatestBook";
import Loading from "../../Components/Loading/Loading";
import Coverage from "./Coverage/Coverage";
import WhyFromUs from "../../Components/WhyFromUs/WhyFromUs";
import AnimatedSection from "./AnimatedSection/AnimatedSection";
import useAxios from "../../hooks/useAxios";
import Process from "./Process/Process";
import FAQ from "./FAQ/FAQ";

const Home = () => {
  const axiosGeneral = useAxios();
  const { data: latestBooks = [], isLoading: dataLoading, isError: booksError } = useQuery({
    queryKey: ["latest-books"],
    queryFn: async () => {
      const res = await axiosGeneral.get(`/latest-books`);
      return res.data;
    },
  });

  const { data: mapData, isLoading: mapLoading, isError: mapError } = useQuery({
    queryKey: ["mapData"],
    queryFn: async () => {
      const res = await axiosGeneral.get("/coverage");
      return res.data;
    },
  });

  const { data: allDataCount, isLoading: countLoading, isError: countError } = useQuery({
    queryKey: ["count-all-data"],
    queryFn: async () => {
      const res = await axiosGeneral.get("/all-data-count");
      return res.data;
    },
  });

  if (dataLoading || mapLoading || countLoading) {
    return <Loading></Loading>;
  }
  if (booksError || mapError || countError) {
    return <p className="py-12 text-center text-error">Could not load the home page data. Please try again.</p>;
  }
  return (
    <div className="max-w-11/12 mx-auto space-y-16">
      <Banner books={latestBooks}></Banner>
      <LatestBook books={latestBooks}></LatestBook>
      <Coverage mapData={mapData}></Coverage>
      <WhyFromUs></WhyFromUs>
      <AnimatedSection allDataCount={allDataCount}></AnimatedSection>
      <Process></Process>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
