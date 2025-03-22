"use client";
import React, { useEffect } from "react";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import { redirect, useRouter } from "next/navigation";
import SideModal from "@/components/SideModal/SideModal";
import { useCurrent } from "@/features/getCurrent";


export default function DashboardLayout({ children }) {
  const { user, update } = useUserStore();
  const router = useRouter();
  const {User,isPending}=useCurrent()
  console.log(User);

  
 

  useEffect(() => {
    if (!user) {
      console.log("fetching user");
      
      const isloggedIn=fetchAndSetUserStore(update);
      console.log("isloggedIn",isloggedIn);
      
      if(!isloggedIn){
        redirect("/sign-in");
      }
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
