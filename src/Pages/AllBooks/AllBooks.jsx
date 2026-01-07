import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Book from "../../Components/Book/Book";
import Loading from "../../Components/Loading/Loading";

const AllBooks = () => {
  const [inputData, setInputData] = useState(null);
  const axiosGeneral = useAxios();
  const { data: allBooks = [], isLoading } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axiosGeneral.get("/all-books?status=published");
      return res.data;
    },
  });

  if (isLoading) {
    <Loading></Loading>;
  }

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-4xl font-bold text-primary my-10 text-center">
        Discover Your Favorite Books
      </h2>
      <div className="flex justify-center my-4 ">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setInputData(e.target.value)}
            type="search"
            required
            placeholder="Search"
          />
        </label>
        <p>{inputData}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {allBooks.map((book) => (
          <Book key={book._id} book={book}></Book>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
