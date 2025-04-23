// features/use-login.ts
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/stores/store";
import { useRouter } from "next/navigation";
import apiClient from "@/api-client/apiClient";
import { useToast } from "@/components/ui/use-toast";

export const useLogin = () => {
  const { update } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await apiClient.post("/users/login", { email, password });
      return res.data?.data?.user;
    },
    onSuccess: (user) => {
      update(user);
      toast({ title: "Logged in successfully." });
      if (user.role === "admin") {
        router.push("/dashboard/admin");
      } else if (user.role === "patient") {
        router.push("/dashboard/patient");
      } else if (user.role === "doctor") {
        router.push("/dashboard/doctor");
      } else {
        // Default fallback
        router.push("/dashboard");
      }
    },
    onError: (err) => {
      toast({
        title: "Login failed",
        description: err.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};
