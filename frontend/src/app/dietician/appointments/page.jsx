import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { AppointmentList } from "@/features/dietician/components/appointment-list"

export default function AppointmentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="requests">Appointment Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1fr_300px]">
            <Card className="col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>June 2023</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous month</span>
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next month</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={new Date()} className="rounded-md border" />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AppointmentTimeSlot
                    time="9:00 AM"
                    patientName="Robert Taylor"
                    type="Diet Review"
                    duration="30 min"
                    status="confirmed"
                  />
                  <AppointmentTimeSlot
                    time="10:00 AM"
                    patientName="Emily Davis"
                    type="Follow-up"
                    duration="45 min"
                    status="confirmed"
                  />
                  <AppointmentTimeSlot time="11:30 AM" patientName="" type="" duration="" status="available" />
                  <AppointmentTimeSlot
                    time="1:00 PM"
                    patientName="Lunch Break"
                    type=""
                    duration="1 hour"
                    status="busy"
                  />
                  <AppointmentTimeSlot
                    time="2:00 PM"
                    patientName="David Wilson"
                    type="Follow-up"
                    duration="45 min"
                    status="confirmed"
                  />
                  <AppointmentTimeSlot
                    time="3:30 PM"
                    patientName="Jennifer Martinez"
                    type="Initial Consultation"
                    duration="60 min"
                    status="confirmed"
                  />
                  <AppointmentTimeSlot time="5:00 PM" patientName="" type="" duration="" status="available" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Appointments</CardTitle>
              <CardDescription>View and manage all scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Requests</CardTitle>
              <CardDescription>Pending appointment requests from patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">No pending appointment requests</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}



function AppointmentTimeSlot({ time, patientName, type, duration, status }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-20 text-sm font-medium">{time}</div>
      <div
        className={`flex-1 rounded-md p-2 ${
          status === "confirmed"
            ? "bg-primary/10 border border-primary/20"
            : status === "available"
              ? "bg-muted border border-dashed border-muted-foreground/20"
              : "bg-muted border border-muted-foreground/20"
        }`}
      >
        {status === "confirmed" ? (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{patientName}</p>
              <Badge variant="outline">{duration}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{type}</p>
          </div>
        ) : status === "available" ? (
          <div className="flex items-center justify-center h-10">
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-10">
            <p className="text-xs font-medium">{patientName}</p>
          </div>
        )}
      </div>
    </div>
  )
}

