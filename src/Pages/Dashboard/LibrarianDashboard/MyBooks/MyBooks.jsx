import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Book from "../../../../Components/Book/Book";
import Loading from "../../../../Components/Loading/Loading";
import { Link } from "react-router";

const MyBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["my-books", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/books?email=${user?.email}&status=published`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-primary my-6 text-center">
        Your all books are here 
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra max-w-4xl mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Book Image</th>
              <th>Book Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={book.bookPhotoURL} alt="loading... book image" />
                  </div>
                </td>
                <td>
                  <Link to={`/dashboard/book-details/${book._id}`}>
                    {book.bookName}
                  </Link>
                </td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;
