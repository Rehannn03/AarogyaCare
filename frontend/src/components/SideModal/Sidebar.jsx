import React from "react";
import Link from "next/link";
import { IoStatsChart } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { FaBarsProgress, FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useUserStore } from "@/stores/store";
import Image from "next/image";

function Sidebar() {
  const [stateContext, setStateContext] = React.useState(0);
  const { user } = useUserStore();
  const [isAdmin, setisAdmin] = React.useState(false);
    
  React.useEffect(() => {
    if (!user) return;
    if (user.role === "admin") {
      setisAdmin(true);
    } 
    }, [user]);
  const active = "bg-white/30";
  const menuItems = [
    {
      name: "Dashboard",
      icon: <IoStatsChart className="w-5 h-5" />,
      link: "/dashboard",
      allowed: ["admin", "doctor", "patient"],
    },
    // Doctor & Admin Items
    {
      name: "My Appointments",
      icon: <CiCalendarDate className="w-5 h-5" />,
      link: "/dashboard/my-appointments",
      allowed: ["doctor", "patient"],
    },
    {
      name: "Profile",
      icon: <FaUser className="w-5 h-5" />,
      link: "/dashboard/profile",
      allowed: ["doctor", "patient"],
    },
    // Patient-specific Items
    {
      name: "Book Appointment",
      icon: <CiCalendarDate className="w-5 h-5" />,
      link: "/dashboard/book-appointment",
      allowed: ["patient"],
    },
    {
      name: "Medical History",
      icon: <FaBarsProgress className="w-5 h-5" />,
      link: "/dashboard/medical-history",
      allowed: ["patient"],
    },
    {
      name: "Prescriptions",
      icon: <FaUserDoctor className="w-5 h-5" />,
      link: "/dashboard/prescriptions",
      allowed: ["patient"],
    },
    // Admin-specific Items
    {
      name: "Analytics",
      icon: <FaBarsProgress className="w-5 h-5" />,
      link: "/dashboard/analytics",
      allowed: ["admin"],
    },
    {
      name: "All Doctors",
      icon: <FaUserDoctor className="w-5 h-5" />,
      link: "/dashboard/all-doctors",
      allowed: ["admin"],
    },
    {
      name: "All Patients",
      icon: <FaUser className="w-5 h-5" />,
      link: "/dashboard/all-patients",
      allowed: ["admin"],
    },
    {
      name: "All Appointments",
      icon: <CiCalendarDate className="w-5 h-5" />,
      link: "/dashboard/all-appointments",
      allowed: ["admin"],
    },
  ];
  return (
    <ul className="mb-4 flex flex-col gap-2 overflow-auto pb-6">
      <div className="flex justify-center">
        <Link href="/">
                    <Image
                      src="/ArogayaCareLogo.svg"
                      height={1000}
                      width={1000}
                      className="mb-12 h-10 w-fit"
                      priority
                    />
        </Link>
         </div>
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={item.allowed.includes(user?.role) ? "block" : "hidden"} 
        >
          <Link href={item.link}>
            <button
              className={`font-bold transition-all text-xs py-3 rounded-lg text-base-100 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize ${
                stateContext === index ? active : "hover:bg-white/10"
              }`}
              type="button"
              onClick={() => setStateContext(index)}
            >
              {item.icon}
              <p className="block antialiased font-sans text-lg leading-relaxed text-inherit font-medium capitalize">
                {item.name}
              </p>
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Sidebar;
