"use client";

import { useEffect, useState } from "react";
import apiClient from "@/api-client/apiClient";
import Link from "next/link";
import Loader from "@/components/Loader";

const specializations = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Cardiologist",
  "Neurologists",
  "Gastroenterologist",
  "Orthopedic Surgical",
];

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await apiClient("doctors/getAllDoctors");
        const data = res?.data?.data?.doctors;

        if (Array.isArray(data)) {
          const validDoctors = data.filter((doctor: any) => doctor.userId?.name);
          setDoctors(validDoctors);
        } else {
          console.error("Unexpected response structure:", res);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <Loader/>;

  return (
    <div className="flex gap-6 p-4 max-w-7xl mx-auto">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Specializations</h2>
        <ul className="space-y-2">
          {specializations.map((spec) => (
            <li key={spec}>
              <Link href={`/doctors/${spec}`} passHref>
                <span className="block px-3 py-2 rounded hover:bg-blue-50 cursor-pointer text-blue-600 hover:text-blue-800">
                  {spec}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="w-3/4">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">All Doctors</h1>
        {doctors.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor: any) => (
              <div
                key={doctor._id}
                className="p-4 border rounded-lg shadow-sm bg-white"
              >
                <h2 className="text-lg font-semibold">
                  Dr. {doctor.userId?.name || "Unknown"}
                </h2>
                <p className="text-gray-600">{doctor.specialization || "Specialization not provided"}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center">No doctors found</div>
        )}
      </main>
    </div>
  );
};

export default DoctorsPage;
