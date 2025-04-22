"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/api-client/apiClient";
import loader from "/public/loader.svg";
import Image from "next/image";
import AppointmentCard from "@/components/my-appointment/AppointmentCard";
import { useRouter } from "next/navigation";
import NextAppointment from "@/components/my-appointment/NextAppointment";
import Tabs from "@/components/my-appointment/Tabs";
import { CiCalendarDate } from "react-icons/ci";

function MyAppointments() {
  const { user, update } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [nextUpcomingAppointment, setNextUpcomingAppointment] = useState(null);

  useEffect(() => {
    if (!user) fetchAndSetUserStore(update);
  }, []);

  const getAllAppointment = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await apiClient.get("/patients/viewAppointments");
      if (response.status === 200) {
        const appointments = response.data.data.appointments;
        if (Array.isArray(appointments)) {
          // Sort appointments by date (newest first)
          const sortedAppointments = [...appointments].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          // Find the next upcoming approved appointment
          let foundAcceptedAppt = null;
          for (const appt of sortedAppointments) {
            if (
              new Date(appt.date) > new Date() && 
              (appt.status === "approved" || appt.status === "active")
            ) {
              foundAcceptedAppt = appt;
              break;
            }
          }

          if (foundAcceptedAppt) {
            setNextUpcomingAppointment(foundAcceptedAppt);
            // Remove the upcoming appointment from the list to avoid duplication
            const remainingAppointments = sortedAppointments.filter(
              (appt) => appt._id !== foundAcceptedAppt._id
            );
            setAllAppointments(remainingAppointments);
            setFilteredAppointments(remainingAppointments);
          } else {
            setAllAppointments(sortedAppointments);
            setFilteredAppointments(sortedAppointments);
          }
        } else {
          console.error("Appointments key is not an array or missing");
        }
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter appointments based on the active tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredAppointments(allAppointments);
    } else {
      const filtered = allAppointments.filter(app => {
        if (activeTab === "upcoming") {
          return new Date(app.date) > new Date() && app.status !== "cancelled";
        } else if (activeTab === "completed") {
          return app.status === "completed";
        } else if (activeTab === "cancelled") {
          return app.status === "cancelled";
        } else if (activeTab === "pending") {
          return app.status === "pending";
        }
        return true;
      });
      setFilteredAppointments(filtered);
    }
  }, [activeTab, allAppointments]);

  useEffect(() => {
    if (user) {
      getAllAppointment();
    }
  }, [user]);

  return (
    <div className="flex flex-col col-span-3 items-center justify-center mt-8 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">My Appointments</h1>
      
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Image src={loader} alt="Loading" width={50} height={50} />
        </div>
      ) : !nextUpcomingAppointment && allAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 space-y-8">
          <div className="rounded-full bg-blue-100 p-10">
            <CiCalendarDate className="w-24 h-24 text-blue-500" />
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-semibold text-gray-700">No Appointments Yet</h2>
            <p className="text-gray-500 max-w-md">
              You haven't scheduled any appointments yet. Book an appointment with one of our specialists to get started.
            </p>
          </div>
          <button 
            onClick={() => router.push('/dashboard/book-appointment')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
            transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Book Your First Appointment
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl">
          {/* Next upcoming appointment */}
          {nextUpcomingAppointment && (
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-700 mb-4">Your Next Appointment</h2>
              <NextAppointment
                nextUpcomingAppointment={nextUpcomingAppointment}
                getAllAppointment={getAllAppointment}
              />
            </div>
          )}

          {/* Filter tabs */}
          {allAppointments.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-700 mb-4">All Appointments</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "all"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "upcoming"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "completed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab("cancelled")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancelled
                </button>
              </div>
              
              {/* Appointment list */}
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No {activeTab !== "all" ? activeTab : ""} appointments found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment._id}
                      appointment={appointment}
                      getAllAppointment={getAllAppointment}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Book new appointment button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => router.push('/dashboard/book-appointment')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 
              transition-colors duration-200 shadow-md hover:shadow-lg flex items-center"
            >
              <CiCalendarDate className="mr-2 h-5 w-5" />
              Book New Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
