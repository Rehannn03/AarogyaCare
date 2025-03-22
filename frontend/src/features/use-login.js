import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import apiClient from "@/api-client/apiClient";
import { useToast } from "@/components/ui/use-toast";

export const useLogin = () => {
    const  toast  = useToast();
    const router = useRouter();

    return useMutation({
        mutationFn: async ({ email, password }) => {
            try {
                const response = await apiClient.post("/users/login", { email, password });

                console.log("API Response:", response);

                if (!response || !response.data) {
                    throw new Error("Invalid server response");
                }

                return response.data; // Assuming API returns user data/token
            } catch (error) {
                console.error("Login Error:", error);
                throw new Error(error.response?.data?.message || "Login failed");
            }
        },
        onSuccess: (data) => {
            toast.toast({
                title: "Logged in",
                description: "You have been successfully logged in.",
            });
            if(data.data.role==="patient"){
                router.push("/patient-dashboard");
            }

            router.push("/dashboard");
        },
        onError: (error) => {
            toast.toast({
                title: "Login Failed",
                description: error.message || "An error occurred",
                variant: "destructive",
            });
        },
    });
};
