"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import apiClient from "@/api-client/apiClient";

interface Doctor {
  _id: string;
  userId?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  specialization: string;
  experience?: number;
  rating?: number;
}

const doctorImages = [
  "/placeholder.svg?height=300&width=300&text=Doctor+1",
  "/placeholder.svg?height=300&width=300&text=Doctor+2",
  "/placeholder.svg?height=300&width=300&text=Doctor+3",
  "/placeholder.svg?height=300&width=300&text=Doctor+4",
  "/placeholder.svg?height=300&width=300&text=Doctor+5",
  "/placeholder.svg?height=300&width=300&text=Doctor+6",
  "/placeholder.svg?height=300&width=300&text=Doctor+7",
  "/placeholder.svg?height=300&width=300&text=Doctor+8",
];

async function getDoctors(speciality: string): Promise<Doctor[]> {
  try {
    const res = await apiClient("doctors/getAllDoctors");

    const doctors = res?.data?.data?.doctors || [];

    const normalizedSpeciality = decodeURIComponent(speciality.trim()).toLowerCase();

    console.log("Normalized speciality:", normalizedSpeciality);
    
    return doctors.filter((doctor: any) => {
      const spec = (doctor.specialization || "").trim().toLowerCase();
      console.log("Doctor specialization:", spec, "Normalized speciality:", normalizedSpeciality);
      
      return spec === normalizedSpeciality && doctor.userId?.name;
    });
  } catch (err) {
    console.error("Error fetching doctors:", err);
    return [];
  }
}

interface ProjectIsPageProps {
  params: { speciality: string };
}

const DoctorsSpecialityPage = ({ params }: ProjectIsPageProps) => {
  const speciality = params.speciality;
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (speciality) {

      
      getDoctors(speciality).then((data) => {
        setDoctors(data);
        setLoading(false);
      });
    }
  }, [speciality]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!speciality) return notFound();

  const specializations = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Cardiologist",
    "Neurologists",
    "Gastroenterologist",
    "Orthopedic Surgical"
  ];

  return (
    <div className="container mx-auto py-8 px-4 flex gap-6">
      {/* Sidebar */}
      <aside className="w-1/4">
        <h2 className="text-lg font-semibold mb-4">Browse by Specialization</h2>
        <div className="space-y-2">
          {specializations.map((spec) => (
            <Link key={spec} href={`/doctors/${spec}`}>
              <button
                className={`block w-full text-left px-4 py-2 rounded-lg border ${
                  spec.toLowerCase() === speciality.toLowerCase()
                    ? "bg-blue-100 border-blue-600"
                    : "border-gray-300"
                }`}
              >
                {spec}
              </button>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="w-3/4">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Doctors specializing in {decodeURIComponent(speciality)}
        </h1>

        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor, index) => (
              <div
                key={doctor._id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image
                    src={doctor.userId?.avatar || doctorImages[index % doctorImages.length]}
                    alt={`Dr. ${doctor.userId?.name || "Doctor"}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                  <h3 className="font-medium text-lg">
                    Dr. {doctor.userId?.name || "Unknown"}
                  </h3>
                  <p className="text-gray-600 text-sm">{doctor.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No doctors found for this specialization.
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorsSpecialityPage;
