"use client";
import Image from "next/image";
import { title } from "process";
import { useState } from "react";
import { MdAttachMoney, MdEqualizer, MdHistory, MdOutlineEqualizer, MdOutlineStar, MdOutlineStars } from "react-icons/md";


const doctorModal = ({ doctors, onClose, onSelectDoctor, loading }) => {
  // First argument is the state variable, second is the function to update the state
  // Need to pass the doctor object to the parent component ???

  const handleDoctorSelect = (doctor) => {
    onSelectDoctor(doctor);
    onClose();
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-xl p-6 w-[90%] md:w-2/3 mx-4 max-h-[90vh] overflow-y-auto shadow-lg">
          {
            doctors.length === 0 && !loading ? <p className="text-center">No doctors available</p> :
            loading ? <div className="block h-full m-auto">
                    <Image src='/loader.svg' height={40} width={40} alt="loader" className="block h-full m-auto" />
                    </div>
                :
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Select a Doctor</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                  &times;
                </button>
              </div>
              <ul>
                {doctors.map((doctor, index) => (
                  <li key={index} onClick={() => handleDoctorSelect(doctor)} className="mt-6">
                    <Card row={doctor} />
                  </li>
                ))}
              </ul>
            </>
          }
        </div>
      </div>
    );
};


export default doctorModal;

const Card = ({row}) => {
   const cardData = [
        {
            title: "Specialization",
            value: row.specialization,
            icon: <MdOutlineStars  className="text-gray-700 w-5 h-5" />,
        },
        {
          title: "Experience",
          value: row.experience,
          icon: <MdHistory className="text-gray-700 w-5 h-5" />, 
        },
        {
          title: "Qualification",
          value: row.qualification,
          icon: <MdOutlineEqualizer  className="text-gray-700 w-5 h-5" />, 
        },
        {
          title: "Consultation Fee",
          value: row.consultationFee,
          icon: <MdAttachMoney  className="text-gray-700 w-5 h-5"/>,
        }
      ]

      return (
        <div className="p-6 w-full shadow-xl rounded-2xl bg-white hover:bg-accent">
            <div className=" flex justify-between mb-4">
                <div className="flex flex-row items-center">
                        {/* <Image src={row.userId.avatar} alt={row.userId.name} width={48} height={48} className="w-12 h-12 rounded-full mr-4 object-cover" />  */}
                    <div>
                        <div className="flex mb-2">
                            <h3 className="font-medium text-xl"> {row.userId.name} </h3>
                            <span className={`px-2 mx-2 text-xs text-[#d4af37] bg-yellow-200 rounded-full flex items-center justify-center`}> <p>5</p> <MdOutlineStar className="ml-0.5" color="#d4af37" />  </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gap-4">
                {
                    cardData.map((data, index) => (
                        <CardItem key={index} data={data} />
                    ))  
                }
            </div>
        </div>


    )
}

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
    )
}
