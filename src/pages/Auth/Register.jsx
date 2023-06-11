import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const { user, loading, error, createUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setRegisterError(null);
      const { name, photoURL, email, password, password2 } = data;
      if (password !== password2) throw new Error("Password did not match");
      const res = await createUser(name, photoURL, email, password);
      if (res.message) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success!",
          text: res.message,
          timer: 2000,
        });
      }
      console.log(data);
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  if (user) return <Navigate to="/" replace={true} />;

  return (
    <div className="container my-20">
      <Helmet>
        <title>Register | LensCraft</title>
      </Helmet>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <Fade direction="up" cascade damping={0.2} triggerOnce>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-8 text-center">
              Register
            </h1>
            <GoogleLogin />
            <div>
              {/* photo url */}
              <div className="form-control mb-6">
                <label className="label" htmlFor="photoURL">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  id="photoURL"
                  placeholder="photo url"
                  className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary"
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
                  <span className="text-red-500 text-sm p-1">
                    Photo URL is required
                  </span>
                )}
              </div>
              {/* name */}
              <div className="form-control mb-4">
                <label className="label" htmlFor="name">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="name"
                  className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm p-1">
                    Name is required
                  </span>
                )}
              </div>
              {/* email */}
              <div className="form-control mb-4">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="email"
                  className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary"
                  {...register("email", {
                    required: true,
                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <span className="text-red-500 text-sm p-1">
                    Email is required
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-red-500 text-sm p-1">
                    Please input valid email
                  </span>
                )}
              </div>
              {/* password */}
              <div className="form-control mb-4 relative">
                <label className="label" htmlFor="password">
                  <span className="label-text text-base">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary pr-12"
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  })}
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500 text-sm p-1">
                    Password is required
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500 text-sm p-1">
                    Password should contain minimum 6 characters, one uppercase
                    letter, one lowercase letter, and one special character
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-14 md:top-16 text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* confirm password */}
              <div className="form-control mb-4 relative">
                <label className="label" htmlFor="password2">
                  <span className="label-text text-base">Confirm Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password2"
                  placeholder="confirm password"
                  className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary pr-12"
                  {...register("password2")}
                />
                {registerError && (
                  <span className="text-red-500 text-sm p-1">
                    {registerError}
                  </span>
                )}
                {error && (
                  <span className="text-red-500 text-sm p-1">{error}</span>
                )}
              </div>

              {/* register button */}
              <div className="form-control mb-6">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-gradient md:btn-lg normal-case md:text-xl disabled:text-white"
                >
                  Register
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <FaArrowRight className="text-base align-bottom" />
                  )}
                </button>
              </div>
              {/* link to login page */}
              <div className="flex items-center justify-center gap-x-5">
                <span className="label-text flex items-center gap-x-2">
                  Already have an account? Click here <HiArrowLongRight />
                </span>

                <input
                  type="checkbox"
                  onClick={(e) =>
                    e.target.checked &&
                    setTimeout(() => navigate("/login"), 500)
                  }
                  className="toggle toggle-secondary"
                  defaultChecked={false}
                />
              </div>
            </div>
          </Fade>
        </form>
      </div>
    </div>
  );
};

export default Register;
