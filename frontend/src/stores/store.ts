import { create } from "zustand";

// Define the structure of the user profile
interface UserProfile {
  address: string;
  age: number;
  city: string;
  contact: number;
  gender: string;
}

// Define the structure of the user
interface User {
  email: string;
  name: string;
  profile?: UserProfile;
  role:string
}

// Define the structure of the user store
interface UserStore {
  user: User | null;
  update: (user: User) => void;
}

// Create the user store using Zustand
export const useUserStore = create<UserStore>((set) => ({
  user: null,
  update: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

