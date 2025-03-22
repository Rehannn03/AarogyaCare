import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { DashboardSidebar } from "@/features/dietician/components/dashboard-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NutriTrack - Dietitian Dashboard",
  description: "A modern dashboard for dietitians to manage patient diets and health records",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="flex min-h-screen">
            <DashboardSidebar />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
      </body>
    </html>
  )
}

