import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";
import { Link, useNavigate } from "react-router";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import useAxios from "../../../hooks/useAxios";
import { uploadProfileImage } from "../../../utils/uploadImageToCloudinary";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosGeneral = useAxios();
  const { createUser, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = async (data) => {
    setLoading(true);
    let registrationStep = "Uploading your profile photo";
    let photoURL = "/default-avatar.svg";
    let photoUploadFailed = false;
    let photoUploadError = "";
    try {
      if (data.photo?.[0]) {
        try {
          photoURL = await uploadProfileImage(data.photo[0]);
        } catch (error) {
          photoUploadFailed = true;
          photoUploadError = error.message;
        }
      } else {
        photoUploadFailed = true;
        photoUploadError = "No photo was selected.";
      }

      registrationStep = "Creating your account";
      await createUser(data.email, data.password);

      registrationStep = "Saving your account profile";
      await updateUserProfile({ displayName: data.name, photoURL });
      const response = await axiosGeneral.post("/users", {
        displayName: data.name,
        photoURL,
        email: data.email,
      });
      if (!response.data.insertedId) {
        throw new Error(
          response.data.message ||
            "The server did not confirm that your profile was saved.",
        );
      }

      navigate("/");
      Swal.fire({
        position: "center",
        icon: photoUploadFailed ? "warning" : "success",
        title: photoUploadFailed ? "Account created with a default photo" : "Registration successful",
        text: photoUploadFailed
          ? `Your photo could not be uploaded, so we used a default avatar. Cloudinary: ${photoUploadError}`
          : "",
        confirmButtonText: "Continue",
      });
    } catch (err) {
      const detail =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.code ||
        err.message;
      Swal.fire(`${registrationStep} failed`, detail, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl p-10">
      <h1 className="text-5xl font-bold text-secondary text-center">
        Register now!
      </h1>
      <div className="card-body p-10">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset">
            {/* name */}
            <label className="label text-primary md:text-xl font-bold">
              Name
            </label>
            <input
              type="text"
              className="input mb-3 w-full"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 font-semibold">Name is required</p>
            )}
            {/* photo */}
            <label className="label text-primary md:text-xl font-bold">
              Photo
            </label>
            <input
              type="file"
              className="file-input w-full"
              {...register("photo", { required: true })}
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500 font-semibold">Photo is required</p>
            )}
            {/* email */}
            <label className="label text-primary md:text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              className="input my-3 w-full"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 font-semibold">Email is required</p>
            )}
            {/* password */}
            <label className="label text-primary md:text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
              })}
            />

            {errors.password && (
              <p className="text-red-500 font-semibold">
                Password should be one uppercase, one lowercase, one special
                character and must be 6 digit
              </p>
            )}
            <div>
              <Link to="/auth/forgot-password" className="link link-hover">
                Forgot password?
              </Link>
            </div>
            <button className="btn btn-primary mt-4">Register</button>
          </fieldset>
        </form>
        <p>
          Already have an account?
          <Link to="/auth/login">
            <span className="text-secondary text-xl font-bold"> Login</span>
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
