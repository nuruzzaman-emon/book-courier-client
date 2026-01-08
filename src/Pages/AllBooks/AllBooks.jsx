import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Book from "../../Components/Book/Book";
import Loading from "../../Components/Loading/Loading";
import { useForm } from "react-hook-form";

const AllBooks = () => {
  const [allItems, setAllItems] = useState([]);
  const { register, handleSubmit } = useForm();
  const axiosGeneral = useAxios();
  const { data: allBooks = [], isLoading } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axiosGeneral.get(`/all-books?status=published`);
      return res.data;
    },
  });
  useEffect(() => {
    setAllItems(allBooks);
  }, [allBooks]);

  const handleSearch = (searchData) => {
    axiosGeneral
      .get(`/all-books?status=published&search=${searchData.search}`)
      .then((res) => {
        return setAllItems(res.data);
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl md:text-5xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent my-10 text-center">
        Discover Your Favorite Books
      </h2>
      <div className="flex justify-center my-8 ">
        <form onSubmit={handleSubmit(handleSearch)}>
          <fieldset className="flex items-center">
            <label
              className="input rounded-l-4xl
  bg-linear-to-r from-primary/10 to-secondary/10
  border border-primary
"
            >
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
                type="search"
                placeholder="Search"
                {...register("search", { required: true })}
              />
            </label>
            <button className="btn btn-primary font-bold">Search</button>
          </fieldset>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-8">
        {allItems.map((book) => (
          <Book key={book._id} book={book}></Book>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
