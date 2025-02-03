"use client"


import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import { useEffect } from "react";


export default function RootLayout({ children }) {
  const { user, update } = useUserStore();
  useEffect(() => {
    if (!user) {
      fetchAndSetUserStore(update);
    }
  }, [user]);
  return (
    <html lang="en">
      <body className="bg-white">
       
        {children}
      </body>
      <Toaster />
    </html>
  );
}
