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
import { FaFilePrescription, FaFileMedical, FaCalendarCheck, FaChevronRight } from "react-icons/fa";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs as TabsUI, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function MyAppointments() {
  const { user, update } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [nextUpcomingAppointment, setNextUpcomingAppointment] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [loadingConsultations, setLoadingConsultations] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

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

  // Fetch past consultations
  const getPastConsultations = async () => {
    if (!user) return;
    setLoadingConsultations(true);
    try {
      const response = await apiClient.get("/patients/viewConsultations");
      if (response.status === 200) {
        const consultationData = response.data.data.consultation;
        if (Array.isArray(consultationData)) {
          // Sort consultations by date (newest first)
          const sortedConsultations = [...consultationData].sort(
            (a, b) => new Date(b.consultation.createdAt) - new Date(a.consultation.createdAt)
          );
          setConsultations(sortedConsultations);
        } else {
          console.error("Consultations data is not an array or is missing");
        }
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching consultations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch past consultations",
        variant: "destructive",
      });
    } finally {
      setLoadingConsultations(false);
    }
  };

  // View consultation details
  const viewConsultationDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setIsConsultationModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      getAllAppointment();
      getPastConsultations();
    }
  }, [user]);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      return dateString || "No date";
    }
  };

  return (
    <div className="flex flex-col col-span-3 items-center justify-center mt-8 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8">My Appointments</h1>
      
      {loading && loadingConsultations ? (
        <div className="flex items-center justify-center h-96">
          <Image src={loader} alt="Loading" width={50} height={50} />
        </div>
      ) : !nextUpcomingAppointment && allAppointments.length === 0 && consultations.length === 0 ? (
        // No appointments or consultations view remains the same
        <div className="flex flex-col items-center justify-center h-96 space-y-8">
          {/* Existing empty state */}
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
          {/* Next upcoming appointment - Existing code */}
          {nextUpcomingAppointment && (
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-700 mb-4">Your Next Appointment</h2>
              <NextAppointment
                nextUpcomingAppointment={nextUpcomingAppointment}
                getAllAppointment={getAllAppointment}
              />
            </div>
          )}

          {/* Appointments Section */}
          {allAppointments.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-700 mb-4">All Appointments</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {/* Existing tab buttons */}
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
                {/* Other tab buttons... */}
              </div>
              
              {/* Appointment list - existing code */}
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

          {/* Past Consultations Section - NEW */}
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Past Consultations</h2>
            
            {loadingConsultations ? (
              <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
                <Image src={loader} alt="Loading" width={40} height={40} />
              </div>
            ) : consultations.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <FaFileMedical className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                <p className="text-gray-500">No past consultations found</p>
                <p className="text-gray-400 text-sm mt-2">
                  After completing appointments, your consultation records will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {consultations.map((consultation, index) => (
                  <div 
                    key={index} 
                    className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                    onClick={() => viewConsultationDetails(consultation)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="p-3 bg-blue-50 rounded-full mr-4">
                          <FaFilePrescription className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">Dr. {consultation.doctor.user.name}</h3>
                          <p className="text-gray-500">{consultation.doctor.specialization}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">
                          {formatDate(consultation.consultation.createdAt)}
                        </span>
                        <div className="mt-1">
                          <button 
                            className="text-blue-600 text-sm flex items-center"
                            onClick={() => viewConsultationDetails(consultation)}
                          >
                            View Details <FaChevronRight className="ml-1 h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Symptoms</p>
                          <p className="font-medium text-gray-700">
                            {consultation.symptoms?.join(", ") || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Diagnosis</p>
                          <p className="font-medium text-gray-700">
                            {consultation.consultation.diagnosis || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
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

      {/* Consultation Details Modal */}
      <Dialog open={isConsultationModalOpen} onOpenChange={setIsConsultationModalOpen}>
        <DialogContent className="max-w-3xl">
          {selectedConsultation && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center">
                  <FaFilePrescription className="mr-2" /> Consultation Record
                </DialogTitle>
                <DialogDescription>
                  Consultation with Dr. {selectedConsultation.doctor.user.name} on {formatDate(selectedConsultation.consultation.createdAt)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <TabsUI defaultValue="diagnosis" className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="diagnosis">Diagnosis & Treatment</TabsTrigger>
                    <TabsTrigger value="prescription">Prescription</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="diagnosis" className="mt-4 space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Diagnosis</h3>
                      <p className="text-gray-700">{selectedConsultation.consultation.diagnosis || "No diagnosis provided"}</p>
                    </div>
                    
                    {selectedConsultation.consultation.followUp && (
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h3 className="font-semibold mb-2 text-blue-700 flex items-center">
                          <FaCalendarCheck className="mr-2" /> Follow-Up Required
                        </h3>
                        <p className="text-gray-700">{selectedConsultation.consultation.followUp}</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="prescription" className="mt-4">
                    {selectedConsultation.consultation.prescription ? (
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between pb-4 border-b mb-4">
                          <div>
                            <h3 className="font-bold text-xl">Prescription</h3>
                            <p className="text-gray-500">
                              Issued: {formatDate(selectedConsultation.consultation.createdAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Dr. {selectedConsultation.doctor.user.name}</p>
                            <p className="text-gray-500">{selectedConsultation.doctor.specialization}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {selectedConsultation.consultation.prescription.map((med, idx) => (
                            <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                              <h4 className="font-medium">{med.name}</h4>
                              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                <div>
                                  <span className="text-gray-500">Dosage:</span> {med.dosage}
                                </div>
                                <div>
                                  <span className="text-gray-500">Duration:</span> {med.duration}
                                </div>
                                <div>
                                  <span className="text-gray-500">Frequency:</span> {med.frequency}
                                </div>
                                {med.notes && (
                                  <div className="col-span-2">
                                    <span className="text-gray-500">Notes:</span> {med.notes}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No prescription was issued for this consultation</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Doctor Information</h3>
                        <p className="font-medium">Dr. {selectedConsultation.doctor.user.name}</p>
                        <p className="text-gray-600">{selectedConsultation.doctor.specialization}</p>
                        <p className="text-gray-500 mt-2">
                          Consultation Fee: ${selectedConsultation.doctor.consultationFee}
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Patient Symptoms</h3>
                        <ul className="list-disc list-inside">
                          {selectedConsultation.symptoms?.length > 0 ? (
                            selectedConsultation.symptoms.map((symptom, idx) => (
                              <li key={idx} className="text-gray-700">{symptom}</li>
                            ))
                          ) : (
                            <li className="text-gray-500">No symptoms were recorded</li>
                          )}
                        </ul>
                        
                        {selectedConsultation.note && (
                          <>
                            <h3 className="font-semibold mt-4 mb-2">Additional Notes</h3>
                            <p className="text-gray-700">{selectedConsultation.note}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </TabsUI>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsConsultationModalOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MyAppointments;
