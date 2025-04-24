import React, { useEffect, useState } from "react";
import DoctorModal from "@/components/appointments/doctorModal";
import Image from "next/image";
import apiClient from "@/api-client/apiClient";

function SelectDoctor({ selectedDoctor, setSelectedDoctor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(false);


  const getAllDoctors = async () => {
    setLoading(true);
    const response = await apiClient.get("/doctors/getAllDoctors");
    // update ressone to have only verifed doctors
    const verifiedDoctors = response.data.data.doctors.filter(
      (doctor) => doctor?.verified === true
    );
    setAllDoctors(verifiedDoctors);
    if (response.status === 200) {
      setAllDoctors(verifiedDoctors);
    } else {
      toast({
        title: "Error",
        description: response.data.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isModalOpen && allDoctors.length === 0) {
      getAllDoctors();
    }

  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    //TODO: REMOVE THIS CONSOLE LOG
    console.log("Selected Doctor:", doctor);
  };
  return (
    <div className="flex flex-row">
      <button
        className="py-2 px-4 w-1/2 text-white font-medium rounded-md shadow-2xl bg-primary hover:bg-accent transition ease-in-out duration-200"
        type="button"
        onClick={openModal}
      >
        {selectedDoctor ? "Change Doctor" : "Select Doctor"}
      </button>
      {isModalOpen && (
        <DoctorModal
          loading={loading}
          doctors={allDoctors}
          onClose={closeModal}
          onSelectDoctor={handleDoctorSelect}
        />
      )}

      {selectedDoctor && (
        <div className="flex items-center gap-4 px-6 w-1/2">
          <Image
            src={selectedDoctor?.userId?.avatar}
            alt="doctor"
            className="w-10 h-10 rounded-full"
            style={{ objectFit: "cover" }}
            width={40}
            height={40}
          />
          <div className="pl-">
            <h3 className="text-lg font-semibold">{selectedDoctor?.userId?.name}</h3>
            <p className="text-sm text-gray-500">
              {selectedDoctor?.specialization}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectDoctor;
