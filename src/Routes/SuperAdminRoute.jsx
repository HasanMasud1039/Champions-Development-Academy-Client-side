import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useSuperAdmin from "../Hooks/useSuperAdmin";

const SuperAdminRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    const [isSuperAdmin, isSuperAdminLoading] = useSuperAdmin();
    if (loading || isSuperAdminLoading) {
      return <span className="loading loading-infinity w-full mx-auto mt-4"></span>;
    }
    if (user && isSuperAdmin) {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  };
  
  export default SuperAdminRoute;