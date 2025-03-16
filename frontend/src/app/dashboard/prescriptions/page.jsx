"use client"

import { useState } from "react"
import { Calendar, Clock, Pill } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const prescriptions = [
  {
    id: 1,
    medicine: "Amoxicillin",
    dosage: "500mg",
    frequency: "3 times a day",
    duration: "7 days",
    startDate: "2024-02-10",
    doctor: "Dr. Sarah Smith",
    status: "active",
    instructions: "Take with food. Complete the full course.",
    nextRefill: "2024-02-17",
  },
  {
    id: 2,
    medicine: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    startDate: "2024-02-01",
    doctor: "Dr. Michael Chen",
    status: "active",
    instructions: "Take in the morning. Avoid alcohol.",
    nextRefill: "2024-03-01",
  },
  {
    id: 3,
    medicine: "Metformin",
    dosage: "850mg",
    frequency: "Twice daily",
    duration: "90 days",
    startDate: "2024-01-15",
    doctor: "Dr. Emily Johnson",
    status: "active",
    instructions: "Take with meals to minimize stomach upset.",
    nextRefill: "2024-04-15",
  },
]

export default function PrescriptionPage() {
  const [filter, setFilter] = useState("all")

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Prescriptions</h1>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter prescriptions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prescriptions</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{prescription.medicine}</CardTitle>
                  <CardDescription>{prescription.doctor}</CardDescription>
                </div>
                <Badge variant={prescription.status === "active" ? "default" : "secondary"}>
                  {prescription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Dosage</p>
                      <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Frequency</p>
                      <p className="text-sm text-muted-foreground">{prescription.frequency}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{prescription.duration}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Instructions</p>
                    <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Next Refill</p>
                    <p className="text-sm text-muted-foreground">{prescription.nextRefill}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Request Refill
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

