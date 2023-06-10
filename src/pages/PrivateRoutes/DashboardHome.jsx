import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useUserRole from "../../hooks/useUserRole";

const DashboardHome = () => {
  const { role, isLoading } = useUserRole();
  if (isLoading) return <Spinner />;

  if (role === "admin")
    return <Navigate to="/dashboard/manage-classes" replace={true} />;
  if (role === "instructor")
    return <Navigate to="/dashboard/my-classes" replace={true} />;
  if (role === "student")
    return <Navigate to="/dashboard/my-enrolled-classes" replace={true} />;
};

export default DashboardHome;
