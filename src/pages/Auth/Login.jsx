import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const { user, loading, error, loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation();
  const from = state?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const res = await loginUser(email, password);
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
    } catch (error) {
      console.error(error);
    }
  };

  if (user) return <Navigate to={from} replace={true} />;

  return (
    <div className="container my-20">
      <Helmet>
        <title>Login | LensCraft</title>
      </Helmet>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <Fade direction="up" cascade damping={0.2} triggerOnce>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-8 text-center">
              Login
            </h1>
            <GoogleLogin />
            <div>
              {/* email */}
              <div className="form-control mb-4">
                <label className="label" htmlFor="email">
                  <span className="label-text text-base">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="email"
                  className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm p-1">
                    Email is required
                  </span>
                )}
              </div>
              {/* password */}
              <div className="form-control mb-6 relative">
                <label className="label" htmlFor="password">
                  <span className="label-text text-base">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary pr-12"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm p-1">
                    Password is required
                  </span>
                )}
                {error && (
                  <span className="text-red-500 text-sm p-1">{error}</span>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-14 md:top-16 text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* login button */}
              <div className="form-control mb-6">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-gradient md:btn-lg normal-case md:text-xl disabled:text-white"
                >
                  Login
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <FaArrowRight className="text-base align-bottom" />
                  )}
                </button>
              </div>
              {/* link to register page */}
              <div className="flex items-center justify-center gap-x-5">
                <span className="label-text text-base flex items-center gap-x-2">
                  Don&#39;t have an account? Click here <HiArrowLongRight />
                </span>

                <input
                  type="checkbox"
                  onClick={(e) =>
                    !e.target.checked &&
                    setTimeout(() => navigate("/register"), 500)
                  }
                  className="toggle toggle-secondary"
                  defaultChecked
                />
              </div>
            </div>
          </Fade>
        </form>
      </div>
    </div>
  );
};

export default Login;
