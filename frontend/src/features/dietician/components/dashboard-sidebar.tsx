"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoStatsChart, IoFastFood, IoCalendarClear } from "react-icons/io5"
import { FaUserFriends, FaSignOutAlt, FaCog } from "react-icons/fa"
import { MdMessage } from "react-icons/md"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState(0)
  const { toast } = useToast()
  const [userRole, setUserRole] = useState("dietitian") // Default role

  // In a real app, you would get the user role from your auth system
  useEffect(() => {
    // This is a placeholder for actual auth logic
    setUserRole("dietitian")
  }, [])

  const handleSignOut = () => {
    // This would be replaced with your actual logout logic
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    })
    // Redirect to login page or home page
  }

  const menuItems = [
    {
      name: "Dashboard",
      icon: <IoStatsChart className="h-5 w-5" />,
      link: "/dashboard/dietician",
      allowed: ["dietitian", "admin"],
    },
    {
      name: "Patients",
      icon: <FaUserFriends className="h-5 w-5" />,
      link: "/patients",
      allowed: ["dietitian", "admin"],
    },
    {
      name: "Diet Plans",
      icon: <IoFastFood className="h-5 w-5" />,
      link: "/diet-plans",
      allowed: ["dietitian", "admin"],
    },
    {
      name: "Appointments",
      icon: <IoCalendarClear className="h-5 w-5" />,
      link: "/appointments",
      allowed: ["dietitian", "admin"],
    },
    {
      name: "Messages",
      icon: <MdMessage className="h-5 w-5" />,
      link: "/chat",
      allowed: ["dietitian", "admin"],
    },
    {
      name: "Settings",
      icon: <FaCog className="h-5 w-5" />,
      link: "/settings",
      allowed: ["dietitian", "admin"],
    },
  ]

  return (
    <div className="flex h-screen flex-col bg-primary text-primary-foreground">
      <div className="flex justify-center p-6">
        <Link href="/">
          <div className="flex items-center gap-2">
          <Image src="/ArogayaCareLogo.svg" height={1000} width={1000} className="mb-12 h-10 w-fit" priority alt="logo" />
          </div>
        </Link>
      </div>

      <ul className="mb-4 flex flex-1 flex-col gap-2 overflow-auto px-4 pb-6">
        {menuItems.map(
          (item, index) =>
            item.allowed.includes(userRole) && (
              <li key={index}>
                <Link href={item.link}>
                  <button
                    className={`font-medium transition-all text-sm py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize ${
                      pathname === item.link ? "bg-white/30 text-white" : "text-white/80 hover:bg-white/10"
                    }`}
                    type="button"
                    onClick={() => setActiveItem(index)}
                  >
                    {item.icon}
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit">{item.name}</p>
                  </button>
                </Link>
              </li>
            ),
        )}
      </ul>

      {/* Sign Out Button */}
      <div className="mt-auto px-4 pb-6">
        <button
          className="font-medium transition-all text-sm py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white w-full flex items-center gap-4 px-4 capitalize"
          type="button"
          onClick={handleSignOut}
        >
          <FaSignOutAlt className="h-5 w-5" />
          <p className="block antialiased font-sans text-base leading-relaxed text-inherit">Sign Out</p>
        </button>
      </div>
    </div>
  )
}

