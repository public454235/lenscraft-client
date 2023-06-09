import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner";
import useUserRole from "../../../hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useUserRole();

  if (isLoading) return <Spinner />;

  if (role !== "admin") {
    Swal.fire({
      icon: "error",
      title: "You are not Admin",
    });
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default AdminRoute;
