"use client";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { DashboardSidebar } from "./dashboard-sidebar";

export const SidebarWrapper = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <button
        className="absolute top-4 left-4 z-50 p-3 text-white bg-primary rounded-lg md:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars className="h-6 w-6" />
      </button>

      {/* ✅ Sidebar */}
      <div className="lg:block lg:w-[264px] lg:fixed lg:top-0 lg:left-0 lg:h-screen">
        <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
    </div>
  );
}