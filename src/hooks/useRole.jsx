import useAuth from "./useAuth";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosGeneral = useAxios();
  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await axiosGeneral.get(
        `/users/${encodeURIComponent(user.email)}/role`,
      );
      return res.data.role;
    },
  });

  return { role, roleLoading };
};

export default useRole;
