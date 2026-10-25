import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

const ManageBooks = () => {
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-books-admin", {
        params: { searchText },
      });
      return res.data;
    },
  });

  const handleSearch = (data) => {
    setSearchText(data.search);
    reset();
  };

  const handleUpdateStatus = async (book, newStatus) => {
    try {
      const res = await axiosSecure.patch("/books", null, {
        params: { bookId: book._id, newStatus },
      });
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
    } catch (error) {
      Swal.fire("Could not update book", error.message, "error");
    }
  };

  const handleDeleteBook = async (book) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this book!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/books/${book._id}`);
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
        } catch (error) {
          Swal.fire("Could not delete book", error.message, "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen rounded-3xl border border-slate-700/70 bg-[#151d31] p-4 text-slate-100 shadow-xl shadow-black/20 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-700/70 bg-linear-to-br from-[#202b46] via-[#19243b] to-[#151d31] px-5 py-7 text-center sm:mb-10 sm:px-8 sm:py-9">
        <div className="absolute -right-10 -top-20 h-52 w-52 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="relative">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-300">Catalog administration</p>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
          Books Management
        </h2>
        <p className="mt-2 text-sm text-slate-400">Review listings and manage publication status.</p>
        <span className="mt-4 inline-flex items-center rounded-full border border-rose-300/20 bg-rose-400/10 px-4 py-1.5 text-sm font-bold text-rose-200">
          Total: {books.length}
        </span>
        </div>
      </div>
      <div className="my-6 flex justify-center sm:my-8">
        <form onSubmit={handleSubmit(handleSearch)}>
          <fieldset className="flex items-center">
            <label
              className="input input-sm h-12 w-[min(65vw,420px)] rounded-l-2xl rounded-r-none border border-slate-600 bg-[#0f1728] text-slate-200 md:input-md"
            >
              <svg
                className="h-[1em] text-rose-300 opacity-80"
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
                placeholder="Search books..."
                {...register("search", { required: true })}
              />
            </label>
            <button className="btn btn-sm h-12 rounded-l-none rounded-r-2xl border-0 bg-rose-500 px-5 font-bold text-white hover:bg-rose-400 md:btn-md">
              Search
            </button>
          </fieldset>
        </form>
      </div>
      {/* Responsive Table Container */}
      <div className="mx-auto max-w-6xl overflow-x-auto rounded-2xl border border-slate-700/70 bg-[#111a2d] shadow-xl shadow-black/20">
        <table className="table w-full">
          <thead className="sticky top-0 z-10 bg-[#202b46] text-slate-300">
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
              <tr key={book._id} className="border-b border-slate-700/60 text-slate-200 transition-colors hover:bg-white/[0.04]">
                <th>{index + 1}</th>

                {/* Book Info */}
                <td className="min-w-62.5">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 shadow">
                        <img src={book.bookPhotoURL} alt={book.bookName} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-white sm:text-base">
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

                <td className="font-medium text-slate-300">{book.authorName}</td>

                <td className="text-sm text-slate-400">
                  {new Date(book.createdAt).toDateString()}
                </td>

                {/* Actions */}
                <td className="text-center">
                  <div className="flex  justify-center items-center gap-2">
                    {book.status === "published" ? (
                      <button
                        onClick={() => handleUpdateStatus(book, "unpublished")}
                        className="btn btn-outline btn-secondary btn-xs md:btn-md flex items-center gap-2"
                      >
                        <FaEyeSlash /> Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(book, "published")}
                        className="btn btn-outline btn-primary btn-xs md:btn-md flex items-center gap-2"
                      >
                        <FaEye /> Publish
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteBook(book)}
                      className="btn btn-outline btn-error btn-xs md:btn-md flex items-center gap-2"
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
