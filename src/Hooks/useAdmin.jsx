

import { useQuery, QueryClientProvider } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    enabled: !loading,
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);

      console.log("this is admin");
      return res.data.admin;
    },
  });
//   console.log(isAdmin);
  return [isAdmin, isAdminLoading];
};
export default useAdmin;