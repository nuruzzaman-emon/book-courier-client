import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddBook = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddBook = (data) => {
    const bookImg = data.bookPhoto[0];
    const formData = new FormData();
    formData.append("image", bookImg);
    //get photoURL
    const Img_Api_Url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_img_host_key
    }`;
    axios.post(Img_Api_Url, formData).then((res) => {
      const bookPhotoURL = res.data.data.url;
      const bookInfo = {
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        authorPhoneNumber: data.authorPhoneNumber,
        bookName: data.bookName,
        bookPhotoURL: bookPhotoURL,
        address: data.address,
        status: data.status,
        price: data.price,
        description: data.description,
      };
      axiosSecure.post("/books", bookInfo).then((res) => {
        if (res.data.insertedId) {
          navigate("/dashboard/my-books");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Book Has Been Added",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    });
  };
  return (
    <div>
      <h2 className="text-4xl font-bold text-primary my-6">Add a new book </h2>
      <div className="card-body max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(handleAddBook)}>
          <fieldset className="fieldset grid grid-cols-1 gap-10 md:grid-cols-2 text-left">
            <div>
              {/* author name */}
              <label className="label text-primary md:text-xl font-bold">
                Author Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
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
                defaultValue={user?.email}
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
                type="number"
                className="input mb-3 w-full"
                placeholder="Write author phone number"
                {...register("authorPhoneNumber", {
                  required: true,
                  min: 11,
                  max: 11,
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
                defaultValue="Pick a status"
                className="select mb-3 w-full"
                {...register("status", { required: true })}
              >
                <option disabled={true}>Pick a status</option>
                <option>published</option>
                <option>unpublished</option>
              </select>
              {errors.status?.type === "required" && (
                <p className="text-red-500 font-semibold">Price is required</p>
              )}
              {/* book description */}
              <label className="label text-primary md:text-xl font-bold">
                Book Description
              </label>
              <textarea
                className="textarea h-30"
                placeholder="Write about your book"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-500 font-semibold">
                  Description is required
                </p>
              )}
            </div>
            <input
              type="submit"
              value="Add Book"
              className="btn btn-primary max-w-md"
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
