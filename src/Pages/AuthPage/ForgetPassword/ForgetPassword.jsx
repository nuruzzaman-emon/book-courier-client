import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { HiArrowLeft, HiOutlineEnvelope, HiOutlineKey } from "react-icons/hi2";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const ForgetPassword = () => {
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const { forgetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleReset = async ({ email }) => {
    setSending(true);
    try {
      await forgetPassword(email);
      await Swal.fire({
        icon: "success",
        title: "Check your inbox",
        text: `We sent a password reset link to ${email}.`,
        confirmButtonText: "Continue to login",
        confirmButtonColor: "#4f46e5",
      });
      navigate("/auth/login", { replace: true, state: { email } });
    } catch (error) {
      Swal.fire("Could not send reset email", error.message, "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/70 bg-base-100 p-7 shadow-2xl shadow-indigo-950/10 sm:p-10">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="relative">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
          <HiOutlineKey className="h-8 w-8" />
        </div>
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
          Account recovery
        </p>
        <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
          Forgot your password?
        </h1>
        <p className="mt-4 max-w-sm leading-7 text-slate-600">
          Enter the email address linked to your account and we will send you a
          secure reset link.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit(handleReset)}>
          <label
            htmlFor="reset-email"
            className="block text-sm font-bold text-slate-700"
          >
            Email address
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
            <HiOutlineEnvelope className="h-5 w-5 shrink-0 text-slate-400" />
            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="h-14 w-full border-0 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
              {...register("email", {
                required: "Please enter your email address.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address.",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-sm font-medium text-red-600">
              {errors.email.message}
            </p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="btn h-14 w-full rounded-2xl border-0 bg-gradient-to-r from-indigo-600 to-violet-600 text-base font-bold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60"
          >
            {sending ? "Sending reset link..." : "Send reset link"}
          </button>
        </form>

        <Link
          to="/auth/login"
          className="mt-7 inline-flex items-center gap-2 font-bold text-slate-600 transition hover:text-indigo-600"
        >
          <HiArrowLeft className="h-4 w-4" /> Back to login
        </Link>
      </div>
    </main>
  );
};

export default ForgetPassword;
