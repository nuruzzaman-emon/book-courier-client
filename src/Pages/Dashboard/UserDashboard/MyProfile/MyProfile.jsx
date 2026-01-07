import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import Swal from "sweetalert2";
import { FaUserEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../../../../Components/Loading/Loading";

const MyProfile = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateUserProfile } = useAuth();
  const { role } = useRole();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateProfile = async (data) => {
    setLoading(true);
    const profilePic = data.photo[0];
    const formData = new FormData();
    formData.append("image", profilePic);
    //get the url
    const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_img_host_key
    }`;

    axios.post(image_Api_Url, formData).then((res) => {
      const photoURL = res.data.data.url;
      const updateData = {
        displayName: data.displayName,
        photoURL: photoURL,
      };
      updateUserProfile(updateData)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Profile Updated Successfullly",
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-white p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
        {/* Profile Top */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative group">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-200 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute bottom-0 right-0 bg-linear-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-full shadow-lg">
              <FaUserEdit />
            </span>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-800">
              {user?.displayName}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
            <span className="inline-block mt-2 px-4 py-1 rounded-full bg-linear-to-r from-green-400 to-teal-500 text-white font-semibold capitalize shadow-md animate-pulse">
              {role}
            </span>
          </div>
        </div>
        <div className="mb-8">
          <div className=" my-3">
            <h2 className="text-3xl font-extrabold bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Update Profile
            </h2>
            <p className="text-gray-500 mt-1">
              Keep your personal information up to date
            </p>
          </div>
          {/* Update Form */}
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="space-y-6"
          >
            {/* Name Field */}
            <div className=" ">
              <label className="label font-bold">
                Full Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full border-gray-300 text-accent"
                {...register("displayName", { required: true })}
              />
              {errors.displayName && (
                <p className="text-red-500 mt-1">Name is required</p>
              )}
              
            </div>
            {/* Photo Upload */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Upload Photo</span>
              </label>
              <input
                type="file"
                className="file-input  text-accent w-full"
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <p className="text-red-500 mt-1">Photo is required</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-linear-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
