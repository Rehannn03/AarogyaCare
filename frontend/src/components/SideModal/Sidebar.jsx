import React from "react";
import Link from "next/link";
import { IoStatsChart } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { FaBarsProgress, FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useUserStore } from "@/stores/store";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import apiClient from '@/api-client/apiClient';
import { redirect, useRouter } from "next/navigation";
import { useLogout } from "@/features/use-logout";


function Sidebar() {
  const [stateContext, setStateContext] = React.useState(0);
  const { user ,update} = useUserStore();
  const [isAdmin, setisAdmin] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [isLogOut,setIsLogOut]=React.useState(false)
  const {mutate:logout}= useLogout();
  React.useEffect(() => {
    if (!user) return;
    if (user.role === "admin") {
      setisAdmin(true);
    }
  }, [user]);

  // const logOut = async () => {
  //   try {
  //     console.log("Logging out");

  //     const response = await apiClient.post("/users/logout");
  //     console.log("Logout Response:", response);
      
  //     toast({
  //       title: "Logged Out",
  //       description: response.data.message,
  //     });
      
  //     update({ user: null });
  //     console.log("Logged out");
      
  //     setIsLogOut(true);
  //     window.location.href = "/sign-in";
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //     let errorMessage =
  //       error.response?.data?.message || "Something went wrong!";
  //     toast({
  //       title: "Sign Out Failed",
  //       description: errorMessage,
  //       variant: "destructive",
  //     });
  //   }
  // };

  const active = "bg-white/30";
  const menuItems = [
    {
      name: "Dashboard",
      icon: <IoStatsChart className="w-5 h-5" />,
      link: "/dashboard",
      allowed: ["admin"],
    },
    {
      name:"Patient Dashboard",
      icon:<IoStatsChart className="w-5 h-5" />,
      link:"/dashboard",
      allowed:["patient"],
    },
    {
      name:"Doctor Dashboard",
      icon:<IoStatsChart className="w-5 h-5" />,
      link:"/dashboard/doctor",
      allowed:["doctor"],
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
        <Image src="/ArogayaCareLogo.svg" height={1000} width={1000} className="mb-12 h-10 w-fit" priority />
      </Link>
    </div>
    {menuItems.map((item, index) => (
      <li key={index} className={item.allowed.includes(user?.role) ? "block" : "hidden"}>
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
    
    {/* Sign Out Button */}
    <li className="block">
      <button
        className="font-bold transition-all text-xs py-3 rounded-lg text-base-100 bg-red-500 hover:bg-red-600 w-full flex items-center gap-4 px-4 capitalize"
        type="button"
        onClick={()=>logout()}
      >
        <FaUser className="w-5 h-5" />
        <p className="block antialiased font-sans text-lg leading-relaxed text-inherit font-medium capitalize">
          Sign Out
        </p>
      </button>
    </li>
  </ul>
  );
}

export default Sidebar;
