"use client";

import { useUserStore } from "@/stores/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import Loader from "@/components/Loader"; // Adjust the import path as necessary

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, update } = useUserStore();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (!user) {
        const fetched = await fetchAndSetUserStore(update);
        if (!fetched) {
          router.replace("/sign-in");
          return;
        }
      }

      const currentUser = user || (await fetchAndSetUserStore(update));

      if (
        allowedRoles.length > 0 &&
        currentUser &&
        !allowedRoles.includes(currentUser.role)
      ) {
        router.replace("/unauthorized"); 
        return;
      }

      setChecking(false);
    };

    verifyUser();
  }, [user, allowedRoles, router, update]);

  if (checking) return <Loader/>;

  return <>{children}</>;
}
