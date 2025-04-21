"use client";
import {
  CTA,
  SelectDoctor,
  SelectOption,
  DatePicker,
  SelectTime,
  InputTags,
} from "@/components/appointments";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/stores/store";
import { fetchAndSetUserStore } from "@/lib/fetchAndSetUserStore";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/api-client/apiClient";
import { BsCloudSunFill, BsFillSunFill, BsSun } from "react-icons/bs";
import { IoCloudyNight } from "react-icons/io5";

function Appointment() {
  const { user, update } = useUserStore();
  const [allTypes, setAllTypes] = useState([
    { id: 1, name: "General Consultation" },
    { id: 2, name: "Speciality Consultation" },
    { id: 3, name: "Dental" },
    { id: 4, name: "Orthopedic" },
    { id: 5, name: "Neurology" },
  ]);

  const timeOptions = [
    {
      icon: BsCloudSunFill,
      time: "9-12PM",
      name: "Morning",
    },
    {
      icon: BsFillSunFill,
      time: "12-3PM",
      name: "Afternoon",
    },
    {
      icon: BsSun,
      time: "3-6PM",
      name: "Evening",
    },
    {
      icon: IoCloudyNight,
      time: "6-9PM",
      name: "Night",
    },
  ];

  // Form States
  const [selectedType, setSelectedType] = useState(allTypes[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) fetchAndSetUserStore(update);
  }, []);

  useEffect(() => {
    // if user is available (access token // UID is available) then only fetch the data
    // Fetch all types
    // Fetch all doctors
    // DEP ARRAY: the type selected and access token

    //User store
    console.log("This Data is from the global store");
    console.log(user);
  }, [user]);

  const checkIfEmpty = (data) => {
    return data === null || data === undefined || data === "";
  };

  const validateForm = () => {
    if (checkIfEmpty(selectedType)) {
      toast({
        title: "Error",
        description: "Please select the type of appointment",
        variant: "destructive",
      });
      return false;
    } else if (checkIfEmpty(selectedDoctor)) {
      toast({
        title: "Error",
        description: "Please select the doctor",
        variant: "destructive",
      });
      return false;
    } else if (checkIfEmpty(selectedTime)) {
      toast({
        title: "Error",
        description: "Please select the time slot",
        variant: "destructive",
      });
      return false;
    } else if (selectedSymptoms.length === 0) {
      toast({
        title: "Error",
        description: "Please enter the symptoms",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const bookAppointment = async () => {
    if (validateForm()) {
      console.log("Form is valid");
      try {
        // Format the date properly - just the date portion without time
        const formattedDate = selectedDate.toISOString().split('T')[0];
        
        // Create payload matching the backend requirements
        const payload = {
          doctorId: selectedDoctor._id,
          date: formattedDate,
          time: selectedTime,
          day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][selectedDate.getDay()],
          symptoms: selectedSymptoms, // Keep as array - backend expects this
          note: "", // This is the correct field name from the controller
          reportIds: [] // Add empty reportIds array as the controller expects it
        };
        
        console.log("Sending payload:", payload);
        
        // Make API request with proper format
        const response = await apiClient.post("/patients/scheduleAppointment", payload);

        // if 200 or 201 then show the success message
        if (response.status === 201 || response.status === 200) {
          toast({
            title: "Success",
            description: response.data.message,
            variant: "success",
          });
          
          // clear the form
          setSelectedType(allTypes[0].id);
          setSelectedDoctor(null);
          setSelectedDate(new Date());
          setSelectedTime(null);
          setSelectedSymptoms([]);
        } else {
          // else show the error message
          toast({
            title: "Error",
            description: response.data.message || "Failed to book appointment",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Appointment booking error:", error);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to book appointment. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center md:py-8">
      <div className="w-[90%] md:w-1/2 my-16 shadow-md rounded-3xl">
        <div className="flex flex-col px-12 py-8 gap-y-5">
          <h1 className="text-3xl font-bold my-4">Schedule Your Appointment</h1>
          <SelectOption
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            allTypes={allTypes}
          />
          <SelectDoctor
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
          />
          <DatePicker date={selectedDate} setDate={setSelectedDate} />
          <SelectTime
            timeOptions={timeOptions}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
          <InputTags value={selectedSymptoms} onChange={setSelectedSymptoms} />
          <div className="flex justify-end">
            <button
              className="py-2 px-4 w-1/2  text-white font-medium rounded-md shadow-2xl bg-primary hover:bg-accent transition ease-in-out duration-200"
              type="button"
              onClick={bookAppointment}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
