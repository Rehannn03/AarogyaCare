"use client"
import { Heart, Activity, Droplet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HealthTrendsChart } from "@/components/dashboard/HealthTrendsChart"
import { BloodPressureChart } from "@/components/dashboard/BloodPressureChart"
import { GlucoseLevelChart } from "@/components/dashboard/GlucoseLevelChart"

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

export default function PatientDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="rounded-lg bg-white p-6 flex justify-between items-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Welcome !</h1>
          <p className="text-gray-600">Get Your Latest Update for the Last 7 days</p>
          <Button variant="outline">Connect to Doctor →</Button>
        </div>
        <img
          src="/dashboard/dashboard-vector-art.jpg"
          alt="Medical professionals illustration"
          className="h-48 object-contain"
        />
      </div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className={`p-6 ${metric.bgColor}`}>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white rounded-lg">{metric.icon}</div>
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">My Health Weekly Trends</h2>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HealthTrendsChart />
          <BloodPressureChart />
          <GlucoseLevelChart />
        </div>
      </div>

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

