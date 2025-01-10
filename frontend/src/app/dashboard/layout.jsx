"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import { useRouter } from "next/navigation";
import SideModal from "@/components/SideModal/SideModal";

export default function DashboardLayout({ children }) {
  const { user, update } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    console.log("user from layout ", user)
    if (!user) {
      fetchAndSetUserStore(update);
    } else if (user.role !== "doctor" && user.role !== "admin") {
      router.push("/dashboard");
    } 
  // TODO: Uncomment the following code to enable verification
    // else if (user.role === "doctor" && !user.verified) {
    //   router.push("/verify-doctor");
    // }
  }, [user, update, router]);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <SideModal />
        <div className="col-span-3">{children}</div>
      </div>
    </section>
  );
}
