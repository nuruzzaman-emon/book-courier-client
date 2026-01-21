import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import axios from "axios";
import Swal from "sweetalert2";

const BookEdited = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const { data: selectedBook, isLoading } = useQuery({
    queryKey: ["selected-book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/selected-book/${id}`);
      return res.data;
    },
  });
  //   console.log(selectedBook);

  const handleEditBook = (data) => {
    setLoading(true);
    const image = data.bookPhoto[0];
    const formData = new FormData();
    formData.append("image", image);

    //get image url
    const Image_Api_Url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_img_host_key
    }`;
    axios.post(Image_Api_Url, formData).then((res) => {
      const photoUrl = res.data.data.url;
      const bookInfo = {
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        authorPhoneNumber: data.authorPhoneNumber,
        bookName: data.bookName,
        bookPhotoURL: photoUrl,
        address: data.address,
        status: data.status,
        price: data.price,
        description: data.description,
      };
      axiosSecure
        .patch(`/book-details/${id}`, bookInfo)
        .then((res) => {
          if (res.data.modifiedCount) {
            navigate("/dashboard/my-books");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your Book Has Been Updated",
              showConfirmButton: false,
              timer: 2000,
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 2000,
          });
          setLoading(false);
        });
    });
  };

  if (isLoading || loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div>
        <h2
          className="text-3xl md:text-5xl font-bold 
          bg-linear-to-r from-primary to-secondary 
          bg-clip-text text-transparent text-center my-4"
        >
          Edit Your book{" "}
        </h2>
        <div className="card-body max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(handleEditBook)}>
            <fieldset className="fieldset grid grid-cols-1 gap-10 md:grid-cols-2 text-left">
              <div>
                {/* author name */}
                <label className="label text-primary md:text-xl font-bold">
                  Author Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedBook.authorName}
                  className="input mb-3 w-full"
                  placeholder="Write author name"
                  readOnly
                  {...register("authorName", { required: true })}
                />
                {errors.authorName?.type === "required" && (
                  <p className="text-red-500 font-semibold">
                    Author name is required
                  </p>
                )}
                {/* author email */}
                <label className="label text-primary md:text-xl font-bold">
                  Author Email
                </label>
                <input
                  type="email"
                  defaultValue={selectedBook.authorEmail}
                  className="input mb-3 w-full"
                  placeholder="Write author email"
                  readOnly
                  {...register("authorEmail", { required: true })}
                />
                {errors.authorEmail?.type === "required" && (
                  <p className="text-red-500 font-semibold">
                    Author email is required
                  </p>
                )}
                {/* author phonenumber */}
                <label className="label text-primary md:text-xl font-bold">
                  Author Phone Number
                </label>
                <input
                  defaultValue={selectedBook.authorPhoneNumber}
                  type="number"
                  className="input mb-3 w-full"
                  placeholder="Write author phone number"
                  {...register("authorPhoneNumber", {
                    required: true,
                    min: 11,
                  })}
                />
                {errors.authorPhoneNumber && (
                  <p className="text-red-500 font-semibold">
                    Phone number must be exactly 11 digits
                  </p>
                )}
                {/* Address */}
                <label className="label text-primary md:text-xl font-bold">
                  Address
                </label>
                <input
                  defaultValue={selectedBook.address}
                  type="text"
                  className="input mb-3 w-full"
                  placeholder="Write address"
                  {...register("address", { required: true })}
                />
                {errors.address?.type === "required" && (
                  <p className="text-red-500 font-semibold">
                    Address is required
                  </p>
                )}
                {/* book Price */}
                <label className="label text-primary md:text-xl font-bold">
                  Book Price
                </label>
                <input
                  defaultValue={selectedBook.price}
                  type="number"
                  className="input mb-3 w-full"
                  placeholder="Write book price"
                  {...register("price", { required: true, min: 1 })}
                />
                {errors.price && (
                  <p className="text-red-500 font-semibold">
                    Price must be greater than 0
                  </p>
                )}
              </div>
              <div>
                {/* book name */}
                <label className="label text-primary md:text-xl font-bold">
                  Book Name
                </label>
                <input
                  defaultValue={selectedBook.bookName}
                  type="text"
                  className="input mb-3 w-full"
                  placeholder="Write book name"
                  {...register("bookName", { required: true })}
                />
                {errors.bookName?.type === "required" && (
                  <p className="text-red-500 font-semibold">
                    Book Name is required
                  </p>
                )}
                {/* book image
            
             */}
                <label className="label text-primary md:text-xl font-bold">
                  Book Image
                </label>
                <input
                  defaultValue={selectedBook.bookPhoto}
                  type="file"
                  className="file-input mb-3 w-full"
                  {...register("bookPhoto", { required: true })}
                />
                {errors.bookPhoto?.type === "required" && (
                  <p className="text-red-500 font-semibold">
                    Book photo is required
                  </p>
                )}
                {/* book status */}
                <label className="label text-primary md:text-xl font-bold">
                  Book Status
                </label>
                <select
                  defaultValue={selectedBook.status}
                  className="select mb-3 w-full"
                  {...register("status", { required: true })}
                >
                  <option disabled={true}>Pick a status</option>
                  <option>published</option>
                  <option>unpublished</option>
                </select>
                {errors.status?.type === "required" && (
                  <p className="text-red-500 font-semibold">
                    Price is required
                  </p>
                )}
                {/* book description */}
                <label className="label text-primary md:text-xl font-bold">
                  Book Description
                </label>
                <textarea
                  defaultValue={selectedBook.description}
                  className="textarea h-30 w-full"
                  placeholder="Write about your book"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description?.type === "required" && (
                  <p className="text-red-500 font-semibold">
                    Description is required
                  </p>
                )}
              </div>
            </fieldset>
            <input
              type="submit"
              value="Submit Edit"
              className="btn btn-primary max-w-md mt-2"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookEdited;
