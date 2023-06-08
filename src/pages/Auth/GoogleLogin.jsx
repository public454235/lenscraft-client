import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

const GoogleLogin = () => {
  const { loading } = useAuth();
  return (
    <>
      <div className="flex items-center justify-center gap-5">
        <h3 className="gradient-text font-semibold text-lg">Continue with</h3>
        <button
          disabled={loading}
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
