"use client";

import React from "react";

import SideModal from "@/components/SideModal/SideModal";
import ProtectedRoute from "@/components/auth/ProtectedRoute"; // ✅ make sure path is correct

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["doctor", "admin","patient"]}>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <SideModal />
          <div className="col-span-3">{children}</div>
        </div>
      </section>
    </ProtectedRoute>
  );
}
