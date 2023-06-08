import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import useUserRole from "../../../hooks/useUserRole";

const StudentRoute = ({ children }) => {
  const { role, isLoading } = useUserRole();

  if (isLoading)
    return (
      <div className="my-12 grid place-content-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );

  if (role !== "student") {
    Swal.fire({
      icon: "error",
      title: "You are not a student",
    });
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default StudentRoute;
