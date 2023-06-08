import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useUserRole = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const { data, isLoading } = useQuery({
    queryHash: [user.email],
    queryFn: async () => {
      const res = await secureAxios.get(`users/${user.email}`);
      return res.data;
    },
  });
  return { role: data?.role, isLoading };
};

export default useUserRole;
