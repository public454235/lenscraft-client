import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="my-12 grid place-content-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  if (!user) return <Navigate to="/login" replace={true} state={location} />;

  return children;
};

export default PrivateRoute;
