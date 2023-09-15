import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSelect = () => {
  const { user, loading } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const {
    refetch,
    data: selectClass = [],
    error,
  } = useQuery({
    queryKey: ["select", user?.email],
    enabled: !loading,

    queryFn: async () => {
      try {
        const response = await axiosSecure(
          `/select/classes?email=${user?.email}`
        );
        // console.log(response.data); // Log the response data
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch selectClass"); // Throw an error to be caught by the calling component
      }
    },
  });

  return [selectClass, refetch, error];
};

export default useSelect;