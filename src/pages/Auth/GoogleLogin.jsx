import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const GoogleLogin = () => {
  const { loading, loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    const res = await loginWithGoogle();
    if (res.message) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: res.message,
        timer: 2000,
        position: "top-end",
      });
    }
  };
  return (
    <>
      <div className="flex items-center justify-center gap-5">
        <h3 className="gradient-text font-semibold text-lg">Continue with</h3>
        <button
          disabled={loading}
          onClick={handleGoogleLogin}
          type="button"
          className="btn btn-circle bg-neutral/10 hover:bg-neutral/20 text-xl disabled:opacity-0"
        >
          <FcGoogle />
        </button>
      </div>
      <div className="divider max-w-sm mx-auto my-6 text-sm">OR</div>
    </>
  );
};

export default GoogleLogin;
