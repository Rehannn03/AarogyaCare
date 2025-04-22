"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import apiClient from "@/api-client/apiClient";
import ConsultationModal from "@/components/my-appointment/ConsultationModal";
import React from 'react';
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { BiTime, BiCalendar, BiPhone, BiVideo } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const NextAppointment = ({ nextUpcomingAppointment, getAllAppointment }) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!nextUpcomingAppointment) {
    return null;
  }

  // Format the date
  const appointmentDate = new Date(nextUpcomingAppointment.date);
  const formattedDate = format(appointmentDate, "MMMM d, yyyy");

  // Get time remaining until appointment
  const getTimeUntil = () => {
    const now = new Date();
    const timeUntil = appointmentDate.getTime() - now.getTime();
    
    // If appointment is today, show hours/minutes
    if (appointmentDate.toDateString() === now.toDateString()) {
      const hours = Math.floor(timeUntil / (1000 * 60 * 60));
      const minutes = Math.floor((timeUntil % (1000 * 60 * 60)) / (1000 * 60));
      if (hours > 0) {
        return `In ${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
      } else {
        return `In ${minutes} minute${minutes !== 1 ? 's' : ''}`;
      }
    }
    
    // Otherwise show days
    const days = Math.ceil(timeUntil / (1000 * 60 * 60 * 24));
    return `In ${days} day${days !== 1 ? 's' : ''}`;
  };

  // Get status style
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500 text-white";
      case "active":
        return "bg-purple-500 text-white";
      default:
        return "bg-yellow-500 text-white";
    }
  };

  // Cancel appointment
  const cancelAppointment = async () => {
    try {
      const response = await apiClient.patch(`/patients/cancelAppointment/${nextUpcomingAppointment._id}`);
      
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Appointment cancelled successfully",
          variant: "success",
        });
        getAllAppointment();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast({
        title: "Error",
        description: "Failed to cancel appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Join video call
  const joinVideoCall = () => {
    if (nextUpcomingAppointment.link) {
      // Redirect to the video call page
      window.location.href = nextUpcomingAppointment.link;
    } else {
      toast({
        title: "Video call not available",
        description: "Your doctor hasn't started the video call yet.",
        variant: "destructive",
      });
    }
  };

  // Safely access doctor properties
  const doctorName = nextUpcomingAppointment.doctor?.user?.name || "Doctor";
  const doctorSpecialization = nextUpcomingAppointment.doctor?.specialization || "Specialist";
  const doctorQualification = nextUpcomingAppointment.doctor?.qualification || "";
  const doctorAvatar = nextUpcomingAppointment.doctor?.user?.avatar || "/default-avatar.png";
  
  // Safely access symptoms
  const symptoms = nextUpcomingAppointment.symptoms || [];
  
  return (
    <div className="mb-6 p-6 bg-primary border border-black rounded-lg shadow-lg flex flex-col md:flex-row gap-6 text-white">
      <div className="md:w-2/3 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Upcoming Appointment</h3>
          <Badge className={`${getStatusStyle(nextUpcomingAppointment.status)} px-3 py-1`}>
            {nextUpcomingAppointment.status === "active" ? "Active Now" : getTimeUntil()}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white">
            <Image 
              src={doctorAvatar} 
              alt={doctorName} 
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-lg">Dr. {doctorName}</p>
            <p className="text-primary-foreground/80">{doctorSpecialization} • {doctorQualification}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock />
            <span>{nextUpcomingAppointment.time}</span>
          </div>
          
          {symptoms && symptoms.length > 0 && (
            <div className="sm:col-span-2">
              <p className="font-medium mb-1">Symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(symptoms) ? (
                  symptoms.map((symptom, index) => (
                    <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                      {symptom}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {symptoms}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="md:w-1/3 flex flex-col justify-center items-center space-y-4">
        {nextUpcomingAppointment.status === "active" ? (
          <Button 
            onClick={joinVideoCall}
            className="w-full bg-white text-primary hover:bg-white/90 transition shadow-md"
          >
            <BiVideo className="mr-2 h-5 w-5" />
            Join Video Call
          </Button>
        ) : (
          <>
            <p className="font-medium text-center text-white/90">
              Your appointment is confirmed
            </p>
            {nextUpcomingAppointment.day && (
              <p className="text-white/80 text-center">
                {nextUpcomingAppointment.day}
              </p>
            )}
          </>
        )}
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full bg-transparent border-white text-white hover:bg-white/10"
            >
              <MdCancel className="mr-2 h-5 w-5" />
              Cancel Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Appointment</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your appointment with Dr. {doctorName} on {formattedDate}?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Keep Appointment
              </Button>
              <Button variant="destructive" onClick={cancelAppointment}>
                Yes, Cancel Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NextAppointment;
