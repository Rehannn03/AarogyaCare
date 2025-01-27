"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity, FileText, Pill, Stethoscope } from "lucide-react";

const dummyMedicalRecords = [
  {
    id: "1",
    date: "2023-05-15",
    doctorName: "Dr. Smith",
    diagnosis: "Common Cold",
  },
  {
    id: "2",
    date: "2023-03-22",
    doctorName: "Dr. Johnson",
    diagnosis: "Sprained Ankle",
  },
  {
    id: "3",
    date: "2023-01-10",
    doctorName: "Dr. Williams",
    diagnosis: "Annual Checkup",
  },
  {
    id: "4",
    date: "2022-11-05",
    doctorName: "Dr. Brown",
    diagnosis: "Influenza",
  },
  {
    id: "5",
    date: "2022-08-18",
    doctorName: "Dr. Davis",
    diagnosis: "Migraine",
  },
];

// Static data for demonstration
const staticMedicalRecords = [
  {
    id: "1",
    date: "2023-05-15",
    doctorName: "Dr. Smith",
    diagnosis: "Common Cold",
    prescription: "Rest and fluids",
    notes: "Follow up in 7 days if symptoms persist",
  },
  {
    id: "2",
    date: "2023-03-22",
    doctorName: "Dr. Johnson",
    diagnosis: "Sprained Ankle",
    prescription: "Ice and elevation",
    notes: "Avoid strenuous activity for 2 weeks",
  },
  {
    id: "3",
    date: "2023-01-10",
    doctorName: "Dr. Williams",
    diagnosis: "Annual Checkup",
    prescription: "None",
    notes: "All vitals normal. Schedule next annual checkup in 12 months",
  },
  {
    id: "4",
    date: "2022-11-05",
    doctorName: "Dr. Brown",
    diagnosis: "Influenza",
    prescription: "Tamiflu",
    notes: "Bed rest for 5 days, increase fluid intake",
  },
  {
    id: "5",
    date: "2022-08-18",
    doctorName: "Dr. Davis",
    diagnosis: "Migraine",
    prescription: "Sumatriptan",
    notes: "Avoid triggers, follow up if frequency increases",
  },
];

const staticMedications = [
  { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
  { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
  { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime" },
  {
    name: "Levothyroxine",
    dosage: "100mcg",
    frequency: "Once daily on empty stomach",
  },
];

const staticAllergies = ["Penicillin", "Peanuts", "Latex", "Shellfish"];

const staticVitals = [
  {
    icon: <Activity className="w-5 h-5" />,
    name: "Heart Rate",
    value: "72 bpm",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    name: "Blood Pressure",
    value: "120/80 mmHg",
  },
  {
    icon: <Stethoscope className="w-5 h-5" />,
    name: "Respiratory Rate",
    value: "14 breaths/min",
  },
  {
    icon: <Pill className="w-5 h-5" />,
    name: "Body Temperature",
    value: "98.6°F",
  },
];

export default function MedicalHistory() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Commented out API fetch
    // const fetchMedicalRecords = async () => {
    //   try {
    //     const response = await fetch("/api/medical-records");
    //     const data = await response.json();
    //     setMedicalRecords(data);
    //     setLoading(false);
    //   } catch (err) {
    //     setError("Failed to fetch medical records");
    //     setLoading(false);
    //   }
    // };
    // fetchMedicalRecords();

    // Using dummy data instead
    setMedicalRecords(dummyMedicalRecords);
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Medical History</h1>
      <Tabs defaultValue="records" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="medications">Current Medications</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
        </TabsList>
        <TabsContent value="records">
          <MedicalRecordsTab records={staticMedicalRecords} />
        </TabsContent>
        <TabsContent value="medications">
          <CurrentMedicationsTab medications={staticMedications} />
        </TabsContent>
        <TabsContent value="allergies">
          <AllergiesTab allergies={staticAllergies} />
        </TabsContent>
        <TabsContent value="vitals">
          <VitalSignsTab vitals={staticVitals} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MedicalRecordsTab({ records }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records</CardTitle>
        <CardDescription>
          View your past medical visits and diagnoses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.doctorName}</TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function CurrentMedicationsTab({ medications }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Medications</CardTitle>
        <CardDescription>
          Your prescribed medications and dosages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Frequency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((med, index) => (
              <TableRow key={index}>
                <TableCell>{med.name}</TableCell>
                <TableCell>{med.dosage}</TableCell>
                <TableCell>{med.frequency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function AllergiesTab({ allergies }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Allergies</CardTitle>
        <CardDescription>Known allergies and reactions</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          {allergies.map((allergy, index) => (
            <li key={index} className="mb-2">
              {allergy}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function VitalSignsTab({ vitals }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vital Signs</CardTitle>
        <CardDescription>
          Your most recent vital sign measurements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vitals.map((vital, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <div className="mr-4">{vital.icon}</div>
                <div>
                  <p className="text-sm text-muted-foreground">{vital.name}</p>
                  <p className="text-2xl font-bold">{vital.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
