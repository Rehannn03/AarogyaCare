"use client"

import { useState } from "react"
import { Users, CalendarCheck, Stethoscope, DollarSign, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppointmentChart } from "@/components/dashboard/doctor/AppointmentChart"
import { PatientDemographics } from "@/components/dashboard/doctor/PatientDemographics"
import { ConsultationTrends } from "@/components/dashboard/doctor/ConsultationTrends"
import { RevenueChart } from "@/components/dashboard/doctor/RevenueChart"

const metrics = [
  {
    title: "Total Patients",
    value: "1,234",
    change: "+12.5%",
    icon: <Users className="h-6 w-6" />,
    trend: "up",
  },
  {
    title: "Consultations",
    value: "156",
    change: "+8.2%",
    icon: <Stethoscope className="h-6 w-6" />,
    trend: "up",
  },
  {
    title: "Appointments",
    value: "32",
    change: "-2.4%",
    icon: <CalendarCheck className="h-6 w-6" />,
    trend: "down",
  },
  {
    title: "Revenue",
    value: "$12,345",
    change: "+15.3%",
    icon: <DollarSign className="h-6 w-6" />,
    trend: "up",
  },
]

export default function DoctorDashboard() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Smith</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${metric.trend === "up" ? "bg-emerald-50" : "bg-red-50"}`}>
                {metric.icon}
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${metric.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                {metric.change} from last month
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Appointment Analytics</h2>
          <AppointmentChart />
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Patient Demographics</h2>
          <PatientDemographics />
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Consultation Trends</h2>
          <ConsultationTrends />
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <RevenueChart />
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 rounded-lg border">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">General Checkup</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">2:00 PM</p>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Consultations</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 rounded-lg border">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Sarah Wilson</h3>
                  <p className="text-sm text-muted-foreground">Follow-up Consultation</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Completed</p>
                  <p className="text-sm text-muted-foreground">Yesterday</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

