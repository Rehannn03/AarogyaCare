import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { FaCalendarAlt, FaClock, FaNotesMedical, FaFileMedical } from "react-icons/fa";
import { MdCancel, MdOutlineRateReview } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/api-client/apiClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

const AppointmentCard = ({ appointment, getAllAppointment }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Format appointment date
  const appointmentDate = new Date(appointment.date);
  const formattedDate = format(appointmentDate, "MMMM d, yyyy");
  const isUpcoming = new Date(appointmentDate) > new Date();
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      case "active":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  // Cancel appointment function
  const cancelAppointment = async () => {
    try {
      const response = await apiClient.patch(`/patients/cancelAppointment/${appointment._id}`);
      
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

  // Join video call function
  const joinVideoCall = () => {
    if (appointment.link) {
      window.open(appointment.link, "_blank");
    } else {
      toast({
        title: "Error",
        description: "Video link is not available yet",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full mb-4 overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-2">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary">
              <Image 
                src={appointment.doctor.user.avatar || "/default-avatar.png"} 
                alt={appointment.doctor.user.name} 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-lg md:text-xl font-semibold">
                Dr. {appointment.doctor.user.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {appointment.doctor.specialization} • {appointment.doctor.qualification}
              </CardDescription>
            </div>
          </div>
          
          <Badge className={`${getStatusColor(appointment.status)} text-white px-3 py-1`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-blue-500" />
            <p className="text-gray-700">{formattedDate}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="text-blue-500" />
            <p className="text-gray-700">{appointment.time}</p>
          </div>
        </div>
        
        {appointment.symptoms && appointment.symptoms.length > 0 && (
          <div className="mt-3">
            <div className="flex items-center space-x-2 mb-1">
              <FaNotesMedical className="text-blue-500" />
              <span className="text-gray-700 font-medium">Symptoms:</span>
            </div>
            <div className="pl-6">
              {Array.isArray(appointment.symptoms) ? (
                <ul className="list-disc ml-4">
                  {appointment.symptoms.map((symptom, index) => (
                    <li key={index} className="text-gray-600">{symptom}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">{appointment.symptoms}</p>
              )}
            </div>
          </div>
        )}
        
        {appointment.note && (
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <FaFileMedical className="text-blue-500" />
              <span className="text-gray-700 font-medium">Note:</span>
            </div>
            <p className="text-gray-600 pl-6">{appointment.note}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 justify-end border-t border-gray-100 pt-3">
        {/* Show Cancel button only for upcoming appointments that are not cancelled */}
        {isUpcoming && appointment.status !== "cancelled" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                <MdCancel className="mr-1" />
                Cancel
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Appointment</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel your appointment with Dr. {appointment.doctor.user.name} on {formattedDate}?
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
        )}
        
        {/* Active appointments can join video call */}
        {appointment.status === "active" && (
          <Button onClick={joinVideoCall} className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700">
            <BiVideo className="mr-1" />
            Join Call
          </Button>
        )}
        
        {/* Completed appointments can view consultation */}
        {appointment.status === "completed" && (
          <Button 
            onClick={() => router.push(`/dashboard/consultation/${appointment._id}`)}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
          >
            <MdOutlineRateReview className="mr-1" />
            View Consultation
          </Button>
        )}
        
        {/* If approved, show appointment details button */}
        {(appointment.status === "approved" || appointment.status === "pending") && (
          <Button
            variant="default"
            onClick={() => router.push(`/dashboard/appointment/${appointment._id}`)}
            className="flex items-center gap-1"
          >
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AppointmentCard;