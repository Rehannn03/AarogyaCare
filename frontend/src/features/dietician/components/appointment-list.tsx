import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Video, MessageSquare, MoreHorizontal } from "lucide-react"
import Link from "next/link"

// Mock data for appointments
const appointments = [
  {
    id: "1",
    patientName: "Sarah Johnson",
    patientId: "sarah-johnson",
    date: "June 15, 2023",
    time: "10:00 AM",
    duration: "45 minutes",
    type: "Follow-up",
    status: "Upcoming",
  },
  {
    id: "2",
    patientName: "Michael Brown",
    patientId: "michael-brown",
    date: "June 16, 2023",
    time: "2:30 PM",
    duration: "60 minutes",
    type: "Initial Consultation",
    status: "Upcoming",
  },
  {
    id: "3",
    patientName: "Emily Davis",
    patientId: "emily-davis",
    date: "June 14, 2023",
    time: "11:15 AM",
    duration: "30 minutes",
    type: "Diet Review",
    status: "Completed",
  },
  {
    id: "4",
    patientName: "David Wilson",
    patientId: "david-wilson",
    date: "Today",
    time: "2:00 PM",
    duration: "45 minutes",
    type: "Follow-up",
    status: "Today",
  },
  {
    id: "5",
    patientName: "Jennifer Martinez",
    patientId: "jennifer-martinez",
    date: "Today",
    time: "3:30 PM",
    duration: "60 minutes",
    type: "Initial Consultation",
    status: "Today",
  },
]

export function AppointmentList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => {
            // Generate initials for avatar fallback
            const initials = appointment.patientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()

            // Determine badge variant based on status
            let badgeVariant: "default" | "secondary" | "outline" = "outline"
            if (appointment.status === "Today") badgeVariant = "default"
            if (appointment.status === "Completed") badgeVariant = "secondary"

            return (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={appointment.patientName} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{appointment.patientName}</div>
                  </div>
                </TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.duration}</TableCell>
                <TableCell>{appointment.type}</TableCell>
                <TableCell>
                  <Badge className="" variant={badgeVariant}>{appointment.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/patients/${appointment.patientId}`}>
                        <Calendar className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                      <span className="sr-only">Video Call</span>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/chat?patient=${appointment.patientId}`}>
                        <MessageSquare className="h-4 w-4" />
                        <span className="sr-only">Message</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

