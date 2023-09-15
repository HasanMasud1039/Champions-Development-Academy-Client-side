import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useInstructor from "../Hooks/useInstructor";

const InstructorRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    if (loading || isInstructorLoading) {
      return <span className="loading loading-infinity w-full mx-auto "></span>;
    }
    if (user && isInstructor) {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  };
  
  export default InstructorRoute;