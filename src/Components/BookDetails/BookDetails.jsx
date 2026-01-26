import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import BookReview from "../BookReview/BookReview";

const BookDetails = () => {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const navigate = useNavigate();
  const orderRef = useRef(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book-details", id, reviewSubmitted],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-details/${id}`);
      return res.data;
    },
  });

  const { data: reviewPermission, refetch } = useQuery({
    queryKey: ["book-orders", id],
    enabled: !!book._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-review-permission/${id}`);
      return res.data;
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { register: reviewRegister, handleSubmit: handleReviewSubmit } =
    useForm();

  const handleConfirmOrder = (data) => {
    const orderInfo = {
      bookId: book._id,
      bookName: book.bookName,
      bookAuthorEmail: book.authorEmail,
      price: book.price,
      customerName: data.name,
      customerEmail: data.email,
      customerPhoneNumbers: data.phoneNumber,
      customerAddress: data.address,
    };
    axiosSecure
      .post("/book-orders", orderInfo)
      .then((res) => {
        if (res.data.insertedId) {
          navigate("/dashboard/my-orders");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Awesome Choice!",
            text: `You’ve just ordered a great read! Please Pay ${book.price}`,
            showConfirmButton: false,
            timer: 2000,
          });
          orderRef.current?.close();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWishList = (data) => {
    const desiredBook = {
      bookName: data.bookName,
      bookId: data._id,
      price: book.price,
      bookPhotoURL: book.bookPhotoURL,
    };
    axiosSecure
      .post("/user-wishlist", desiredBook)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${book.bookName} has been added on Wishlist`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          Swal.fire({
            position: "center",
            icon: "info",
            html: `<span class="text-red-500 font-semibold">${book.bookName} is already in wishlist</span>`,
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              popup: "bg-red-100 border border-red-500 p-4 rounded-lg",
            },
          });
        }
      });
  };

  const handleSubmitReview = (data) => {
    const reviewInfo = {
      bookId: book?._id,
      customerName: user?.displayName,
      customerEmail: user?.email,
      customerPhotoURL: user?.photoURL,
      comment: data.comment,
      rating: data.rating,
    };
    axiosSecure.post("/book-review", reviewInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Thank you for your review`,
          showConfirmButton: false,
          timer: 2000,
        });
        setReviewSubmitted(true);
        refetch();
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-7xl mx-auto p-12 card bg-linear-to-r from-indigo-300 via-purple-200 to-pink-200 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-base-100 shadow-xl rounded-2xl p-6">
        {/* Book Image */}
        <div className="">
          <img
            src={book?.bookPhotoURL}
            alt={book?.bookName}
            className="w-full h-150 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-4xl font-bold text-primary my-5">
            {book?.bookName}
          </h1>

          <p className="text-gray-500 flex items-center gap-2">
            <FaUser /> Author:
            <span className="font-medium">{book?.authorName}</span>
          </p>

          <p className="text-gray-500">
            📍 Address: <span className="font-medium">{book?.address}</span>
          </p>
          <div>
            {reviewPermission?.canReview && !reviewSubmitted && (
              <div className="mt-6 rounded-xl p-6 bg-indigo-50 border border-indigo-200 shadow-md">
                <h3 className="text-xl text-primary mb-2 font-bold">
                  Write a Review
                </h3>

                <form onSubmit={handleReviewSubmit(handleSubmitReview)}>
                  <textarea
                    className="textarea textarea-bordered bg-white/80 text-black"
                    {...reviewRegister("comment", { required: true })}
                    placeholder="Your review"
                  />

                  <select
                    className="select select-bordered bg-white/80 my-2 text-black"
                    {...reviewRegister("rating", { required: true })}
                  >
                    <option value="">Rating</option>
                    <option value="5">⭐ ⭐ ⭐ ⭐ ⭐ </option>
                    <option value="4">⭐ ⭐ ⭐ ⭐</option>
                    <option value="3">⭐ ⭐ ⭐ </option>
                    <option value="2">⭐ ⭐ </option>
                    <option value="1">⭐ </option>
                  </select>
                  <br />

                  <button className="btn btn-primary mt-3">
                    Submit Review
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        {/* Book Info */}
        <div className="space-y-4">
          <div>
            <p className="text-lg leading-relaxed text-gray-600">
              {book?.description}
            </p>

            {/* Price */}
            <div className="flex justify-between text-3xl font-bold text-secondary p-3">
              <h2>৳ {book?.price}</h2>
              {user?.email === book?.authorEmail && (
                <Link to={`/dashboard/edit-book/${book?._id}`}>
                  <span className="btn btn-primary">Edit</span>
                </Link>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => orderRef.current.showModal()}
                className="btn btn-primary flex-1 gap-2"
              >
                <FaShoppingCart /> Order Now
              </button>

              <button
                onClick={() => handleWishList(book)}
                className="btn btn-outline btn-secondary gap-2"
              >
                <FaHeart /> Wishlist
              </button>
            </div>

            {/* Extra Info */}
            <div className="border-t pt-4 text-sm text-gray-500 space-y-1">
              <p>📧 Email: {book?.authorEmail}</p>
              <p>📞 Phone: {book?.authorPhoneNumber}</p>
              <p>
                🕒 Published on:{" "}
                {new Date(book?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <BookReview bookId={id}></BookReview>
        </div>
      </div>
      {/* modal */}
      <dialog ref={orderRef} className="modal">
        <div className="modal-box text-accent">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h2 className="text-3xl font-bold text-primary text-center mt-2">
              Confirm Order
            </h2>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleConfirmOrder)}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    defaultValue={user?.displayName}
                    readOnly
                    {...register("name")}
                  />
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    defaultValue={user?.email}
                    {...register("email")}
                    readOnly
                  />
                  <label className="label">Phone Number</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="Phone Number"
                    {...register("phoneNumber", { required: true })}
                  />
                  {errors.phoneNumber?.type === "required" && (
                    <p className="text-red-500">Phone number is required</p>
                  )}
                  <label className="label">Address</label>
                  <input
                    type="address"
                    className="input"
                    placeholder="Address"
                    {...register("address", { required: true })}
                  />
                  {errors.address?.type === "required" && (
                    <p className="text-red-500">Address is required</p>
                  )}

                  <button type="submit" className="btn btn-primary mt-4">
                    Place Order
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BookDetails;
