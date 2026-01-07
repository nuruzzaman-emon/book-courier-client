import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-books");
      return res.data;
    },
  });

  const handleUpdateStatus = async (book, newStatus) => {
    const res = await axiosSecure.patch(
      `/books?bookId=${book._id}&newStatus=${newStatus}`
    );
    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${book.bookName} updated to ${newStatus}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleDeleteBook = (book) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/books/${book._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${book.bookName} has been deleted`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-base-100 rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2 md:gap-0">
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Books Management
        </h2>
        <span className="badge badge-primary badge-lg">
          Total: {books.length}
        </span>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto max-w-6xl mx-auto rounded-xl shadow-2xl">
        <table className="table table-zebra w-full ">
          <thead className="bg-base-200 sticky top-0 z-10">
            <tr className="text-base font-semibold">
              <th>#</th>
              <th>Book</th>
              <th>Author</th>
              <th>Created At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="hover:bg-base-200 transition-all">
                <th>{index + 1}</th>

                {/* Book Info */}
                <td className="min-w-[250px]">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 shadow">
                        <img src={book.bookPhotoURL} alt={book.bookName} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold text-sm sm:text-base">
                        {book.bookName}
                      </p>
                      <span
                        className={`badge badge-sm ${
                          book.status === "published"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {book.status}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="font-medium">{book.authorName}</td>

                <td className="text-sm opacity-70">
                  {new Date(book.createdAt).toDateString()}
                </td>

                {/* Actions */}
                <td className="text-center">
                  <div className="flex  justify-center items-center gap-2">
                    {book.status === "published" ? (
                      <button
                        onClick={() => handleUpdateStatus(book, "unpublished")}
                        className="btn btn-warning btn-xs md:btn-md flex items-center gap-2"
                      >
                        <FaEyeSlash /> Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(book, "published")}
                        className="btn btn-success btn-xs md:btn-md flex items-center gap-2"
                      >
                        <FaEye /> Publish
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteBook(book)}
                      className="btn btn-error btn-xs md:btn-md flex items-center gap-2"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
