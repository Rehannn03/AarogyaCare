"use client"
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
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Activity, Droplet } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    console.log("user dashboard", user)
    if (user) {
      setLoading(true);
      getStats();
      getAllAppointment();
      setLoading(false);
    }
  }, [user]);

  if (user === null || user.role === "patient") {
    return <PatientDashboard />;
  }

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
      ) : (
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
                    user?.role === "doctor" ? el.patient.name : el.doctorInfo.name
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

const healthMetrics = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Heart Rate",
    value: "80",
    unit: "BPM",
    bgColor: "bg-[#FFD700]/10",
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Blood Pressure",
    value: "120/80",
    unit: "mmHG",
    bgColor: "bg-[#40E0D0]/10",
  },
  {
    icon: <Droplet className="h-6 w-6" />,
    title: "Glucose Level",
    value: "60-80",
    unit: "mg/dl",
    bgColor: "bg-[#FF7F50]/10",
  },
]
 function PatientDashboard( ) {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="rounded-lg bg-white p-6 flex justify-between items-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Welcome !</h1>
          <p className="text-gray-600">Get Your Latest Update for the Last 7 days</p>
          <Button variant="outline">
            Connect to Doctor →
          </Button>
        </div>
        <img 
          src="" 
          alt="Medical professionals illustration"
          className="h-48 object-contain"
        />
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className={`p-6 ${metric.bgColor}`}>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white rounded-lg">
                {metric.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-600">{metric.title}</h3>
                <p className="text-2xl font-bold">
                  {metric.value} <span className="text-sm text-gray-600">{metric.unit}</span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Health Trends */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Health Weekly Trends</h2>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-primary mr-2" />
                <span className="text-sm">This Week</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-200 mr-2" />
                <span className="text-sm">Last Week</span>
              </div>
            </div>
            <Select defaultValue="weekly">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="h-[300px] w-full bg-gray-50 rounded-lg" />
      </Card>

      {/* Appointments */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Scheduled Appointments</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-600">Routine Checkup</div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <h3 className="font-medium">Dr. Damian Lewis - Standard Consult</h3>
                <p className="text-sm text-gray-600">10:30am - 11:00am</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-emerald-500">Starts in 35 m</div>
                <Button variant="outline" size="sm" className="mt-2">
                  Edit Consult →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}