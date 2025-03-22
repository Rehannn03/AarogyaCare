"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { format } from "date-fns"
import { CalendarIcon, Save, FileDown, Printer } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const medicalConditions = [
  { id: "diabetes", label: "Diabetes" },
  { id: "hypertension", label: "Hypertension" },
  { id: "asthma", label: "Asthma" },
  { id: "heart-disease", label: "Heart Disease" },
  { id: "arthritis", label: "Arthritis" },
  { id: "thyroid", label: "Thyroid Disorder" },
]

const recommendedTests = [
  { id: "blood-test", label: "Blood Test" },
  { id: "urine-test", label: "Urine Test" },
  { id: "x-ray", label: "X-Ray" },
  { id: "mri", label: "MRI" },
  { id: "ct-scan", label: "CT Scan" },
  { id: "ultrasound", label: "Ultrasound" },
]

const specializations = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Psychiatrist",
  "Gynecologist",
  "Ophthalmologist",
  "ENT Specialist",
]

export default function MedicalAppointmentForm() {
  const [date, setDate] = useState(new Date())
  const [prescriptions, setPrescriptions] = useState([{ medicine: "", dosage: "", frequency: "", duration: "" }])

  const form = useForm({
    defaultValues: {
      patientName: "",
      patientAge: "",
      patientGender: "",
      patientContact: "",
      patientAddress: "",
      height: "",
      weight: "",
      bloodPressure: "",
      heartRate: "",
      allergies: "",
      medicalConditions: [] ,
      previousTreatments: "",
      chiefComplaint: "",
      diagnosis: "",
      doctorAdvice: "",
      doctorName: "",
      doctorSpecialization: "",
      recommendedTests: [] ,
    },
  })

  const addPrescriptionRow = () => {
    setPrescriptions([...prescriptions, { medicine: "", dosage: "", frequency: "", duration: "" }])
  }

  const updatePrescription = (index, field, value) => {
    const updatedPrescriptions = [...prescriptions]
    updatedPrescriptions[index] = {
      ...updatedPrescriptions[index],
      [field]: value,
    }
    setPrescriptions(updatedPrescriptions)
  }

  const removePrescriptionRow = (index) => {
    if (prescriptions.length > 1) {
      const updatedPrescriptions = [...prescriptions]
      updatedPrescriptions.splice(index, 1)
      setPrescriptions(updatedPrescriptions)
    }
  }

  const saveDraft = () => {
    const formData = form.getValues()
    const savedData = {
      ...formData,
      date: date.toISOString(),
      prescriptions,
    }
    localStorage.setItem("medicalFormDraft", JSON.stringify(savedData))
    alert("Draft saved successfully!")
  }

  const generatePDF = async () => {
    const formElement = document.getElementById("medical-form");
    if (!formElement) return;
  
    const canvas = await html2canvas(formElement, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
  
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
  
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
  
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  
    pdf.save("medical_appointment_form.pdf");
  };
  

  const printForm = () => {
    window.print()
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl print:py-0">
      <div id="medical-form" className="space-y-6 bg-white p-6 rounded-lg shadow-sm print:shadow-none">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Medical Appointment & Prescription Form</h1>
          <p className="text-muted-foreground">Healthway Medical Center</p>
          <div className="flex justify-center pt-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        

        <Form {...form}>
          <form className="space-y-8">
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>Enter the patient's personal and contact details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="patientAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="35" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="patientGender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="patientContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="patientAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="123 Medical St, Healthcare City, HC 12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vitals & Medical History */}
            <Card>
              <CardHeader>
                <CardTitle>Vitals & Medical History</CardTitle>
                <CardDescription>Record patient's vital signs and medical history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input placeholder="175" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input placeholder="70" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bloodPressure"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Pressure</FormLabel>
                          <FormControl>
                            <Input placeholder="120/80" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="heartRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Heart Rate (BPM)</FormLabel>
                          <FormControl>
                            <Input placeholder="72" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergies</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Penicillin, Peanuts, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medicalConditions"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Existing Medical Conditions</FormLabel>
                          <FormDescription>Select all that apply</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {medicalConditions.map((condition) => (
                            <FormField
                              key={condition.id}
                              control={form.control}
                              name="medicalConditions"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={condition.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(condition.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, condition.id])
                                            : field.onChange(field.value?.filter((value) => value !== condition.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{condition.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="previousTreatments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Surgeries/Treatments</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Appendectomy (2018), Knee Surgery (2020), etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            Diagnosis & Treatment Plan
            <Card>
              <CardHeader>
                <CardTitle>Diagnosis & Treatment Plan</CardTitle>
                <CardDescription>Document the diagnosis and recommended treatment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="chiefComplaint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chief Complaint / Symptoms</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the patient's main symptoms and complaints"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the diagnosis based on examination and symptoms"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel>Prescription</FormLabel>
                    <FormDescription className="mb-2">
                      Add medications with dosage, frequency, and duration
                    </FormDescription>
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Medicine Name</TableHead>
                            <TableHead>Dosage</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {prescriptions.map((prescription, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Input
                                  placeholder="Medicine name"
                                  value={prescription.medicine}
                                  onChange={(e) => updatePrescription(index, "medicine", e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  placeholder="e.g., 500mg"
                                  value={prescription.dosage}
                                  onChange={(e) => updatePrescription(index, "dosage", e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  placeholder="e.g., Twice daily"
                                  value={prescription.frequency}
                                  onChange={(e) => updatePrescription(index, "frequency", e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  placeholder="e.g., 7 days"
                                  value={prescription.duration}
                                  onChange={(e) => updatePrescription(index, "duration", e.target.value)}
                                />
                              </TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removePrescriptionRow(index)}
                                  disabled={prescriptions.length <= 1}
                                >
                                  ✕
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="p-3 flex justify-center border-t">
                        <Button type="button" variant="outline" size="sm" onClick={addPrescriptionRow}>
                          Add Medicine
                        </Button>
                      </div>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="recommendedTests"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Recommended Tests</FormLabel>
                          <FormDescription>Select all tests that should be performed</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {recommendedTests.map((test) => (
                            <FormField
                              key={test.id}
                              control={form.control}
                              name="recommendedTests"
                              render={({ field }) => {
                                return (
                                  <FormItem key={test.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(test.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, test.id])
                                            : field.onChange(field.value?.filter((value) => value !== test.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{test.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doctorAdvice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor's Advice</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional instructions and recommendations for the patient"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Doctor's Details */}
           
            <Card>
              <CardHeader>
                <CardTitle>Doctor's Details</CardTitle>
                <CardDescription>Information about the attending physician</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="doctorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor's Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Dr. Jane Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="doctorSpecialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select specialization" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {specializations.map((specialization) => (
                              <SelectItem key={specialization} value={specialization}>
                                {specialization}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6 border-t pt-6">
                  <FormLabel>Signature / Stamp</FormLabel>
                  <div className="mt-2 h-32 border rounded-md flex items-center justify-center bg-muted/20">
                    <p className="text-muted-foreground text-sm">Space for doctor's signature or stamp</p>
                  </div>
                </div>
              </CardContent>
            </Card> 

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end print:hidden">
              <Button type="button" variant="outline" onClick={saveDraft} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save as Draft
              </Button>
              <Button type="button" variant="outline" onClick={printForm} className="flex items-center gap-2">
                <Printer className="h-4 w-4" />
                Print Form
              </Button>
              <Button type="button" onClick={generatePDF} className="flex items-center gap-2">
                <FileDown className="h-4 w-4" />
                Generate PDF
              </Button>
            </div> 
          </form>
        </Form>
      </div>
    </div>
  )
}

