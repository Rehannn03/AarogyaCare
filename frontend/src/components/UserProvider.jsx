"use client";

import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import { useEffect } from "react";

export default function UserProvider({ children }) {
  const { user, update } = useUserStore();

  useEffect(() => {
    if (!user) {
      fetchAndSetUserStore(update);
    }
  }, [user]);

  return <>{children}</>;
}
