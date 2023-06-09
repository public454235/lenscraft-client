import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace={true} state={location} />;

  return children;
};

export default PrivateRoute;
