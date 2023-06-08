import { useState } from "react";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
  };

  return (
    <div className="container my-20">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleLogin} className="">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-8 text-center">
            Login
          </h1>
          <GoogleLogin />
          <div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-base">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="form-control mb-6 relative">
              <label className="label">
                <span className="label-text text-base">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input md:py-7 input-bordered border-2 focus:outline-none focus:border-primary pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 bottom-5 text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-control mb-6">
              <button
                type="submit"
                className="btn btn-gradient md:btn-lg normal-case md:text-xl"
              >
                Login
                <FaArrowRight className="text-base align-bottom" />
              </button>
            </div>
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
        </form>
      </div>
    </div>
  );
};

export default Login;
