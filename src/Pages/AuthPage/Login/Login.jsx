import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import Loading from "../../../Components/Loading/Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setLoading(true);
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location.state || "/");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErr(err.message);
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl p-10">
      <h1 className="text-5xl  font-bold text-secondary text-center">
        Login now!
      </h1>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label text-primary md:text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              className="input my-3"
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
              className="input"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 font-semibold">Password is required</p>
            )}
            {errors.password && (
              <p className="text-red-500 font-semibold">
                Password should be one uppercase, one lowercase, one special
                character and must be 6 digit
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary mt-4">Login</button>
          </fieldset>
        </form>
        {err && <p className="text-red-500">{err}</p>}
        <p>
          Didn't have an account?
          <Link state={location.state} to="/auth/register">
            <span className="text-secondary text-xl font-bold">Register</span>
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
