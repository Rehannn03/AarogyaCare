"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Search, UserPlus, ArrowUpDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for patients
const patients = [
  { 
    id: 1, 
    name: 'Alex Smith', 
    email: 'alex.smith@example.com',
    age: 32,
    gender: 'Male',
    startWeight: 210,
    currentWeight: 192,
    targetWeight: 175,
    progress: 45,
    status: 'active',
    lastAppointment: '2025-03-28',
    dietPlan: 'Weight Loss',
    avatarUrl: ''
  },
  { 
    id: 2, 
    name: 'Jamie Wilson', 
    email: 'jamie.wilson@example.com',
    age: 45,
    gender: 'Female',
    startWeight: 165,
    currentWeight: 158,
    targetWeight: 150,
    progress: 60,
    status: 'needs-attention',
    lastAppointment: '2025-03-25',
    dietPlan: 'Mediterranean',
    avatarUrl: ''
  },
  { 
    id: 3, 
    name: 'Jordan Lee', 
    email: 'jordan.lee@example.com',
    age: 28,
    gender: 'Male',
    startWeight: 155,
    currentWeight: 152,
    targetWeight: 145,
    progress: 15,
    status: 'new',
    lastAppointment: '2025-04-01',
    dietPlan: 'New plan',
    avatarUrl: ''
  },
  { 
    id: 4, 
    name: 'Taylor Morgan', 
    email: 'taylor.morgan@example.com',
    age: 38,
    gender: 'Female',
    startWeight: 175,
    currentWeight: 166,
    targetWeight: 150,
    progress: 72,
    status: 'active',
    lastAppointment: '2025-03-20',
    dietPlan: 'Low Carb',
    avatarUrl: ''
  },
  { 
    id: 5, 
    name: 'Parker Johnson', 
    email: 'parker.johnson@example.com',
    age: 55,
    gender: 'Male',
    startWeight: 195,
    currentWeight: 193,
    targetWeight: 180,
    progress: 10,
    status: 'inactive',
    lastAppointment: '2025-03-10',
    dietPlan: 'Paused',
    avatarUrl: ''
  }
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'needs-attention':
      return <Badge className="bg-amber-500">Needs Attention</Badge>;
    case 'new':
      return <Badge className="bg-blue-500">New</Badge>;
    case 'inactive':
      return <Badge variant="outline">Inactive</Badge>;
    default:
      return null;
  }
};

const Patients = () => {
  const navigate = useRouter();

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Patients</h1>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add New Patient
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Patient Management</CardTitle>
            <CardDescription>View and manage all your patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort by
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Diet Plan</TableHead>
                    <TableHead>Last Appointment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={patient.avatarUrl} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {patient.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">{patient.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={patient.progress} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {patient.currentWeight} lbs / {patient.targetWeight} lbs
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(patient.status)}
                      </TableCell>
                      <TableCell>
                        {patient.dietPlan}
                      </TableCell>
                      <TableCell>
                        {new Date(patient.lastAppointment).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/patients/${patient.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Patients;