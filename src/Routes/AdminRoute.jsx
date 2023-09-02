import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    if (loading || isAdminLoading) {
      return <span className="loading loading-infinity w-full mx-auto "></span>;
    }
    if (user && isAdmin) {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  };
  
  export default AdminRoute;