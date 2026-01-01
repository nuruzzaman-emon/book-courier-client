import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Book from "../../../../Components/Book/Book";

const MyBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: books = [] } = useQuery({
    queryKey: ["books", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/books?email=${user?.email}&status=published`
      );
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-4xl font-bold text-primary my-6 text-center">
        Your all books are here {books?.length}
      </h2>
      <div className=" w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-8">
        {books.map((book) => (
          <Book key={book._id} book={book}></Book>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
