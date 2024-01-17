import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useSuperAdmin = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
  
    const { data: isSuperAdmin, isLoading: isSuperAdminLoading } = useQuery({
      enabled: !loading,
      queryKey: ["isSuperAdmin", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/superAdmin/${user?.email}`);
        console.log("this is SuperAdmin", res.data.superAdmin);
        return res.data.superAdmin;
      },
    });
    return [isSuperAdmin, isSuperAdminLoading];
  };
  export default useSuperAdmin;