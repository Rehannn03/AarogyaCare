"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  MessageSquare,
  FileEdit,
  Calendar,
  Send,
  Plus,
  Scale,
  Heart,
  AlertCircle,
  Apple,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { PatientMealPlan } from "@/features/dietician/components/patient-meal-plane"
import { PatientProgressChart } from "@/features/dietician/components/patient-progress-chart"

// Mock patient data
const patientData = {
  "sarah-johnson": {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    age: 34,
    gender: "Female",
    height: "5'6\"",
    weight: "165 lbs",
    targetWeight: "140 lbs",
    bloodPressure: "120/80",
    conditions: ["Overweight", "Mild Hypertension"],
    allergies: ["Shellfish", "Peanuts"],
    dietPlan: "Low Carb",
    progress: 68,
    lastVisit: "Today",
    nextAppointment: "June 15, 2023",
    notes: [
      { date: "May 30, 2023", content: "Patient reports feeling more energetic after 2 weeks on the new diet plan." },
      {
        date: "May 15, 2023",
        content: "Initial consultation. Patient is motivated to lose weight for her sister's wedding in 3 months.",
      },
    ],
    messages: [
      {
        sender: "dietitian",
        content: "Hi Sarah, how are you feeling on the new diet plan?",
        timestamp: "May 25, 2023, 10:30 AM",
      },
      {
        sender: "patient",
        content: "I'm doing well! I've been sticking to it and already feel less bloated.",
        timestamp: "May 25, 2023, 11:45 AM",
      },
      {
        sender: "dietitian",
        content:
          "That's great to hear! Remember to keep drinking plenty of water and let me know if you experience any hunger issues.",
        timestamp: "May 25, 2023, 2:15 PM",
      },
      {
        sender: "patient",
        content: "Will do. When should I expect to see more significant results?",
        timestamp: "May 26, 2023, 9:20 AM",
      },
      {
        sender: "dietitian",
        content:
          "Most people see noticeable changes after 3-4 weeks of consistency. We'll do measurements at your next appointment to track your progress.",
        timestamp: "May 26, 2023, 10:05 AM",
      },
    ],
    progressData: [
      { date: "Apr 15", weight: 172 },
      { date: "May 1", weight: 169 },
      { date: "May 15", weight: 167 },
      { date: "May 30", weight: 165 },
    ],
  },
  // Additional patient data would be here
}

export default function PatientProfile() {
  const params = useParams()
  const patientId = params.id
  const patient = patientData[patientId] || {
    id: patientId,
    name: "Patient Not Found",
    email: "",
    age: 0,
    gender: "",
    height: "",
    weight: "",
    targetWeight: "",
    bloodPressure: "",
    conditions: [],
    allergies: [],
    dietPlan: "",
    progress: 0,
    lastVisit: "",
    nextAppointment: "",
    notes: [],
    messages: [],
    progressData: [],
  }

  const [newNote, setNewNote] = useState("")
  const [newMessage, setNewMessage] = useState("")

  // Generate initials for avatar fallback
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would update the database
      alert(`Note added: ${newNote}`)
      setNewNote("")
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the patient
      alert(`Message sent: ${newMessage}`)
      setNewMessage("")
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/patients">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Patient Profile</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:w-1/3">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={patient.name} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{patient.name}</CardTitle>
              <CardDescription>{patient.email}</CardDescription>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/chat?patient=${patient.id}`}>
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Message
                  </Link>
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="mr-1 h-4 w-4" />
                  Schedule
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Scale className="mr-2 h-4 w-4" />
                  Physical Information
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Age</span>
                    <span>{patient.age}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Gender</span>
                    <span>{patient.gender}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Height</span>
                    <span>{patient.height}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Weight</span>
                    <span>{patient.weight}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Target</span>
                    <span>{patient.targetWeight}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">BP</span>
                    <span>{patient.bloodPressure}</span>
                  </div>
                </div>
              </div>

              

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Heart className="mr-2 h-4 w-4" />
                  Health Conditions
                </h3>
                <div className="flex flex-wrap gap-1">
                  {patient.conditions.map((condition, i) => (
                    <Badge key={i} variant="secondary">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Allergies
                </h3>
                <div className="flex flex-wrap gap-1">
                  {patient.allergies.map((allergy, i) => (
                    <Badge key={i} variant="destructive">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>

             {/* Speraor */}

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Apple className="mr-2 h-4 w-4" />
                  Diet Plan
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>{patient.dietPlan}</span>
                    <Button size="sm" variant="outline">
                      <FileEdit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{patient.progress}%</span>
                    </div>
                    <Progress value={patient.progress} />
                  </div>
                </div>
              </div>

              <br/>

              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Appointments
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Visit</span>
                    <span>{patient.lastVisit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Appointment</span>
                    <span>{patient.nextAppointment}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="diet-plan" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="diet-plan">Diet Plan</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="diet-plan" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Current Diet Plan</CardTitle>
                    <CardDescription>{patient.dietPlan} - Last updated on May 15, 2023</CardDescription>
                  </div>
                  <Button>
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit Plan
                  </Button>
                </CardHeader>
                <CardContent>
                  <PatientMealPlan />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Progress</CardTitle>
                  <CardDescription>Tracking weight changes over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <PatientProgressChart data={patient.progressData} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Measurements</CardTitle>
                  <CardDescription>Track additional body measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Waist</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Initial</span>
                        <span>36 inches</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current</span>
                        <span>34 inches</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Change</span>
                        <span className="text-green-500">-2 inches</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Hip</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Initial</span>
                        <span>42 inches</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current</span>
                        <span>40 inches</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Change</span>
                        <span className="text-green-500">-2 inches</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Body Fat %</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Initial</span>
                        <span>32%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current</span>
                        <span>29%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Change</span>
                        <span className="text-green-500">-3%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Clinical Notes</CardTitle>
                  <CardDescription>Private notes about the patient's progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Textarea
                        placeholder="Add a new note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                      />
                      <Button onClick={handleAddNote} className="self-end">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Note
                      </Button>
                    </div>

                    {/* Sperator */}

                    <div className="space-y-4">
                      {patient.notes.map((note, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{note.date}</span>
                            <Button variant="ghost" size="sm">
                              <FileEdit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>Communication history with {patient.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col h-[400px]">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {patient.messages.map((message, i) => (
                        <div
                          key={i}
                          className={`flex ${message.sender === "dietitian" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "dietitian" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        className="min-h-[60px]"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button onClick={handleSendMessage} className="self-end">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

