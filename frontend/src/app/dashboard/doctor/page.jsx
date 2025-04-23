"use client"

import { useEffect, useState } from "react"
import { Users, CalendarCheck, Stethoscope, DollarSign, CheckCircle, XCircle, ChevronRight, Video } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AppointmentChart } from "@/components/dashboard/doctor/AppointmentChart"
import { PatientDemographics } from "@/components/dashboard/doctor/PatientDemographics"
import { ConsultationTrends } from "@/components/dashboard/doctor/ConsultationTrends"
import { RevenueChart } from "@/components/dashboard/doctor/RevenueChart"
import VideoCallButton from "@/components/VideoCall/VideoCallButton"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/seprator"

// API client
import apiClient from "@/api-client/apiClient"
import Loader from "@/components/Loader"

export default function DoctorDashboard() {
  const [timeRange, setTimeRange] = useState("week")
  const [doctor, setDoctor] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [consultationForm, setConsultationForm] = useState({
    appointmentId: "",
    diagnosis: "",
    prescription: "",
    followUp: "",
  })
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showConsultationForm, setShowConsultationForm] = useState(false)

  

  // Metrics data
  const metrics = [
    {
      title: "Total Patients",
      value: appointments.length.toString(),
      change: "+12.5%",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      trend: "up",
      color: "blue",
    },
    {
      title: "Consultations",
      value: appointments.filter((app) => app.status === "approved").length.toString(),
      change: "+8.2%",
      icon: <Stethoscope className="h-6 w-6 text-emerald-500" />,
      trend: "up",
      color: "emerald",
    },
    {
      title: "Pending Appointments",
      value: appointments.filter((app) => app.status === "pending").length.toString(),
      change: "-2.4%",
      icon: <CalendarCheck className="h-6 w-6 text-amber-500" />,
      trend: "down",
      color: "amber",
    },
    {
      title: "Revenue",
      value: `$${(doctor?.consultationFee || 0) * appointments.filter((app) => app.status === "approved").length}`,
      change: "+15.3%",
      icon: <DollarSign className="h-6 w-6 text-violet-500" />,
      trend: "up",
      color: "violet",
    },
  ]

  // Fetch doctor data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch doctor data
        const doctorResponse = await apiClient.get("/doctors/getDoctor")
        if (doctorResponse.data.success) {
          setDoctor(doctorResponse.data.data.doctor)
        }
        console.log(doctor);
        

        // Fetch appointments
        const appointmentsResponse = await apiClient.get("/doctors/getAppointments")
        if (appointmentsResponse.data.success) {
          setAppointments(appointmentsResponse.data.data.appointments)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle appointment status update
  const handleUpdateAppointment = async (appointmentId, status) => {
    try {
      const response = await apiClient.patch("/doctors/updateAppointment", {
        appointmentId,
        status,
      })

      if (response.data.success) {
        // Update the appointments list
        setAppointments(appointments.map((app) => (app._id === appointmentId ? { ...app, status } : app)))
      }
    } catch (error) {
      console.error("Error updating appointment:", error)
    }
  }

  // Handle consultation form submission
  const handleConsultationSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await apiClient.post("/doctors/fillConsultation", consultationForm)
      if (response.data.success) {
        setShowConsultationForm(false)
        // Refresh appointments
        const appointmentsResponse = await apiClient.get("/doctors/getAppointments")
        if (appointmentsResponse.data.success) {
          setAppointments(appointmentsResponse.data.data.appointments)
        }
      }
    } catch (error) {
      console.error("Error submitting consultation:", error)
    }
  }

  // Open consultation form
  const openConsultationForm = (appointment) => {
    setSelectedAppointment(appointment)
    setConsultationForm({
      appointmentId: appointment._id,
      diagnosis: "",
      prescription: "",
      followUp: "",
    })
    setShowConsultationForm(true)
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center h-screen">
        <Loader/>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Doctor Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, Dr. {doctor?.userId.name}</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Doctor Profile Card */}
          <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-2xl">Doctor Profile</CardTitle>
              <CardDescription className="text-blue-100">Your professional information</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16 border-2 border-blue-100">
                      <AvatarImage src={doctor?.userId.avatar || "/placeholder.svg?height=64&width=64"} />
                      <AvatarFallback className="bg-blue-100 text-blue-800 text-lg">
                        {doctor?.userId.name?.charAt(0) || "D"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{doctor?.userId.name}</h3>
                      <p className="text-muted-foreground">{doctor?.specialization}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="font-medium">{doctor?.userId.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Experience</p>
                      <p className="font-medium">{doctor?.experience} years</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Qualification</p>
                      <p className="font-medium">{doctor?.qualification}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Consultation Fee</p>
                      <p className="font-medium">${doctor?.consultationFee}</p>
                    </div>
                  </div>
                </div>
                <Separator orientation="vertical" className="hidden md:block" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p className="font-medium">{doctor?.userId.profile?.contact || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p className="font-medium">{doctor?.userId.profile?.address || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">City</p>
                      <p className="font-medium">{doctor?.userId.profile?.city || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Verification Status</p>
                      <Badge variant={doctor?.verified ? "success" : "destructive"} className="mt-1">
                        {doctor?.verified ? "Verified" : "Not Verified"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none shadow-md transition-all duration-200 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-${metric.color}-100`}>{metric.icon}</div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span
                      className={`text-sm font-medium ${
                        metric.trend === "up" ? "text-emerald-600" : "text-red-600"
                      } flex items-center`}
                    >
                      {metric.change}
                      <span className="inline-block ml-1 transform translate-y-px">
                        {metric.trend === "up" ? "↑" : "↓"}
                      </span>
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Appointments */}
          <Card className="border-none shadow-md">
            <CardHeader className="bg-white border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>Manage your upcoming consultations</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 bg-gray-100">
                  <TabsTrigger value="all" className="data-[state=active]:bg-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="data-[state=active]:bg-white">
                    Pending
                  </TabsTrigger>
                  <TabsTrigger value="approved" className="data-[state=active]:bg-white">
                    Approved
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {appointments.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">No appointments found</p>
                    </div>
                  ) : (
                    appointments.map((appointment) => (
                      <AppointmentCard
                        key={appointment._id}
                        appointment={appointment}
                        onUpdateStatus={handleUpdateAppointment}
                        onStartConsultation={openConsultationForm}
                      />
                    ))
                  )}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  {appointments.filter((a) => a.status === "pending").length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">No pending appointments</p>
                    </div>
                  ) : (
                    appointments
                      .filter((a) => a.status === "pending")
                      .map((appointment) => (
                        <AppointmentCard
                          key={appointment._id}
                          appointment={appointment}
                          onUpdateStatus={handleUpdateAppointment}
                          onStartConsultation={openConsultationForm}
                        />
                      ))
                  )}
                </TabsContent>

                <TabsContent value="approved" className="space-y-4">
                  {appointments.filter((a) => a.status === "approved").length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">No approved appointments</p>
                    </div>
                  ) : (
                    appointments
                      .filter((a) => a.status === "approved")
                      .map((appointment) => (
                        <AppointmentCard
                          key={appointment._id}
                          appointment={appointment}
                          onUpdateStatus={handleUpdateAppointment}
                          onStartConsultation={openConsultationForm}
                        />
                      ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader className="border-b">
                <CardTitle>Appointment Analytics</CardTitle>
                <CardDescription>Weekly appointment distribution</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <AppointmentChart />
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="border-b">
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>Gender distribution of patients</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <PatientDemographics />
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="border-b">
                <CardTitle>Consultation Trends</CardTitle>
                <CardDescription>Monthly consultation statistics</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ConsultationTrends />
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader className="border-b">
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue statistics</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <RevenueChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Consultation Form Modal */}
      {showConsultationForm && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-none shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle>Fill Consultation Details</CardTitle>
              <CardDescription className="text-blue-100">Patient: {selectedAppointment.patient.name}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Reported Symptoms</p>
                <p className="mt-1">{selectedAppointment.symptoms}</p>
              </div>

              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div>
                  <label htmlFor="diagnosis" className="block text-sm font-medium mb-1">
                    Diagnosis
                  </label>
                  <textarea
                    id="diagnosis"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={consultationForm.diagnosis}
                    onChange={(e) => setConsultationForm({ ...consultationForm, diagnosis: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="prescription" className="block text-sm font-medium mb-1">
                    Prescription
                  </label>
                  <textarea
                    id="prescription"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={consultationForm.prescription}
                    onChange={(e) => setConsultationForm({ ...consultationForm, prescription: e.target.value })}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="followUp" className="block text-sm font-medium mb-1">
                    Follow Up Date
                  </label>
                  <input
                    type="date"
                    id="followUp"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={consultationForm.followUp}
                    onChange={(e) => setConsultationForm({ ...consultationForm, followUp: e.target.value })}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowConsultationForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

// Appointment Card Component
function AppointmentCard({ appointment, onUpdateStatus, onStartConsultation }) {
  const statusColors = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
    active: "bg-purple-100 text-purple-800 border-purple-200", // Added active status
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy")
    } catch (error) {
      return dateString
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white">
      <div className="p-5 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={appointment.patient?.avatar || "/placeholder.svg?height=40&width=40"} />
              <AvatarFallback className="bg-blue-100 text-blue-800">
                {appointment.patient?.name?.charAt(0) || "P"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{appointment.patient.name}</h3>
              <p className="text-sm text-muted-foreground">{appointment.patient.email}</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Appointment</p>
            <p className="font-medium">
              {formatDate(appointment.date)} at {appointment.time}
            </p>
            <p className="text-sm line-clamp-1">
              <span className="font-medium">Symptoms:</span> {appointment.symptoms}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col md:items-end gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border ${
              statusColors[appointment.status] || "bg-gray-100"
            }`}
          >
            <span className="w-2 h-2 rounded-full mr-1.5 bg-current opacity-70"></span>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>

          <div className="flex gap-2 mt-2">
            {appointment.status === "pending" && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                  onClick={() => onUpdateStatus(appointment._id, "approved")}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                  onClick={() => onUpdateStatus(appointment._id, "rejected")}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </>
            )}

            {appointment.status === "approved" && (
              <>
                <VideoCallButton
                  appointmentId={appointment._id}
                  size="sm"
                  variant="default"
                  className="bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  onClick={() => onStartConsultation(appointment)}
                >
                  Fill Consultation
                </Button>
              </>
            )}
            
            {/* Added for active appointments */}
            {appointment.status === "active" && (
              <>
                <Button
                  size="sm"
                  variant="default"
                  className="bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                  onClick={() => window.open(appointment.link, "_blank")}
                >
                  <Video className="h-4 w-4 mr-1" />
                  Join Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-200 hover:bg-green-50 hover:border-green-300 transition-colors"
                  onClick={() => onStartConsultation(appointment)}
                >
                  Complete Consultation
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
