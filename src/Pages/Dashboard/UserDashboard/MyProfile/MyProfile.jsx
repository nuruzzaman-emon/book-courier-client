import React, { useState } from "react";
import {
  FaCamera,
  FaCheck,
  FaEnvelope,
  FaLock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import uploadProfileImage from "../../../../utils/uploadImageToCloudinary";

const MyProfile = () => {
  const nameForm = useForm();
  const photoForm = useForm();
  const phoneForm = useForm();
  const locationForm = useForm();
  const passwordForm = useForm();
  const profilePhotoInputId = "profile-photo-upload";
  const { user, updateUserProfile, changeUserPassword } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const [savingUpdate, setSavingUpdate] = useState(false);
  const fieldClass =
    "w-full rounded-xl border border-base-300 bg-base-200/50 px-4 py-3 text-sm text-base-content outline-none transition placeholder:text-base-content/35 focus:border-primary focus:ring-2 focus:ring-primary/15";
  const buttonClass = "btn btn-outline btn-primary rounded-xl";

  const handlePhotoInputChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await handlePhotoUpdate({ photo: [file] });
    event.target.value = "";
  };

  const handleNameUpdate = async (data) => {
    const displayName = data.name.trim();
    if (!displayName) return;

    setSavingUpdate(true);
    try {
      const previousName = user?.displayName || "";
      await axiosSecure.patch("/users/me", { displayName });
      try {
        await updateUserProfile({ displayName });
      } catch (firebaseError) {
        await axiosSecure.patch("/users/me", { displayName: previousName });
        throw firebaseError;
      }
      await user.reload();
      Swal.fire({
        icon: "success",
        title: "Name updated",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire(
        "Could not update name",
        error.response?.data?.message || error.message,
        "error",
      );
    } finally {
      setSavingUpdate(false);
    }
  };
  const handlePhotoUpdate = async (data) => {
    const photoFile = data.photo[0];
    if (!photoFile) return;
    const photoURL = await uploadProfileImage(photoFile);
    console.log("data", data);
    console.log(photoURL);

    setSavingUpdate(true);
    try {
      const previousPhoto = user?.photoURL || "";
      await axiosSecure.patch("/users/me", { photoURL });
      try {
        await updateUserProfile({ photoURL });
      } catch (firebaseError) {
        await axiosSecure.patch("/users/me", { photoURL: previousPhoto });
        throw firebaseError;
      }
      await user.reload();
      Swal.fire({
        icon: "success",
        title: "Photo updated",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire(
        "Could not update Photo",
        error.response?.data?.message || error.message,
        "error",
      );
    } finally {
      setSavingUpdate(false);
    }
  };

  const handlePhoneUpdate = async (data) => {
    const phoneNumber = data.phone.trim();
    if (!phoneNumber) return;

    setSavingUpdate(true);
    try {
      await axiosSecure.patch("/users/me", { phoneNumber });
      Swal.fire({
        icon: "success",
        title: "Phone number updated",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire(
        "Could not update phone number",
        error.response?.data?.message || error.message,
        "error",
      );
    } finally {
      setSavingUpdate(false);
    }
  };

  const handleLocationUpdate = async (data) => {
    const location = data.location.trim();
    if (!location) return;

    setSavingUpdate(true);
    try {
      await axiosSecure.patch("/users/me", { location });
      Swal.fire({
        icon: "success",
        title: "Location updated",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire(
        "Could not update location",
        error.response?.data?.message || error.message,
        "error",
      );
    } finally {
      setSavingUpdate(false);
    }
  };
  const handlePasswordUpdate = async (data) => {
    setSavingUpdate(true);
    try {
      await changeUserPassword(data.currentPassword, data.password);
      passwordForm.reset();
      await Swal.fire({
        icon: "success",
        title: "Password updated",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire(
        "Could not update password",
        error.message,
        "error",
      );
    } finally {
      setSavingUpdate(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200/70 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-7">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Your account
          </p>
          <h1 className="text-3xl font-black tracking-tight text-base-content sm:text-4xl">
            Profile settings
          </h1>
          <p className="mt-2 max-w-xl text-base-content/60">
            Manage your personal details and account security.
          </p>
        </header>

        <section className="mb-6 flex flex-col items-center gap-5 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-xl shadow-base-content/5 sm:flex-row sm:px-8">
          <div className="relative shrink-0">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={`${user?.displayName || "User"}'s profile`}
                className="h-24 w-24 rounded-full border-4 border-base-100 object-cover shadow-lg ring-2 ring-primary/20"
              />
            ) : (
              <div className="grid h-24 w-24 place-items-center rounded-full border-4 border-base-100 bg-primary text-3xl font-black text-white shadow-lg">
                {(user?.displayName || "B").trim().charAt(0).toUpperCase()}
              </div>
            )}
            <label
              onClick={() => document.getElementById(profilePhotoInputId)?.click()}
              className="absolute bottom-0 right-0 grid h-9 w-9 cursor-pointer place-items-center rounded-full border-2 border-base-100 bg-primary text-white shadow-md transition hover:scale-105"
              aria-label="Change profile photo"
            >
              <FaCamera size={13} />
            </label>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-extrabold text-base-content">
              {user?.displayName || "Your name"}
            </h2>
            <p className="mt-1 flex items-center justify-center gap-2 text-sm text-base-content/60 sm:justify-start">
              <FaEnvelope size={12} /> {user?.email}
            </p>
            {role && (
              <span className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold capitalize text-primary">
                {role} account
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success sm:ml-auto sm:self-start">
            <FaCheck /> Account active
          </span>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <FaUser />
              </span>
              <div>
                <h2 className="font-bold text-base-content">Name</h2>
                <p className="mt-1 text-sm text-base-content/55">
                  Change the name shown on your account.
                </p>
              </div>
            </div>

            <form onSubmit={nameForm.handleSubmit(handleNameUpdate)}>
              <input
                {...nameForm.register("name", { required: true })}
                className={fieldClass}
                defaultValue={user?.displayName || ""}
                placeholder="Your full name"
                aria-label="Full name"
              />
              <button
                type="submit"
                disabled={savingUpdate}
                className={`${buttonClass} mt-3`}
              >
                {savingUpdate ? "Saving…" : "Save name"}
              </button>
            </form>
            {nameForm.formState.errors.name?.type === "required" && (
              <p className="text-red-500 font-semibold">Name is required</p>
            )}
          </section>

          <section className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <FaCamera />
              </span>
              <div>
                <h2 className="font-bold text-base-content">Profile photo</h2>
                <p className="mt-1 text-sm text-base-content/55">
                  Choose an image for your account.
                </p>
              </div>
            </div>
            <form onSubmit={photoForm.handleSubmit(handlePhotoUpdate)}>
              <input
                {...photoForm.register("photo", { required: true })}
                id={profilePhotoInputId}
                type="file"
                accept="image/*"
                disabled={savingUpdate}
                onChange={handlePhotoInputChange}
                className="file-input file-input-bordered w-full rounded-xl border-base-300 bg-base-200/50 text-base-content"
                aria-label="Choose profile photo"
              />
              <button type="submit" className={`${buttonClass} mt-3`}>
                {savingUpdate ? "Saving…" : "Save photo"}
              </button>
              {photoForm.formState.errors.photo?.type === "required" && (
                <p className="text-red-500 font-semibold">Photo is required</p>
              )}
            </form>
          </section>

          <section className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <FaPhoneAlt />
              </span>
              <div>
                <h2 className="font-bold text-base-content">Phone number</h2>
                <p className="mt-1 text-sm text-base-content/55">
                  Add a number for delivery contact.
                </p>
              </div>
            </div>
            <form onSubmit={phoneForm.handleSubmit(handlePhoneUpdate)}>
              <input
                {...phoneForm.register("phone", {
                  required: true,
                  validate: (value) => !!value.trim() || "Phone is required",
                })}
                type="tel"
                className={fieldClass}
                defaultValue={user?.phoneNumber || ""}
                placeholder="e.g. +880 1XXXXXXXXX"
                aria-label="Phone number"
                disabled={savingUpdate}
              />
              <button
                type="submit"
                disabled={savingUpdate}
                className={`${buttonClass} mt-3`}
              >
                {savingUpdate ? "Saving…" : "Save number"}
              </button>
              {phoneForm.formState.errors.phone?.type === "required" && (
                <p className="text-red-500 font-semibold">Phone is required</p>
              )}
            </form>
          </section>

          <section className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <FaMapMarkerAlt />
              </span>
              <div>
                <h2 className="font-bold text-base-content">Location</h2>
                <p className="mt-1 text-sm text-base-content/55">
                  Keep your delivery address up to date.
                </p>
              </div>
            </div>
            <form onSubmit={locationForm.handleSubmit(handleLocationUpdate)}>
              <input
                {...locationForm.register("location", {
                  required: true,
                  validate: (value) => !!value.trim() || "Location is required",
                })}
                className={fieldClass}
                defaultValue={user?.location || ""}
                placeholder="City, area, or full address"
                aria-label="Location"
                disabled={savingUpdate}
              />
              <button
                type="submit"
                disabled={savingUpdate}
                className={`${buttonClass} mt-3`}
              >
                {savingUpdate ? "Saving…" : "Save location"}
              </button>
              {locationForm.formState.errors.location?.type === "required" && (
                <p className="text-red-500 font-semibold">
                  Location is required
                </p>
              )}
            </form>
          </section>

          <form
            onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)}
            className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm sm:col-span-2 sm:p-6"
          >
            <div className="mb-5 flex items-start gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <FaLock />
              </span>
              <div>
                <h2 className="font-bold text-base-content">Password</h2>
                <p className="mt-1 text-sm text-base-content/55">
                  Set a new password for your account.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                {...passwordForm.register("currentPassword", {
                  required: true,
                })}
                type="password"
                className={fieldClass}
                placeholder="Current password"
                aria-label="Current password"
                disabled={savingUpdate}
              />
              <input
                {...passwordForm.register("password", {
                  required: true,
                  minLength: 6,
                })}
                type="password"
                className={fieldClass}
                placeholder="New password"
                aria-label="New password"
                disabled={savingUpdate}
              />
              <input
                {...passwordForm.register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === passwordForm.watch("password") ||
                    "Passwords do not match",
                })}
                type="password"
                className={fieldClass}
                placeholder="Confirm new password"
                aria-label="Confirm new password"
                disabled={savingUpdate}
              />
            </div>
            <button
              type="submit"
              disabled={savingUpdate}
              className={`${buttonClass} mt-3`}
            >
              {savingUpdate ? "Saving…" : "Save password"}
            </button>
            {(passwordForm.formState.errors.currentPassword ||
              passwordForm.formState.errors.password ||
              passwordForm.formState.errors.confirmPassword) && (
              <p className="mt-2 text-sm font-semibold text-error">
                {passwordForm.formState.errors.confirmPassword?.message ||
                  "Enter your current password and a new password with at least 6 characters."}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
