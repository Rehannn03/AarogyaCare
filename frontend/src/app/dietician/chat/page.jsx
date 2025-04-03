"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Search, Send, FileText, Paperclip, MoreHorizontal } from "lucide-react"

// Mock data for patients
const patients = [
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    lastMessage: "I've been following the meal plan and feeling great!",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    lastMessage: "When should I take my supplements?",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "emily-davis",
    name: "Emily Davis",
    lastMessage: "Thanks for the updated workout nutrition plan",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "david-wilson",
    name: "David Wilson",
    lastMessage: "I'll send you my blood pressure readings tomorrow",
    time: "Monday",
    unread: 0,
    online: false,
  },
  {
    id: "jennifer-martinez",
    name: "Jennifer Martinez",
    lastMessage: "Looking forward to our first appointment",
    time: "Monday",
    unread: 0,
    online: false,
  },
]

// Mock data for messages
const messageHistory = {
  "sarah-johnson": [
    {
      sender: "patient",
      content: "Hi Dr. Smith, I've been following the meal plan for a week now.",
      timestamp: "10:15 AM",
    },
    { sender: "dietitian", content: "That's great to hear, Sarah! How are you feeling?", timestamp: "10:20 AM" },
    {
      sender: "patient",
      content: "I've been feeling more energetic and less bloated. I've also lost 2 pounds!",
      timestamp: "10:25 AM",
    },
    { sender: "patient", content: "I've been following the meal plan and feeling great!", timestamp: "10:30 AM" },
  ],
  "michael-brown": [
    { sender: "patient", content: "Hello, I have a question about my supplements.", timestamp: "Yesterday, 3:45 PM" },
    { sender: "dietitian", content: "Hi Michael, what would you like to know?", timestamp: "Yesterday, 4:00 PM" },
    { sender: "patient", content: "When should I take my supplements?", timestamp: "Yesterday, 4:15 PM" },
  ],
  // Other patient message histories would be here
}

export default function ChatPage() {
  const searchParams = useSearchParams()
  const initialPatientId = searchParams.get("patient") || "sarah-johnson"

  const [selectedPatientId, setSelectedPatientId] = useState(initialPatientId)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0]
  const messages = messageHistory[selectedPatientId] || []

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the patient
      alert(`Message sent to ${selectedPatient.name}: ${newMessage}`)
      setNewMessage("")
    }
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="grid h-[calc(100vh-10rem)] grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
        <Card className="col-span-1 flex flex-col">
          <CardHeader className="px-4 py-3">
            <CardTitle>Messages</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
            <div className="space-y-1 px-1">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  className={`w-full rounded-md p-2 text-left ${
                    selectedPatientId === patient.id ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedPatientId(patient.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={patient.name} />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {patient.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="truncate font-medium">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.time}</p>
                      </div>
                      <p className="truncate text-sm text-muted-foreground">{patient.lastMessage}</p>
                    </div>
                    {patient.unread > 0 && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {patient.unread}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 px-4 py-3">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={selectedPatient.name} />
              <AvatarFallback>
                {selectedPatient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                {selectedPatient.name}
                {selectedPatient.online && <span className="h-2 w-2 rounded-full bg-green-500" />}
              </CardTitle>
              <CardDescription>{selectedPatient.online ? "Online" : "Offline"}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href={`/patients/${selectedPatient.id}`} target="_blank" rel="noreferrer">
                  <FileText className="h-4 w-4" />
                  <span className="sr-only">Patient Profile</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </div>
          </CardHeader>
          {/* Sperator */}
          <CardContent className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div key={i} className={`flex ${message.sender === "dietitian" ? "justify-end" : "justify-start"}`}>
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
          </CardContent>
          {/* Sperator */}
          <div className="p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
                <span className="sr-only">Attach</span>
              </Button>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

