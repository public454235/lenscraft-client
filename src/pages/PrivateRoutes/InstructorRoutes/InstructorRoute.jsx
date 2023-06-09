import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";
import useUserRole from "../../../hooks/useUserRole";

const InstructorRoute = ({ children }) => {
  const { role, isLoading } = useUserRole();

  if (isLoading) return <Spinner />;

  if (role !== "instructor") {
    Swal.fire({
      icon: "error",
      title: "You are not Instructor",
    });
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default InstructorRoute;
