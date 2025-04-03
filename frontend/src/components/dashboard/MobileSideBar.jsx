"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DashboardSidebar } from "@/features/dietician/components/dashboard-sidebar"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false); // Close sidebar on route change
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} className="h-screen">
      <SheetTrigger asChild>
        <Button size="icon" variant="secondary" className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>

      {/* Fix Sidebar Overflowing */}
      <SheetContent side="left" className="w-[75%] sm:w-[50%] max-w-sm p-0 flex flex-col h-screen">
  <DashboardSidebar />
</SheetContent>

    </Sheet>
  );
};
