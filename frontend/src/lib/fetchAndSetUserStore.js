import apiClient from "@/api-client/apiClient";

export const fetchAndSetUserStore = async (update) => {

  try {
    const userData = await apiClient.get("/users/profile");
    console.log(userData);
    const user = userData.data.data.user;
    if (!user) {
      router.push("/sign-in"); // Proper client-side navigation
    }
    update(user);
    return true;
  } catch (error) {
    console.error(error);
  }
};
