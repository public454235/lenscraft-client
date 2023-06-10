import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useEnrolledClasses = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ["enrolled-classes", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`enrolled-classes/${user?.email}`);
      return res.data;
    },
  });
  return { enrolledClasses, isLoading };
};

export default useEnrolledClasses;
