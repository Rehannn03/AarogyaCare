"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import apiClient from "@/api-client/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  PillIcon,
  Activity,
  User,
  Clock,
  FileText,
  Bell,
  HeartPulse,
  BarChart3,
  BookOpen,
  PlusCircle,
  AlertCircle,
  CircleCheck,
  Pencil,
  Trash,
  CheckCircle2,
  XCircle,
  Calendar as CalendarIcon2
} from "lucide-react";
import loader from "/public/loader.svg";

export default function PatientDashboard() {
  const { user, update } = useUserStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [medications, setMedications] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [medicineDialogOpen, setMedicineDialogOpen] = useState(false);
  const [editMedicineId, setEditMedicineId] = useState(null);
  
  // Form states for adding/editing medicine
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [timing, setTiming] = useState("after_meal");
  const [frequency, setFrequency] = useState([
    { time: "morning", hour: 8, minute: 0 },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));

  useEffect(() => {
    if (!user) fetchAndSetUserStore(update);
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch appointments
      const appointmentsResponse = await apiClient.get("/patients/viewAppointments");
      if (appointmentsResponse.status === 200) {
        setAppointments(appointmentsResponse.data.data.appointments || []);
      }

      // Fetch consultations
      const consultationsResponse = await apiClient.get("/patients/viewConsultations");
      if (consultationsResponse.status === 200) {
        setConsultations(consultationsResponse.data.data.consultation || {});
      }

      // Fetch medications
      const medicationsResponse = await apiClient.get("/patients/viewMedicine");
      if (medicationsResponse.status === 200) {
        setMedications(medicationsResponse.data.data.medicine || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch your health data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter appointments based on active tab
  const filterAppointments = (tab) => {
    const now = new Date();
    switch (tab) {
      case "upcoming":
        return appointments.filter(app => new Date(app.date) >= now && app.status !== "cancelled" && app.status !== "rejected");
      case "completed":
        return appointments.filter(app => app.status === "completed");
      case "cancelled":
        return appointments.filter(app => app.status === "cancelled" || app.status === "rejected");
      default:
        return appointments;
    }
  };

  // Format appointment date
  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return "Today";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    }
    return format(date, "MMM d, yyyy");
  };

  // Get active medications
  const getActiveMedications = () => {
    return medications.filter(med => med.active);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "active": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Handle adding frequency time
  const addFrequencyTime = () => {
    const timePeriods = ["morning", "afternoon", "evening", "night"];
    const currentPeriods = frequency.map(f => f.time);
    const availablePeriods = timePeriods.filter(t => !currentPeriods.includes(t));
    
    if (availablePeriods.length > 0) {
      const defaultHours = { morning: 8, afternoon: 12, evening: 18, night: 22 };
      setFrequency([...frequency, { 
        time: availablePeriods[0], 
        hour: defaultHours[availablePeriods[0]], 
        minute: 0 
      }]);
    }
  };

  // Handle removing frequency time
  const removeFrequencyTime = (index) => {
    setFrequency(frequency.filter((_, i) => i !== index));
  };

  // Update frequency time values
  const updateFrequencyTime = (index, field, value) => {
    const updatedFrequency = [...frequency];
    updatedFrequency[index] = { ...updatedFrequency[index], [field]: value };
    setFrequency(updatedFrequency);
  };

  // Reset medicine form
  const resetMedicineForm = () => {
    setMedicineName("");
    setDosage("");
    setTiming("after_meal");
    setFrequency([{ time: "morning", hour: 8, minute: 0 }]);
    setStartDate(new Date());
    setEndDate(new Date(new Date().setDate(new Date().getDate() + 7)));
    setEditMedicineId(null);
  };

  // Load medicine data for editing
  const loadMedicineForEdit = (med) => {
    setMedicineName(med.medicineName);
    setDosage(med.dosage);
    setTiming(med.timing);
    setFrequency(med.frequency);
    setStartDate(new Date(med.startDate));
    setEndDate(new Date(med.endDate));
    setEditMedicineId(med._id);
    setMedicineDialogOpen(true);
  };

  // Handle form submission for adding/editing medicine
  const handleMedicineSubmit = async () => {
    try {
      const medicineData = {
        medicineName,
        dosage,
        timing,
        frequency,
        startDate,
        endDate
      };

      if (editMedicineId) {
        // Edit existing medicine
        await apiClient.put(`/patients/editMedicine/${editMedicineId}`, medicineData);
        toast({
          title: "Success",
          description: "Medicine updated successfully",
        });
      } else {
        // Add new medicine
        await apiClient.post("/patients/addMedicine", medicineData);
        toast({
          title: "Success",
          description: "Medicine added successfully",
        });
      }
      
      // Refresh medications data
      const medicationsResponse = await apiClient.get("/patients/viewMedicine");
      setMedications(medicationsResponse.data.data.medicine || []);
      
      // Close dialog and reset form
      setMedicineDialogOpen(false);
      resetMedicineForm();
    } catch (error) {
      console.error("Error saving medicine:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save medicine.",
        variant: "destructive",
      });
    }
  };

  // Handle activating/deactivating medicine
  const toggleMedicineActive = async (med) => {
    try {
      if (med.active) {
        await apiClient.patch(`/patients/deactivateMedicine/${med._id}`);
        toast({
          title: "Medicine Deactivated",
          description: `${med.medicineName} has been deactivated.`,
        });
      } else {
        await apiClient.patch(`/patients/reActivateMedicine/${med._id}`);
        toast({
          title: "Medicine Activated",
          description: `${med.medicineName} has been reactivated.`,
        });
      }
      
      // Refresh medications data
      const medicationsResponse = await apiClient.get("/patients/viewMedicine");
      setMedications(medicationsResponse.data.data.medicine || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update medicine status.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image src={loader} alt="Loading" width={60} height={60} />
      </div>
    );
  }

  const upcomingAppointments = filterAppointments("upcoming");
  const activeMedications = getActiveMedications();

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600">Here's an overview of your health journey</p>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-1">Upcoming Appointments</p>
                <h3 className="text-3xl font-bold">{upcomingAppointments.length}</h3>
              </div>
              <CalendarIcon2 className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1">Active Medications</p>
                <h3 className="text-3xl font-bold">{activeMedications.length}</h3>
              </div>
              <PillIcon className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-1">Medical Records</p>
                <h3 className="text-3xl font-bold">{appointments.filter(app => app.status === "completed").length}</h3>
              </div>
              <FileTextIcon className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Appointments */}
        <div className="lg:col-span-2">
          <Card className="shadow-md">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Appointments</CardTitle>
                  <CardDescription>Manage your medical visits</CardDescription>
                </div>
                <Link href="/appointment">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="grid grid-cols-3 bg-gray-50 border-b">
                  <TabsTrigger value="upcoming" onClick={() => setActiveTab("upcoming")}>Upcoming</TabsTrigger>
                  <TabsTrigger value="completed" onClick={() => setActiveTab("completed")}>Completed</TabsTrigger>
                  <TabsTrigger value="cancelled" onClick={() => setActiveTab("cancelled")}>Cancelled</TabsTrigger>
                </TabsList>

                <div className="p-4">
                  {filterAppointments(activeTab).length === 0 ? (
                    <div className="text-center py-10">
                      <CalendarIcon2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-1">No appointments found</h3>
                      <p className="text-gray-500 mb-4">You don't have any {activeTab} appointments.</p>
                      {activeTab === "upcoming" && (
                        <Link href="/appointment">
                          <Button size="sm">Book an appointment</Button>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filterAppointments(activeTab).map((appointment) => (
                        <Card key={appointment._id} className="border shadow-sm hover:shadow transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                  <User className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{appointment.doctor?.user?.name || "Dr. Unknown"}</h4>
                                  <p className="text-sm text-gray-600">{appointment.doctor?.specialization || "Specialist"}</p>
                                </div>
                              </div>
                              <Badge className={getStatusColor(appointment.status)}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <CalendarIcon2 className="mr-2 h-4 w-4" />
                                {formatAppointmentDate(appointment.date)}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <ClockIcon className="mr-2 h-4 w-4" />
                                {appointment.time}
                              </div>
                            </div>
                            
                            {appointment.symptoms && (
                              <div className="mt-3 text-sm">
                                <div className="font-medium">Symptoms:</div>
                                <p className="text-gray-600">
                                  {Array.isArray(appointment.symptoms) 
                                    ? appointment.symptoms.join(", ") 
                                    : appointment.symptoms}
                                </p>
                              </div>
                            )}
                          </CardContent>
                          
                          {appointment.status === "approved" && (
                            <CardFooter className="bg-gray-50 border-t p-3">
                              <Link href={`/video-consultation/${appointment._id}`} className="w-full">
                                <Button variant="outline" size="sm" className="w-full">
                                  <Bell className="mr-2 h-4 w-4" />
                                  Join when active
                                </Button>
                              </Link>
                            </CardFooter>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Latest Consultation */}
          <Card className="mt-6 shadow-md">
            <CardHeader className="border-b bg-gray-50">
              <CardTitle>Recent Medical Advice</CardTitle>
              <CardDescription>Your latest consultation details</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {Object.keys(consultations).length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">Diagnosis</h3>
                    <p>{consultations.diagnosis}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Prescription</h3>
                    <ul className="space-y-2">
                      {Array.isArray(consultations.prescription) && consultations.prescription.map((med, idx) => (
                        <li key={idx} className="bg-gray-50 p-3 rounded-lg flex items-start">
                          <PillIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>{med}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <CalendarIcon2 className="h-5 w-5 text-yellow-600 mr-2" />
                      <span className="font-medium">Follow-up:</span>
                    </div>
                    <span>{consultations.followUp}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600">No consultations yet</h3>
                  <p className="text-gray-500 mt-1">Your medical advice will appear here after a consultation</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Medications & Health Tips */}
        <div className="space-y-6">
          {/* Medications */}
          <Card className="shadow-md">
            <CardHeader className="border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Medications</CardTitle>
                  <CardDescription>Your prescription tracker</CardDescription>
                </div>
                {/* This button will now trigger the dialog at the bottom of your component */}
                <Button 
                  variant="outline" 
                  size="sm"  
                  onClick={() => {
                    resetMedicineForm();
                    setMedicineDialogOpen(true);
                  }}
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Medicine
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
                <TabsContent value="active">
                  {activeMedications.length === 0 ? (
                    <div className="text-center py-8">
                      <PillIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600">No active medications</h3>
                      <p className="text-gray-500 mt-1 mb-3">Add your medications to track them</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          resetMedicineForm();
                          setMedicineDialogOpen(true);
                        }}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Medicine
                      </Button>
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-3 pt-2">
                        {activeMedications.map((med) => (
                          <Card key={med._id} className="p-3 border hover:shadow-md transition-shadow bg-white">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-800">{med.medicineName}</h4>
                                <div className="flex items-center mt-1 text-sm text-gray-600">
                                  <PillIcon className="h-4 w-4 mr-1" />
                                  {med.dosage} • {med.timing.replace('_', ' ')}
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                Active
                              </Badge>
                            </div>
                            
                            <div className="mt-3">
                              <Label className="text-xs text-gray-500">Schedule</Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {med.frequency.map((freq, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {freq.time} {freq.hour}:{freq.minute < 10 ? `0${freq.minute}` : freq.minute}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="xs" 
                                  onClick={() => loadMedicineForEdit(med)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="xs" 
                                  onClick={() => toggleMedicineActive(med)}
                                >
                                  {med.active ? (
                                    <XCircle className="h-4 w-4 text-red-600" />
                                  ) : (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>
                <TabsContent value="inactive">
                  {medications.filter(med => !med.active).length === 0 ? (
                    <div className="text-center py-8">
                      <PillIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600">No inactive medications</h3>
                      <p className="text-gray-500 mt-1 mb-3">Your inactive medications will appear here</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-3 pt-2">
                        {medications.filter(med => !med.active).map((med) => (
                          <Card key={med._id} className="p-3 border hover:shadow-md transition-shadow bg-white">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-800">{med.medicineName}</h4>
                                <div className="flex items-center mt-1 text-sm text-gray-600">
                                  <PillIcon className="h-4 w-4 mr-1" />
                                  {med.dosage} • {med.timing.replace('_', ' ')}
                                </div>
                              </div>
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                Inactive
                              </Badge>
                            </div>
                            
                            <div className="mt-3">
                              <Label className="text-xs text-gray-500">Schedule</Label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {med.frequency.map((freq, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {freq.time} {freq.hour}:{freq.minute < 10 ? `0${freq.minute}` : freq.minute}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="xs" 
                                  onClick={() => loadMedicineForEdit(med)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="xs" 
                                  onClick={() => toggleMedicineActive(med)}
                                >
                                  {med.active ? (
                                    <XCircle className="h-4 w-4 text-red-600" />
                                  ) : (
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Health Tips */}
          <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-yellow-100 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                Health Tip of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Regular health check-ups can help detect potential health issues before they become serious. Make sure to schedule your annual health screening.</p>
              
              <div className="mt-4 bg-white p-3 rounded-lg border border-yellow-100">
                <div className="flex items-start">
                  <CircleCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <p className="text-sm text-gray-600">Stay hydrated by drinking at least 8 glasses of water daily.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Medical Records */}
      <Card className="mt-8 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Your health records and documents</CardDescription>
            </div>
            <Link href="/dashboard/medical-records">
              <Button variant="outline" size="sm">Manage Records</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-dashed border-gray-200 hover:border-gray-300">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <PlusCircle className="h-10 w-10 text-gray-400 mb-3" />
                <h3 className="font-medium text-gray-700">Upload New Record</h3>
                <p className="text-sm text-gray-500 text-center mt-1">
                  Add new medical reports or documents
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-blue-700">Blood Test</h3>
                  <Badge>PDF</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Complete blood work results from your last annual checkup
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    <CalendarIcon2 className="inline h-3 w-3 mr-1" />
                    Feb 15, 2025
                  </div>
                  <Button size="sm" variant="ghost" className="h-8">View</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-purple-700">Radiology</h3>
                  <Badge>IMG</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Chest X-Ray from Citi Medical Center
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    <CalendarIcon2 className="inline h-3 w-3 mr-1" />
                    Jan 28, 2025
                  </div>
                  <Button size="sm" variant="ghost" className="h-8">View</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Medicine Dialog */}
      <Dialog open={medicineDialogOpen} onOpenChange={setMedicineDialogOpen}>
        <DialogContent className="max-w-md sm:max-w-lg p-0 bg-transparent border-none shadow-none">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" aria-hidden="true" onClick={() => setMedicineDialogOpen(false)}></div>
          <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden w-full max-w-md sm:max-w-lg animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <DialogTitle className="text-xl font-bold">
                {editMedicineId ? "Edit Medicine" : "Add Medicine"}
              </DialogTitle>
              <DialogDescription className="text-blue-100 mt-1">
                {editMedicineId ? "Update your medicine details below." : "Fill in the details to add a new medicine."}
              </DialogDescription>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="medicineName" className="font-medium">Medicine Name</Label>
                <Input 
                  id="medicineName" 
                  value={medicineName} 
                  onChange={(e) => setMedicineName(e.target.value)}
                  className="border-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter medicine name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dosage" className="font-medium">Dosage</Label>
                <Input 
                  id="dosage" 
                  value={dosage} 
                  onChange={(e) => setDosage(e.target.value)}
                  className="border-2 focus:border-blue-500 focus:ring-blue-500" 
                  placeholder="Ex: 500mg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timing" className="font-medium">Timing</Label>
                <Select 
                  value={timing} 
                  onValueChange={setTiming}
                >
                  <SelectTrigger className="border-2 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before_meal">Before Meal</SelectItem>
                    <SelectItem value="after_meal">After Meal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label className="font-medium">Frequency</Label>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg border">
                  {frequency.map((freq, index) => (
                    <div key={index} className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
                      <Select 
                        value={freq.time} 
                        onValueChange={(value) => updateFrequencyTime(index, "time", value)}
                      >
                        <SelectTrigger className="w-32 border focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="afternoon">Afternoon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                          <SelectItem value="night">Night</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="flex items-center border rounded-md bg-white">
                        <Input 
                          type="number" 
                          value={freq.hour} 
                          onChange={(e) => updateFrequencyTime(index, "hour", parseInt(e.target.value))}
                          className="w-14 border-0 text-center"
                          min="0"
                          max="23"
                        />
                        <span className="text-gray-500">:</span>
                        <Input 
                          type="number" 
                          value={freq.minute} 
                          onChange={(e) => updateFrequencyTime(index, "minute", parseInt(e.target.value))}
                          className="w-14 border-0 text-center"
                          min="0"
                          max="59"
                        />
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="rounded-full hover:bg-red-50 hover:text-red-600"
                        onClick={() => removeFrequencyTime(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {frequency.length < 4 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full mt-2"
                      onClick={addFrequencyTime}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Time
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full border-2 justify-start">
                        <CalendarIcon2 className="mr-2 h-4 w-4 opacity-50" />
                        {format(startDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[9999]">
                      <Calendar 
                        mode="single" 
                        selected={startDate} 
                        onSelect={setStartDate} 
                        initialFocus 
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label className="font-medium">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full border-2 justify-start">
                        <CalendarIcon2 className="mr-2 h-4 w-4 opacity-50" />
                        {format(endDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[9999]">
                      <Calendar 
                        mode="single" 
                        selected={endDate} 
                        onSelect={setEndDate} 
                        initialFocus 
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 flex justify-end space-x-2 border-t">
              <Button 
                variant="outline" 
                onClick={() => setMedicineDialogOpen(false)}
                className="border-2"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleMedicineSubmit}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editMedicineId ? "Update Medicine" : "Add Medicine"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}