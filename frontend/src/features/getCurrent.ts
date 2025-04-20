import { useQuery } from "@tanstack/react-query";
import apiClient from "@/api-client/apiClient";



export const useCurrent = () => {
  return useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await apiClient.get("/users/profile");

      // Extract user from response
      if(!response?.data?.data?.user) {
        return null;
}
      const user = response?.data?.data?.user;

      console.log("From TanStack:", user?.name);

      return user || null; // Return null if no user found
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

};
