"use client";
import React from "react";
import { useUserStore } from "@/stores/store";
import { toast } from "@/components/ui/use-toast";
import apiClient from "@/api-client/apiClient";
import { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import Calender from "@/components/dashboard/Calendar";
import Notification from "@/components/dashboard/Notification";
import loader from "/public/loader.svg";

const page = () => {
  const { user } = useUserStore();
  const [earning, setEarning] = useState(0);
  const [consultations, setConsultations] = useState(0);
  const [appointments, setAppointments] = useState(0);
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStats = async () => {
    try {
      var url = "";
      if (user.role === "doctor") {
        url = "/doctors/earnings";
      } else if (user.role === "admin") {
        url = "/admin/earnings";
      }
      const response = await apiClient.get(url);
      if (response.status === 200) {
        setEarning(response.data.data.earnings);
        setConsultations(response.data.data.completed);
        setAppointments(response.data.data.total);
      } else {
        toast({
          type: "error",
          message: "Failed to get stats",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAppointment = async () => {
    try {
      var url = "";
      if (user.role === "doctor") {
        url = "/doctors/getAppointments";
      } else if (user.role === "admin") {
        url = "/admin/getAppointments";
      }
      const response = await apiClient.get(url);
      if (response.status === 200) {
        setAllAppointments(response.data.data.appointments);
      } else {
        toast({
          type: "error",
          message: "Failed to get appointments",
        });
      }
    } catch (error) {
      toast({
        type: "error",
        message: "Failed to get appointments",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      getStats();
      getAllAppointment();
      setLoading(false);
    }
  }, [user]);
  return (
    <div className="mt-10 px-12 mb-12">
      <Stats
        earning={earning}
        consultations={consultations}
        appointments={appointments}
      />
      {loading ? (
        <div className="flex items-center justify-center">
          <img src={loader.src} alt="loader" className="w-20 h-20" />
          <h2 className="text-2xl font-semibold text-gray-700">Wait while we load your appointments...</h2>
        </div>
      ): (
      <div className="grid grid-cols-1 xl:grid-cols-2 mt-3 gap-4">
        <div className="p-8 shadow-2xl rounded-xl">
          <Calender
            events={allAppointments.map((el) => {
              const date = new Date(el.date);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const formattedDate = `${year}-${month}-${day}`;
              return {
                title: `${
                  user.role === "doctor" ? patient.name : user.name
                }`,
                date: formattedDate,
              };
            })}
          />
        </div>
        <Notification appointment={allAppointments} />
      </div>
  )}
    </div>
  );
};

export default page;

const Stats = ({ earning, consultations, appointments }) => {
  const items = [
    {
      title: "Earning",
      description: "Total Earnings from Consultation",
      value: "$" + earning,
      icon: <MdAttachMoney className="mt-4 h-7 w-16" />,
    },
    {
      title: "Consultations",
      description: "Total Consultations Completed",
      value: consultations,
      icon: <FaUserDoctor className="mt-4 h-7 w-16" />,
    },
    {
      title: "Appointments",
      description: "Total Appointments Booked",
      value: appointments,
      icon: <CiCalendarDate className="mt-4 h-7 w-16" />,
    },
  ];
  return (
    <ul className="grid grid-cols-12 gap-x-2 gap-y-12 lg:gap-y-4">
      {items.map((item, index) => (
        <StatsCard key={index} {...item} />
      ))}
    </ul>
  );
};

const StatsCard = ({ title, description, value, icon }) => {
  return (
    <li className="col-span-12 flex w-full md:col-span-4 ">
      <div className="flex w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
        <div className="p-3">
          <div className="absolute -mt-10 h-16 w-16 rounded-xl bg-gradient-to-tr from-secondary to-secondary-foreground  text-center text-white shadow-lg">
            {icon}
          </div>
          <div className="pt-1 text-right">
            <p className="text-sm font-light capitalize">{title}</p>
            <h4 className="text-2xl font-semibold tracking-tighter xl:text-2xl">
              {value ? `${value}` : "0"}
            </h4>
          </div>
        </div>
        <hr className="opacity-50" />
        <div className="flex items-center justify-start px-4 py-2 xl:py-4">
          <p className="text-left text-lg">{description}</p>
        </div>
      </div>
    </li>
  );
};