import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, MessageSquare, FileEdit } from "lucide-react"
import Link from "next/link"

// Mock data for patients
const patients = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    age: 34,
    condition: "Weight Loss",
    dietPlan: "Low Carb",
    status: "Active",
    lastVisit: "Today",
  },
  {
    id: "2",
    name: "Michael Brown",
    email: "michael.b@example.com",
    age: 52,
    condition: "Diabetes Type 2",
    dietPlan: "Low Glycemic",
    status: "Active",
    lastVisit: "Yesterday",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.d@example.com",
    age: 28,
    condition: "Sports Nutrition",
    dietPlan: "High Protein",
    status: "Active",
    lastVisit: "3 days ago",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.w@example.com",
    age: 45,
    condition: "Hypertension",
    dietPlan: "DASH Diet",
    status: "Active",
    lastVisit: "1 week ago",
  },
  {
    id: "5",
    name: "Jennifer Martinez",
    email: "jennifer.m@example.com",
    age: 39,
    condition: "Celiac Disease",
    dietPlan: "Gluten-Free",
    status: "Inactive",
    lastVisit: "2 weeks ago",
  },
]

export function PatientList() {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead className="hidden md:table-cell">Age</TableHead>
            <TableHead className="hidden md:table-cell">Condition</TableHead>
            <TableHead>Diet Plan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => {
            // Generate initials for avatar fallback
            const initials = patient.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()

            return (
              <TableRow key={patient.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={patient.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{patient.name}</span>
                      <span className="text-xs text-muted-foreground">{patient.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{patient.age}</TableCell>
                <TableCell className="hidden md:table-cell">{patient.condition}</TableCell>
                <TableCell>{patient.dietPlan}</TableCell>
                <TableCell>
                  <Badge
                    variant={patient.status === "Active" ? "default" : "secondary"}
                    className={
                      patient.status === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
                      <Link href={`/patients/${patient.id}`}>
                        <FileEdit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
                      <Link href={`/chat?patient=${patient.id}`}>
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

