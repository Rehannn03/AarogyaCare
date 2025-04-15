"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Search, Filter, Plus, Video, X, Check } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';

// Mock data for appointments
const upcomingAppointments = [
  {
    id: 1,
    patientName: "Alex Smith",
    patientId: 1,
    doctorName: "Dr. Sarah Johnson",
    date: "2025-04-05",
    time: "10:00 AM",
    type: "In-person",
    status: "confirmed",
    notes: "Follow-up on diet plan progress",
    avatarUrl: ""
  },
  {
    id: 2,
    patientName: "Jamie Wilson",
    patientId: 2,
    doctorName: "Dr. Sarah Johnson",
    date: "2025-04-06",
    time: "2:30 PM",
    type: "Virtual",
    status: "confirmed",
    notes: "Monthly check-in",
    avatarUrl: ""
  },
  {
    id: 3,
    patientName: "Jordan Lee",
    patientId: 3,
    doctorName: "Dr. Sarah Johnson",
    date: "2025-04-08",
    time: "11:15 AM",
    type: "In-person",
    status: "pending",
    notes: "Initial consultation",
    avatarUrl: ""
  }
];

const pastAppointments = [
  {
    id: 101,
    patientName: "Alex Smith",
    patientId: 1,
    doctorName: "Dr. Sarah Johnson",
    date: "2025-03-22",
    time: "10:00 AM",
    type: "In-person",
    status: "completed",
    notes: "Diet plan established",
    avatarUrl: ""
  },
  {
    id: 102,
    patientName: "Taylor Morgan",
    patientId: 4,
    doctorName: "Dr. Sarah Johnson",
    date: "2025-03-20",
    time: "3:45 PM",
    type: "Virtual",
    status: "completed",
    notes: "Discussed progress and adjusted meal plan",
    avatarUrl: ""
  },
  {
    id: 103,
    patientName: "Jamie Wilson",
    patientId: 2,
    doctorName: "Dr. Sarah Johnson",
    date: "2025-03-15",
    time: "9:30 AM",
    type: "In-person",
    status: "completed",
    notes: "Reviewed goals and adjusted calorie intake",
    avatarUrl: ""
  }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'confirmed':
      return <Badge className="bg-green-500">Confirmed</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500">Pending</Badge>;
    case 'completed':
      return <Badge className="bg-blue-500">Completed</Badge>;
    case 'canceled':
      return <Badge variant="outline" className="text-red-500 border-red-200">Canceled</Badge>;
    default:
      return null;
  }
};

const getAppointmentTypeIcon = (type) => {
  return type === 'Virtual' ? <Video className="h-4 w-4 text-blue-500" /> : null;
};

const Appointments = () => {
    const user = { role: 'doctor' }; // Mock user role, replace with actual user data
  const [date, setDate] = useState(new Date());
  
  return (
   
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {user?.role === 'doctor' ? 'Schedule Appointment' : 'Book Appointment'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Manage Appointments</CardTitle>
                  <CardDescription>
                    View and manage your upcoming and past appointments
                  </CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search appointments..."
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {user?.role === 'doctor' && <TableHead>Patient</TableHead>}
                          {user?.role === 'patient' && <TableHead>Doctor</TableHead>}
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={appointment.avatarUrl} />
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {user?.role === 'doctor' 
                                      ? appointment.patientName.substring(0, 2).toUpperCase()
                                      : appointment.doctorName.substring(0, 2).toUpperCase()
                                    }
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {user?.role === 'doctor' ? appointment.patientName : appointment.doctorName}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="font-medium">
                                  {new Date(appointment.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {appointment.time}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getAppointmentTypeIcon(appointment.type)}
                                <span>{appointment.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(appointment.status)}
                            </TableCell>
                            <TableCell>
                              <div className="max-w-[200px] truncate" title={appointment.notes}>
                                {appointment.notes}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {appointment.status === 'pending' && user?.role === 'doctor' && (
                                  <>
                                    <Button size="sm" variant="ghost" className="text-green-500 h-8 w-8 p-0">
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="text-red-500 h-8 w-8 p-0">
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                                <Button size="sm" variant="outline">
                                  Details
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="past">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {user?.role === 'doctor' && <TableHead>Patient</TableHead>}
                          {user?.role === 'patient' && <TableHead>Doctor</TableHead>}
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={appointment.avatarUrl} />
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {user?.role === 'doctor' 
                                      ? appointment.patientName.substring(0, 2).toUpperCase()
                                      : appointment.doctorName.substring(0, 2).toUpperCase()
                                    }
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {user?.role === 'doctor' ? appointment.patientName : appointment.doctorName}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="font-medium">
                                  {new Date(appointment.date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {appointment.time}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getAppointmentTypeIcon(appointment.type)}
                                <span>{appointment.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(appointment.status)}
                            </TableCell>
                            <TableCell>
                              <div className="max-w-[200px] truncate" title={appointment.notes}>
                                {appointment.notes}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline">
                                  Details
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                {date && (
                  <div className="space-y-4">
                    <h3 className="font-medium">{format(date, "MMMM d, yyyy")}</h3>
                    <div className="space-y-2">
                      {upcomingAppointments
                        .filter(app => app.date === format(date, "yyyy-MM-dd"))
                        .map(app => (
                          <Card key={app.id}>
                            <CardContent className="p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">
                                    {user?.role === 'doctor' ? app.patientName : app.doctorName}
                                  </p>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    <span>{app.time}</span>
                                  </div>
                                </div>
                                {getStatusBadge(app.status)}
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      }
                      
                      {pastAppointments
                        .filter(app => app.date === format(date, "yyyy-MM-dd"))
                        .map(app => (
                          <Card key={app.id}>
                            <CardContent className="p-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">
                                    {user?.role === 'doctor' ? app.patientName : app.doctorName}
                                  </p>
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    <span>{app.time}</span>
                                  </div>
                                </div>
                                {getStatusBadge(app.status)}
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      }
                      
                      {upcomingAppointments.filter(app => app.date === format(date, "yyyy-MM-dd")).length === 0 &&
                       pastAppointments.filter(app => app.date === format(date, "yyyy-MM-dd")).length === 0 && (
                        <div className="text-center py-3 text-muted-foreground">
                          No appointments on this day
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    
  );
};

export default Appointments;