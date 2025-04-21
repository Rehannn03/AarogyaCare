"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/api-client/apiClient";
import Image from "next/image";
import loader from "/public/loader.svg";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaNotesMedical,
  FaFileMedical,
  FaVideo,
  FaCheck,
  FaBan,
  FaRegHospital,
} from "react-icons/fa";
import { MdOutlineUpcoming, MdVideoCall } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function DoctorAppointments() {
  const { user, update } = useUserStore();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Dialog state
  const [rejectDialog, setRejectDialog] = useState(false);
  const [videoLinkDialog, setVideoLinkDialog] = useState(false);
  const [consultationDialog, setConsultationDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Form state
  const [rejectionNote, setRejectionNote] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [consultationData, setConsultationData] = useState({
    diagnosis: "",
    prescription: [],
    followUp: "",
    symptoms: []
  });
  const [newPrescription, setNewPrescription] = useState("");

  useEffect(() => {
    if (!user) fetchAndSetUserStore(update);
  }, []);

  const getAppointments = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Try without the /api prefix since your router.js likely doesn't have it
      const response = await apiClient.get("/doctors/getAppointments");
      
      if (response.status === 200) {
        const appointmentsData = response.data.data.appointments;
        if (Array.isArray(appointmentsData)) {
          // Sort appointments by date (newest first)
          const sortedAppointments = [...appointmentsData].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          setAppointments(sortedAppointments);
          filterAppointments(sortedAppointments, activeTab);
        } else {
          console.error("Appointments data is not an array or missing");
        }
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to fetch appointments",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      if (error.response?.status === 403) {
        toast({
          title: "Not Verified",
          description: "Your account is not verified. Please contact admin.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch appointments. " + (error.response?.data?.message || error.message),
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = (appointments, tabName) => {
    let filtered = [];
    const today = new Date();
    
    switch (tabName) {
      case "today":
        filtered = appointments.filter(
          (app) => isToday(new Date(app.date)) && app.status !== "cancelled" && app.status !== "rejected"
        );
        break;
      case "tomorrow":
        filtered = appointments.filter(
          (app) => isTomorrow(new Date(app.date)) && app.status !== "cancelled" && app.status !== "rejected"
        );
        break;
      case "upcoming":
        filtered = appointments.filter(
          (app) => 
            new Date(app.date) >= today && 
            app.status !== "cancelled" && 
            app.status !== "rejected" &&
            app.status !== "completed"
        );
        break;
      case "pending":
        filtered = appointments.filter((app) => app.status === "pending");
        break;
      case "approved":
        filtered = appointments.filter((app) => app.status === "approved");
        break;
      case "completed":
        filtered = appointments.filter((app) => app.status === "completed");
        break;
      case "cancelled":
        filtered = appointments.filter(
          (app) => app.status === "cancelled" || app.status === "rejected"
        );
        break;
      default:
        filtered = appointments;
    }
    setFilteredAppointments(filtered);
  };

  // Handle tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    filterAppointments(appointments, tabName);
  };

  // Approve appointment
  const approveAppointment = async (appointmentId) => {
    try {
      const response = await apiClient.patch("/doctors/updateAppointment", {
        appointmentId,
        status: "approved",
      });
      
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Appointment approved successfully",
          variant: "success",
        });
        getAppointments();
      }
    } catch (error) {
      console.error("Error approving appointment:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to approve appointment",
        variant: "destructive",
      });
    }
  };

  // Reject appointment
  const rejectAppointment = async () => {
    if (!rejectionNote) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await apiClient.patch("/doctors/updateAppointment", {
        appointmentId: selectedAppointment._id,
        status: "rejected",
        note: rejectionNote
      });
      
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Appointment rejected successfully",
          variant: "success",
        });
        setRejectionNote("");
        setRejectDialog(false);
        getAppointments();
      }
    } catch (error) {
      console.error("Error rejecting appointment:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to reject appointment",
        variant: "destructive",
      });
    }
  };

  // Activate appointment with video link
  const activateAppointment = async () => {
    if (!videoLink) {
      toast({
        title: "Error",
        description: "Please provide a video link",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await apiClient.patch("/doctors/activateAppointment", {
        appointmentId: selectedAppointment._id,
        link: videoLink
      });
      
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Appointment activated with video link",
          variant: "success",
        });
        setVideoLink("");
        setVideoLinkDialog(false);
        getAppointments();
      }
    } catch (error) {
      console.error("Error activating appointment:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to activate appointment",
        variant: "destructive",
      });
    }
  };

  // Add prescription item
  const addPrescriptionItem = () => {
    if (newPrescription.trim()) {
      setConsultationData({
        ...consultationData,
        prescription: [...consultationData.prescription, newPrescription]
      });
      setNewPrescription("");
    }
  };

  // Remove prescription item
  const removePrescriptionItem = (index) => {
    const updatedPrescription = [...consultationData.prescription];
    updatedPrescription.splice(index, 1);
    setConsultationData({
      ...consultationData,
      prescription: updatedPrescription
    });
  };

  // Fill consultation data
  const fillConsultation = async () => {
    const { diagnosis, prescription, followUp } = consultationData;
    
    if (!diagnosis || !prescription.length || !followUp) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Set symptoms from the appointment
      const symptoms = selectedAppointment.symptoms || [];
      
      const response = await apiClient.post("/doctors/fillConsultation", {
        appointmentId: selectedAppointment._id,
        diagnosis,
        prescription,
        followUp,
        symptoms
      });
      
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Consultation created successfully",
          variant: "success",
        });
        setConsultationData({
          diagnosis: "",
          prescription: [],
          followUp: "",
          symptoms: []
        });
        setConsultationDialog(false);
        getAppointments();
      }
    } catch (error) {
      console.error("Error creating consultation:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create consultation",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      getAppointments();
    }
  }, [user]);

  useEffect(() => {
    if (selectedAppointment && selectedAppointment.symptoms) {
      setConsultationData({
        ...consultationData,
        symptoms: Array.isArray(selectedAppointment.symptoms) ? selectedAppointment.symptoms : [selectedAppointment.symptoms]
      });
    }
  }, [selectedAppointment]);

  // Format date for display
  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = format(date, "MMMM d, yyyy");
    
    if (isToday(date)) {
      return `Today (${formattedDate})`;
    } else if (isTomorrow(date)) {
      return `Tomorrow (${formattedDate})`;
    }
    return formattedDate;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
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

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your patient appointments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Badge variant="outline" className="text-sm font-semibold px-3 py-1 mr-2">
            Total: {appointments.length}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 text-sm font-semibold px-3 py-1">
            Upcoming: {appointments.filter(a => new Date(a.date) >= new Date() && a.status !== "cancelled" && a.status !== "rejected").length}
          </Badge>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Image src={loader} alt="Loading" width={50} height={50} />
        </div>
      ) : (
        <>
          <Tabs defaultValue="upcoming" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-7 gap-2">
              <TabsTrigger value="upcoming" className="text-sm">
                <MdOutlineUpcoming className="mr-1" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="today" className="text-sm">
                Today
              </TabsTrigger>
              <TabsTrigger value="tomorrow" className="text-sm">
                Tomorrow
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-sm">
                Pending
              </TabsTrigger>
              <TabsTrigger value="approved" className="text-sm">
                Approved
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-sm">
                Completed
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="text-sm">
                Cancelled
              </TabsTrigger>
            </TabsList>

            {/* Tab content - will use the same grid for all tabs */}
            {filteredAppointments.length === 0 ? (
              <div className="text-center p-12 bg-gray-50 rounded-lg border border-gray-100">
                <FaRegHospital className="mx-auto text-gray-400 h-12 w-12 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">No appointments found</h3>
                <p className="text-gray-500">
                  There are no {activeTab} appointments to display.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment._id}
                    appointment={appointment}
                    formatDate={formatAppointmentDate}
                    getStatusColor={getStatusColor}
                    onApprove={() => approveAppointment(appointment._id)}
                    onReject={() => {
                      setSelectedAppointment(appointment);
                      setRejectDialog(true);
                    }}
                    onActivate={() => {
                      setSelectedAppointment(appointment);
                      setVideoLinkDialog(true);
                    }}
                    onConsultation={() => {
                      setSelectedAppointment(appointment);
                      setConsultationDialog(true);
                    }}
                  />
                ))}
              </div>
            )}
          </Tabs>
        </>
      )}

      {/* Rejection Dialog */}
      <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Appointment</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this appointment.
              This message will be visible to the patient.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rejectionNote">Rejection Reason <span className="text-red-500">*</span></Label>
            <Textarea
              id="rejectionNote"
              placeholder="The requested time slot is not available..."
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={rejectAppointment}>
              Reject Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Link Dialog */}
      <Dialog open={videoLinkDialog} onOpenChange={setVideoLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate Video Appointment</DialogTitle>
            <DialogDescription>
              Create a video call room for this appointment that the patient can join.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {/* Generate a new Room ID */}
            <div className="mb-4">
              <Button 
                onClick={() => setVideoLink(`${window.location.origin}/room/${Math.random().toString(36).substring(2, 12)}`)}
                className="w-full"
                variant="outline"
              >
                <FaVideo className="mr-2" /> Generate New Room
              </Button>
            </div>

            <Label htmlFor="videoLink">Video Call Link <span className="text-red-500">*</span></Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="videoLink"
                placeholder="Room link will appear here..."
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                className="flex-1"
              />
              {videoLink && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigator.clipboard.writeText(videoLink);
                    toast({
                      description: "Link copied to clipboard",
                    });
                  }}
                  size="icon"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25" />
                  </svg>
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This link will be sent to the patient. When activated, they can join the video call.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVideoLinkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={activateAppointment} disabled={!videoLink}>
              Activate Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Consultation Dialog */}
      <Dialog open={consultationDialog} onOpenChange={setConsultationDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Fill Consultation Details</DialogTitle>
            <DialogDescription>
              Complete the consultation form to finish this appointment.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div>
              <Label htmlFor="diagnosis">Diagnosis <span className="text-red-500">*</span></Label>
              <Textarea
                id="diagnosis"
                placeholder="Patient diagnosis..."
                value={consultationData.diagnosis}
                onChange={(e) => setConsultationData({
                  ...consultationData,
                  diagnosis: e.target.value
                })}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Prescription <span className="text-red-500">*</span></Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add medicine with dosage..."
                  value={newPrescription}
                  onChange={(e) => setNewPrescription(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={addPrescriptionItem} variant="secondary">
                  Add
                </Button>
              </div>

              <div className="mt-3 space-y-2">
                {consultationData.prescription.map((item, index) => (
                  <div key={index} className="flex justify-between bg-gray-50 p-2 rounded">
                    <span>{item}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePrescriptionItem(index)}
                      className="text-red-500 hover:text-red-700 h-auto py-0 px-2"
                    >
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="followUp">Follow-up <span className="text-red-500">*</span></Label>
              <Input
                id="followUp"
                placeholder="e.g., After 1 week"
                value={consultationData.followUp}
                onChange={(e) => setConsultationData({
                  ...consultationData,
                  followUp: e.target.value
                })}
                className="mt-2"
              />
            </div>

            {selectedAppointment && selectedAppointment.symptoms && (
              <div>
                <Label>Reported Symptoms</Label>
                <div className="mt-2 bg-gray-50 p-3 rounded">
                  {Array.isArray(selectedAppointment.symptoms) ? 
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedAppointment.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                    :
                    <p>{selectedAppointment.symptoms}</p>
                  }
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConsultationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={fillConsultation}>
              Complete Consultation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// AppointmentCard Component
const AppointmentCard = ({
  appointment,
  formatDate,
  getStatusColor,
  onApprove,
  onReject,
  onActivate,
  onConsultation
}) => {
  const appointmentDate = new Date(appointment.date);
  const isPastAppointment = isPast(appointmentDate) && !isToday(appointmentDate);
  const isCompleted = appointment.status === "completed";
  const isApproved = appointment.status === "approved";
  const isPending = appointment.status === "pending";
  const isActive = appointment.status === "active";
  const isCancelled = appointment.status === "cancelled" || appointment.status === "rejected";

  return (
    <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary">
              <Image
                src={appointment.patient.avatar || "/default-avatar.png"}
                alt={appointment.patient.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">
                {appointment.patient.name}
              </CardTitle>
              <CardDescription className="text-xs text-gray-600">
                {appointment.patient.email}
              </CardDescription>
            </div>
          </div>
          <Badge className={`${getStatusColor(appointment.status)} text-white px-2 py-1 text-xs`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3 pb-1 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-blue-500" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="text-blue-500" />
            <span>{appointment.time}</span>
          </div>
        </div>
        
        {appointment.symptoms && appointment.symptoms.length > 0 && (
          <div>
            <div className="flex items-center space-x-1 mt-1 text-sm text-gray-700">
              <FaStethoscope className="text-blue-500" />
              <span className="font-medium">Symptoms:</span>
            </div>
            {Array.isArray(appointment.symptoms) ? (
              <div className="ml-6 mt-1">
                <ul className="list-disc pl-4 text-sm text-gray-600">
                  {appointment.symptoms.slice(0, 3).map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                  {appointment.symptoms.length > 3 && (
                    <li className="text-gray-500">+{appointment.symptoms.length - 3} more</li>
                  )}
                </ul>
              </div>
            ) : (
              <p className="ml-6 text-sm text-gray-600">{appointment.symptoms}</p>
            )}
          </div>
        )}
        
        {appointment.note && (
          <div>
            <div className="flex items-center space-x-1 text-sm text-gray-700">
              <FaNotesMedical className="text-blue-500" />
              <span className="font-medium">Note:</span>
            </div>
            <p className="ml-6 text-sm text-gray-600 line-clamp-2">{appointment.note}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 justify-end border-t pt-3 pb-2">
        {/* Pending appointment actions */}
        {isPending && !isPastAppointment && (
          <>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onReject}
              className="text-xs h-8"
            >
              <FaBan className="mr-1" /> Reject
            </Button>
            <Button 
              variant="default"
              size="sm" 
              onClick={onApprove}
              className="text-xs h-8"
            >
              <FaCheck className="mr-1" /> Approve
            </Button>
          </>
        )}
        
        {/* Approved appointment actions */}
        {isApproved && !isPastAppointment && (
          <Button 
            variant="default" 
            size="sm"
            onClick={onActivate}
            className="text-xs h-8 bg-purple-600 hover:bg-purple-700"
          >
            <FaVideo className="mr-1" /> Start Video Call
          </Button>
        )}
        
        {/* Active appointment actions */}
        {isActive && (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                if (appointment.link) {
                  // Open in the same tab for a better experience
                  window.location.href = appointment.link;
                } else {
                  toast({
                    title: "Error",
                    description: "Video call link not found",
                    variant: "destructive",
                  });
                }
              }}
              className="text-xs h-8"
            >
              <MdVideoCall className="mr-1" /> Join Call
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={onConsultation}
              className="text-xs h-8 bg-green-600 hover:bg-green-700"
            >
              <FaFileMedical className="mr-1" /> Complete
            </Button>
          </>
        )}
        
        {/* Completed appointment - view only */}
        {isCompleted && (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Consultation Completed
          </Badge>
        )}
        
        {/* Cancelled appointment - view only */}
        {isCancelled && (
          <Badge className="bg-red-100 text-red-800">
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        )}
        
        {/* Past pending appointment */}
        {isPending && isPastAppointment && (
          <Badge className="bg-amber-100 text-amber-800">
            Missed Appointment
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default DoctorAppointments;