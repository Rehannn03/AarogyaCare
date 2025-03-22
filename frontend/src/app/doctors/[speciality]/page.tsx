"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import apiClient from '@/api-client/apiClient';

interface Doctor {
  _id: string;
  userId: {
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

async function getDoctors(speciality: string) {
  const res = await apiClient(`doctors/getAllDoctors`).catch((err) => {
    console.error("Error fetching data:", err);
    return null;
  });

  if (!res || !res.data || !res.data.data) {
    return [];
  }

  const { doctors } = res.data.data;
  if (!Array.isArray(doctors)) {
    console.error("Expected an array but got:", doctors);
    return [];
  }

  return doctors.filter((doctor: any) => doctor.specialization === speciality);
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

  if (loading) return <div>Loading...</div>;
  if (!speciality) return notFound();

  const specializations = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Cardiologist",
    "Neurologists",
    "Gastroenterologist",
  ];

  return (
    <div className="container mx-auto py-8 px-4 flex">
      <aside className="w-1/4 pr-6">
        <h2 className="text-lg font-medium mb-4">Browse by Specialization</h2>
        <div className="space-y-2">
          {specializations.map((spec) => (
            <Link key={spec} href={`/doctors/${spec}`}>
              <button
                className={`block w-full text-left p-3 rounded-lg border ${spec === speciality ? 'bg-blue-100 border-blue-600' : 'border-gray-300'}`}
              >
                {spec}
              </button>
            </Link>
          ))}
        </div>
      </aside>
      <div className="w-3/4">
        <h1 className="text-xl text-blue-600 font-medium mb-8">
          Doctors specializing in {speciality}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <div key={doctor._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={doctorImages[index % doctorImages.length] || "/placeholder.svg"}
                    alt={doctor.userId.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-green-600 text-sm">Available</span>
                  </div>
                  <h3 className="font-medium text-lg">Dr. {doctor.userId.name}</h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No doctors found for this speciality</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsSpecialityPage;
