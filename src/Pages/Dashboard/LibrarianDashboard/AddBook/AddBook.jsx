import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoBookSharp } from "react-icons/io5";
import Loading from "../../../../Components/Loading/Loading";
import uploadImageToCloudinary from "../../../../utils/uploadImageToCloudinary";

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddBook = async (data) => {
    setLoading(true);
    try {
      const bookInfo = {
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        authorPhoneNumber: data.authorPhoneNumber,
        bookName: data.bookName,
        bookPhotoURL: await uploadImageToCloudinary(data.bookPhoto[0]),
        address: data.address,
        status: data.status,
        price: data.price,
        description: data.description,
      };
      const response = await axiosSecure.post("/books", bookInfo);
      if (!response.data.insertedId) throw new Error("The book could not be saved.");

      navigate("/dashboard/my-books");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your book has been added",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      Swal.fire("Could not add book", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="mx-auto max-w-6xl px-1 py-2 text-slate-100 sm:px-2">
      <div className="relative mb-7 overflow-hidden rounded-3xl border border-slate-700/70 bg-linear-to-br from-[#202b46] via-[#19243b] to-[#151d31] p-6 shadow-xl shadow-black/20 sm:p-8">
        <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-rose-500/15 text-rose-300 ring-1 ring-rose-300/20"><IoBookSharp size={26} /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-300">Library inventory</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">Add a new book</h2>
            <p className="mt-1 text-sm text-slate-400">Fill in the book details to add it to your collection.</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-700/70 bg-[#151d31] shadow-xl shadow-black/20">
        <div className="border-b border-slate-700/70 px-5 py-4 sm:px-8">
          <h3 className="font-bold text-white">Book information</h3>
          <p className="mt-1 text-xs text-slate-400">Fields marked as required need to be completed before submission.</p>
        </div>
        <div className="p-5 sm:p-8">
        <form onSubmit={handleSubmit(handleAddBook)}>
          <fieldset className="fieldset grid grid-cols-1 gap-x-8 gap-y-6 text-left md:grid-cols-2">
            <div className="space-y-1">
              {/* author name */}
              <label className="label text-sm font-bold text-slate-300">
                Author Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                className="input mb-3 w-full rounded-xl border-slate-600 bg-[#0f1728] text-slate-100 placeholder:text-slate-500 focus:border-rose-400 focus:outline-rose-400"
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
              <label className="label text-sm font-bold text-slate-300">
                Author Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                className="input mb-3 w-full rounded-xl border-slate-600 bg-[#0f1728] text-slate-100 placeholder:text-slate-500 focus:border-rose-400 focus:outline-rose-400"
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
              <label className="label text-sm font-bold text-slate-300">
                Author Phone Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                className="input mb-3 w-full rounded-xl border-slate-600 bg-[#0f1728] text-slate-100 placeholder:text-slate-500 focus:border-rose-400 focus:outline-rose-400"
                placeholder="Write author phone number"
                {...register("authorPhoneNumber", {
                  required: true,
                  pattern: /^\d{11}$/,
                })}
              />
              {errors.authorPhoneNumber && (
                <p className="text-red-500 font-semibold">
                  Phone number must be exactly 11 digits
                </p>
              )}
              {/* Address */}
              <label className="label text-sm font-bold text-slate-300">
                Address
              </label>
              <input
                type="text"
                className="input mb-3 w-full rounded-xl border-slate-600 bg-[#0f1728] text-slate-100 placeholder:text-slate-500 focus:border-rose-400 focus:outline-rose-400"
                placeholder="Write address"
                {...register("address", { required: true })}
              />
              {errors.address?.type === "required" && (
                <p className="text-red-500 font-semibold">
                  Address is required
                </p>
              )}
              {/* book Price */}
              <label className="label text-sm font-bold text-slate-300">
                Book Price
              </label>
              <input
                type="number"
                className="input mb-3 w-full rounded-xl border-slate-600 bg-[#0f1728] text-slate-100 placeholder:text-slate-500 focus:border-rose-400 focus:outline-rose-400"
                placeholder="Write book price"
                {...register("price", { required: true, min: 1 })}
              />
              {errors.price && (
                <p className="text-red-500 font-semibold">
                  Price must be greater than 0
                </p>
              )}
            </div>
            <div className="space-y-1">
              {/* book name */}
              <label className="label text-sm font-bold text-slate-300">
                Book Name
              </label>
              <input
                type="text"
                className="input mb-3 w-full rounded-xl border-slate-600 bg-[#0f1728] text-slate-100 placeholder:text-slate-500 focus:border-rose-400 focus:outline-rose-400"
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
              <label className="label text-sm font-bold text-slate-300">
                Book Image
              </label>
              <input
                type="file"
                className="file-input mb-3 w-full rounded-xl border-slate-600 bg-[#0f1728] text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-700 file:px-3 file:py-2 file:font-semibold file:text-slate-100"
                {...register("bookPhoto", { required: true })}
              />
              {errors.bookPhoto?.type === "required" && (
                <p className="text-red-500 font-semibold">
                  Book photo is required
                </p>
              )}
              {/* book status */}
              <label className="label text-sm font-bold text-slate-300">
                Book Status
              </label>
              <select
                defaultValue="Pick a status"
                className="select mb-3 w-full rounded-xl border-slate-600 bg-[#0f1728] text-slate-100 focus:border-rose-400 focus:outline-rose-400"
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
              <label className="label text-sm font-bold text-slate-300">
                Book Description
              </label>
              <textarea
                className="textarea h-36 w-full rounded-xl border-slate-600 bg-[#0f1728] text-slate-100 placeholder:text-slate-500 focus:border-rose-400 focus:outline-rose-400"
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
          <div className="mt-7 flex justify-end border-t border-slate-700/70 pt-6">
            <input type="submit" value="Add Book" className="btn btn-outline btn-primary min-w-40 rounded-xl px-7 font-bold" />
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
