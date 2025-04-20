// lib/fetchUser.ts
import apiClient from "@/api-client/apiClient";

export const fetchUser = async () => {
  try {
    const res = await apiClient.get("/users/profile");
    const user = res.data?.data?.user;
    return user || null;
  } catch (error) {
    return null;
  }
};
