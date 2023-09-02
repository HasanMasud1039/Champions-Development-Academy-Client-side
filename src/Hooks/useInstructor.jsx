import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

const useInstructor = () => {
    const {user,loading} = useAuth()
    const [axiosSecure] = useAxiosSecure()

    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
      enabled: !loading,
      queryKey: ["isInstructor", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/instructor/${user?.email}`);

        // console.log("this is Instructor");
        return res.data.instructor;
      },
    });
    // console.log(isInstructor);
    return [isInstructor, isInstructorLoading];


}

export default useInstructor;