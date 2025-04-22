"use client";
import React from "react";
import axios from "axios";
import apiClient from "@/api-client/apiClient";
import { useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa";
import { useUserStore } from "@/stores/store";
import AllDoctors from "@/components/dashboard/AllDoctors";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const { user } = useUserStore();
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getAllDoctors = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/admin/getDoctors");
      const doctorListResponse = response.data.data.doctors;
      setAllDoctors(doctorListResponse);
      console.log("Doctors fetched:", doctorListResponse);
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
    <AllDoctors 
      allDoctors={allDoctors} 
      refreshDoctors={getAllDoctors} 
      loading={loading} 
    />
  );
};

export default page;
