
import { Inter } from "next/font/google"
import { DashboardSidebar } from "@/features/dietician/components/dashboard-sidebar"
import { MobileSidebar } from "@/components/dashboard/MobileSidebar"

const inter = Inter({ subsets: ["latin"] })



export default function Layout({ children }) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col">
            {/* Desktop Sidebar (Hidden on mobile) */}
            <div className="hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[264px] bg-primary text-white">
              <DashboardSidebar />
            </div>
  
            {/* Mobile Header - Only visible on mobile */}
            <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 lg:hidden">
              <MobileSidebar />
              <h1 className="font-semibold">NutriTrack</h1>
            </div>
  
            {/* Main Content Area with Correct Padding */}
            
            <main className="flex-1 lg:pl-[264px]">{children}</main>
          </div>
        </body>
      </html>
  )
}

