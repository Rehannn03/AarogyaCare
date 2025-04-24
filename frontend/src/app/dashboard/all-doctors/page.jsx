"use client";
import React from "react";
import apiClient from "@/api-client/apiClient";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/store";
import AllDoctorsComponent from "@/components/dashboard/AllDoctors";
import { useToast } from "@/components/ui/use-toast";

const AllDoctorsPage = () => {
  const { user } = useUserStore();
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const { toast } = useToast();

  // Process doctors data to handle null userId fields
  const processDoctorsData = (doctors) => {
    return doctors.map(doctor => {
      // If userId is null, create a placeholder user object
      if (!doctor.userId) {
        return {
          ...doctor,
          userId: {
            _id: `temp-${doctor._id}`,
            name: "Doctor (Info Unavailable)",
            email: "",
            profile: {
              age: 0,
              contact: "",
              address: "",
              gender: "",
              city: ""
            },
            avatar: ""
          }
        };
      }
      return doctor;
    });
  };

  // Get all available specializations from doctors data
  const getSpecializations = () => {
    const specializations = allDoctors
      .map(doctor => doctor.specialization)
      .filter((value, index, self) => value && self.indexOf(value) === index);
    return specializations;
  };

  // Filter doctors based on search term and specialization
  useEffect(() => {
    if (allDoctors.length > 0) {
      let filtered = [...allDoctors];
      
      // Filter by search term (name or specialization)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(doctor => 
          (doctor.userId?.name?.toLowerCase().includes(term) || 
           doctor.specialization?.toLowerCase().includes(term) ||
           doctor.qualification?.toLowerCase().includes(term))
        );
      }
      
      // Filter by specialization
      if (specializationFilter) {
        filtered = filtered.filter(doctor => 
          doctor.specialization === specializationFilter
        );
      }
      
      setFilteredDoctors(filtered);
    }
  }, [allDoctors, searchTerm, specializationFilter]);

  const getAllDoctors = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/doctors/getAllDoctors");
      const doctorListResponse = response.data.data.doctors;
      
      // Process data to handle null userId
      const processedDoctors = processDoctorsData(doctorListResponse);
      
      setAllDoctors(processedDoctors);
      setFilteredDoctors(processedDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast({
        title: "Error",
        description: "Failed to fetch doctors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getAllDoctors();
    }
  }, [user]);

  return (
    <AllDoctorsComponent 
      allDoctors={filteredDoctors} 
      refreshDoctors={getAllDoctors} 
      loading={loading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      specializations={getSpecializations()}
      specializationFilter={specializationFilter}
      setSpecializationFilter={setSpecializationFilter}
      totalDoctors={allDoctors.length}
    />
  );
};

export default AllDoctorsPage;
