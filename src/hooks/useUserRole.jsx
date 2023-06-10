import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useUserRole = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const { data, isLoading } = useQuery({
    queryKey: [user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      if (user.email) {
        const res = await secureAxios.get(`users/${user?.email}`);
        return res.data;
      }
    },
  });
  return { role: data?.role, isLoading };
};

export default useUserRole;
