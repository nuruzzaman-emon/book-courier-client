import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { data, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const BookDetails = () => {
  const navigate = useNavigate();
  const orderRef = useRef(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/book-details/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleConfirmOrder = (data) => {
    const orderInfo = {
      bookId: book._id,
      bookName: book.bookName,
      bookAuthor: book.authorName,
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

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-base-100 shadow-xl rounded-2xl p-6">
        {/* Book Image */}
        <div className="">
          <img
            src={book?.bookPhotoURL}
            alt={book?.bookName}
            className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
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
        </div>

        {/* Book Info */}
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-600">
            {book?.description}
          </p>

          {/* Price */}
          <div className="text-3xl font-bold text-secondary">
            ৳ {book?.price}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => orderRef.current.showModal()}
              className="btn btn-primary flex-1 gap-2"
            >
              <FaShoppingCart /> Order Now
            </button>

            <button className="btn btn-outline btn-secondary gap-2">
              <FaHeart /> Wishlist
            </button>
          </div>

          {/* Extra Info */}
          <div className="border-t pt-4 text-sm text-gray-500 space-y-1">
            <p>📧 Email: {book?.authorEmail}</p>
            <p>📞 Phone: {book?.authorPhoneNumber}</p>
            <p>
              🕒 Published on: {new Date(book?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
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
      </dialog>
    </div>
  );
};

export default BookDetails;
