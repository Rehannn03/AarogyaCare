"use client";
import Image from "next/image";
import { useState } from "react";
import { MdAttachMoney, MdEqualizer, MdHistory, MdOutlineEqualizer, MdOutlineStar, MdOutlineStars } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";

const DoctorModal = ({ doctors, onClose, onSelectDoctor, loading }) => {
  const handleDoctorSelect = (doctor) => {
    onSelectDoctor(doctor);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] md:w-2/3 mx-4 max-h-[90vh] overflow-y-auto shadow-lg">
        {doctors.length === 0 && !loading ? (
          <div className="py-10 text-center">
            <FaUserDoctor className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-600">No doctors available</p>
            <p className="text-gray-500 mt-1">Try again later or adjust your search criteria</p>
          </div>
        ) : loading ? (
          <div className="py-10 flex items-center justify-center">
            <Image src="/loader.svg" height={80} width={80} alt="loader" className="mx-auto" />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Select a Doctor</h2>
              <button 
                className="text-2xl text-gray-500 hover:text-gray-700 focus:outline-none" 
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <ul className="space-y-4">
              {doctors.map((doctor, index) => (
                <li 
                  key={doctor._id || index} 
                  onClick={() => handleDoctorSelect(doctor)} 
                  className="cursor-pointer"
                >
                  <Card row={doctor} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorModal;

const Card = ({ row }) => {
  // Add null checks and defaults
  const doctorName = row.userId?.name || row.profile?.name || "Doctor Name";
  
  const cardData = [
    {
      title: "Specialization",
      value: row.specialization || "Not specified",
      icon: <MdOutlineStars className="text-gray-700 w-5 h-5" />,
    },
    {
      title: "Experience",
      value: `${row.experience || 0} Years`,
      icon: <MdHistory className="text-gray-700 w-5 h-5" />, 
    },
    {
      title: "Qualification",
      value: row.qualification || "Not specified",
      icon: <MdOutlineEqualizer className="text-gray-700 w-5 h-5" />, 
    },
    {
      title: "Consultation Fee",
      value: `$${row.consultationFee || 0}`,
      icon: <MdAttachMoney className="text-gray-700 w-5 h-5"/>,
    }
  ];

  return (
    <div className="p-6 w-full shadow-xl rounded-2xl bg-white hover:bg-gray-50 transition-all duration-200">
      <div className="flex justify-between mb-4">
        <div className="flex flex-row items-center">
          <div className="h-12 w-12 rounded-full mr-4 bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
            {doctorName.charAt(0)}
          </div>
          <div>
            <div className="flex mb-2 items-center">
              <h3 className="font-medium text-xl">{doctorName}</h3>
              <span className="px-2 mx-2 text-xs text-[#d4af37] bg-yellow-200 rounded-full flex items-center justify-center">
                <p>5</p>
                <MdOutlineStar className="ml-0.5" color="#d4af37" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-4">
        {cardData.map((data, index) => (
          <CardItem key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export function CardItem({ data }) {
  return (
    <div className="flex mb-2 justify-between items-center">
      <div className="flex items-center">
        <span className="inline-block mr-3 text-gray-500">
          {data.icon} 
        </span>
        <h4 className="text-lg text-gray-500">{data.title}</h4>
      </div>
      <span className="text-lg">{data.value}</span>
    </div>
  );
}
