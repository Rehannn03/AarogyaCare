"use client"

import { useState } from "react"
import { Users, Apple, CalendarCheck, TrendingUp, Clock, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientCard } from "@/features/dietician/components/patient-card"
import { AppointmentCard } from "@/features/dietician/components/appointment-card"

const metrics = [
  {
    title: "Total Patients",
    value: "42",
    change: "+2 this week",
    icon: <Users className="h-6 w-6" />,
    trend: "up",
  },
  {
    title: "Active Diet Plans",
    value: "28",
    change: "+3 this month",
    icon: <Apple className="h-6 w-6" />,
    trend: "up",
  },
  {
    title: "Appointments Today",
    value: "8",
    change: "2 remaining",
    icon: <CalendarCheck className="h-6 w-6" />,
    trend: "neutral",
  },
  {
    title: "Avg. Consultation",
    value: "45m",
    change: "5m less than last month",
    icon: <Clock className="h-6 w-6" />,
    trend: "down",
  },
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
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
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div
                  className={`p-2 rounded-lg ${
                    metric.trend === "up"
                      ? "bg-emerald-50 text-emerald-600"
                      : metric.trend === "down"
                        ? "bg-red-50 text-red-600"
                        : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {metric.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {metric.trend === "up" && <ArrowUp className="h-4 w-4 text-emerald-600 mr-1" />}
                {metric.trend === "down" && <ArrowDown className="h-4 w-4 text-red-600 mr-1" />}
                <span
                  className={`text-sm ${
                    metric.trend === "up"
                      ? "text-emerald-600"
                      : metric.trend === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Diet Plan Compliance</CardTitle>
                <CardDescription>Patient adherence to recommended diet plans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Weight Loss Plans</span>
                    </div>
                    <span className="text-sm text-muted-foreground">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Diabetes Management</span>
                    </div>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Heart Health Plans</span>
                    </div>
                    <span className="text-sm text-muted-foreground">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Sports Nutrition</span>
                    </div>
                    <span className="text-sm text-muted-foreground">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest patient interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Diet plan updated for Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">New appointment with Michael Brown</p>
                      <p className="text-sm text-muted-foreground">Today, 9:15 AM</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Progress note added for David Wilson</p>
                      <p className="text-sm text-muted-foreground">Yesterday, 4:45 PM</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-purple-500" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">New message from Emily Davis</p>
                      <p className="text-sm text-muted-foreground">Yesterday, 2:30 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Recent Patients</CardTitle>
                  <CardDescription>Your most recently updated patient profiles</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PatientCard
                    name="Sarah Johnson"
                    age={34}
                    condition="Weight Loss"
                    lastVisit="Today"
                    progress={68}
                    imageSrc="/placeholder.svg?height=40&width=40"
                  />
                  <PatientCard
                    name="Michael Brown"
                    age={52}
                    condition="Diabetes Type 2"
                    lastVisit="Yesterday"
                    progress={92}
                    imageSrc="/placeholder.svg?height=40&width=40"
                  />
                  <PatientCard
                    name="Emily Davis"
                    age={28}
                    condition="Sports Nutrition"
                    lastVisit="3 days ago"
                    progress={85}
                    imageSrc="/placeholder.svg?height=40&width=40"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your schedule for today and tomorrow</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AppointmentCard
                    patientName="David Wilson"
                    time="Today, 2:00 PM"
                    duration="45 minutes"
                    type="Follow-up"
                    imageSrc="/placeholder.svg?height=40&width=40"
                  />
                  <AppointmentCard
                    patientName="Jennifer Martinez"
                    time="Today, 3:30 PM"
                    duration="60 minutes"
                    type="Initial Consultation"
                    imageSrc="/placeholder.svg?height=40&width=40"
                  />
                  <AppointmentCard
                    patientName="Robert Taylor"
                    time="Tomorrow, 10:00 AM"
                    duration="30 minutes"
                    type="Diet Review"
                    imageSrc="/placeholder.svg?height=40&width=40"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>Age and gender distribution of your patients</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Demographics Chart</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Patient demographics will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Diet Plan Distribution</CardTitle>
                <CardDescription>Types of diet plans assigned to patients</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Diet Plan Chart</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Diet plan distribution will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Progress</CardTitle>
                <CardDescription>Weight loss and health improvements over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Progress Chart</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Patient progress will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consultation Trends</CardTitle>
                <CardDescription>Number of consultations over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Consultation Chart</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Consultation trends will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports about your practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Users className="h-8 w-8 mb-2" />
                    <h3 className="font-medium">Patient Report</h3>
                    <p className="text-sm text-muted-foreground mt-1">Summary of all patient data</p>
                    <Button className="mt-4" size="sm">
                      Generate
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Apple className="h-8 w-8 mb-2" />
                    <h3 className="font-medium">Diet Plan Report</h3>
                    <p className="text-sm text-muted-foreground mt-1">Analysis of diet plan effectiveness</p>
                    <Button className="mt-4" size="sm">
                      Generate
                    </Button>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <CalendarCheck className="h-8 w-8 mb-2" />
                    <h3 className="font-medium">Appointment Report</h3>
                    <p className="text-sm text-muted-foreground mt-1">Summary of appointments</p>
                    <Button className="mt-4" size="sm">
                      Generate
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Recent Reports</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Monthly Patient Summary</p>
                      <p className="text-sm text-muted-foreground">Generated on May 1, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Diet Plan Effectiveness</p>
                      <p className="text-sm text-muted-foreground">Generated on April 15, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Quarterly Business Report</p>
                      <p className="text-sm text-muted-foreground">Generated on April 1, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

