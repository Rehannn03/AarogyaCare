// components/UserProvider.tsx
"use client";

import { useUserStore } from "@/stores/store";
import { fetchUser } from "@/lib/fetchUser";
import { useEffect } from "react";

export default function UserProvider({ children }) {
  const { user, update } = useUserStore();

  useEffect(() => {
    const check = async () => {
      const user = await fetchUser(); // e.g. from cookie-based API route
      if (user) update(user);
    };

    if (!user) check();
  }, [user]);

  return <>{children}</>;
}
