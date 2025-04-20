"use client";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import apiClient from '@/api-client/apiClient';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await apiClient(`doctors/getAllDoctors`).catch((err) => {
                console.error("Error fetching data:", err);
                return null;
            });

            if (res && res.data && res.data.data && Array.isArray(res.data.data.doctors)) {
                setDoctors(res.data.data.doctors);
            } else {
                console.error("Unexpected response structure:", res);
            }
            setLoading(false);
        };

        fetchDoctors();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {doctors.length > 0 ? (
                doctors.map((doctor: any) => (
                    <div key={doctor._id}>
                        <h1 className=" font-medium size-2">{doctor.userId.name}</h1>
                    <p>{doctor.specialization}</p></div>
                ))
            ) : (
                <div>No doctors found</div>
            )}
        </div>
    );
}

export default DoctorsPage;