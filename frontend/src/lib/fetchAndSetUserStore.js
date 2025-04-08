import { fetchUser } from "./fetchUser";

export const fetchAndSetUserStore = async (update) => {
    const user = await fetchUser();
    if (user) {
      update(user);
      return user;
    }
    return null;
  };
  