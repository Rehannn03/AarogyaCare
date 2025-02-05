"use client"
import React from 'react'
import { BsHeartPulseFill } from "react-icons/bs";
import { FaStethoscope } from "react-icons/fa6";
import { RiMedicineBottleLine } from "react-icons/ri";
import RevealonScroll from '../../RevealonScroll'


const Statistics = () => {
  return (
    <RevealonScroll>
    <section className="   px-4 sm:px-8 lg:px-16 font-title bg-white">
        <div className='rounded-[5vw] bg-[#5F6FFF] p-[5%] flex flex-col text-white'>
            <h2 className='text-6xl text-center font-semibold mb-16'>Our Statistics</h2>
            <div className='flex justify-around gap-3 text-center flex-col md:flex-wrap lg:flex-row'>
                <div className='bg-slate-200   p-14 rounded-3xl text-center '>
                    <h1 className='text-black text-7xl font-extrabold  mb-3'>99.5<span className='text-[#84CC16]'>%</span></h1>
                    <p className='justify-center text-[#313A34] text-2xl flex gap-2'>
                    <RiMedicineBottleLine  className="mt-1"/>Diagnosis Accuracy</p>
                </div>
                {/* <div className='bg-slate-200 p-7 rounded-3xl text-center '>
                    <h1 className='text-black text-5xl font-bold mb-3'>99.5<span className='text-[#84CC16]'>%</span></h1>
                    <p className='text-center text-[#313A34] text-xl flex gap-2'>
                    <FaStethoscope />Diagnosis Accuracy</p>
                </div> */}
                <div className='bg-slate-200   p-14  rounded-3xl text-center '>
                    <h1 className='text-black text-7xl font-extrabold  mb-3'>99.5<span className='text-[#84CC16]'>%</span></h1>
                    <p className='justify-center text-[#313A34] text-2xl flex gap-2'>
                    <FaStethoscope className="mt-1" / >Diagnosis Accuracy</p>
                </div>
                {/* <div className='bg-slate-200 p-7 rounded-3xl'>
                    <h1 className='text-black text-5xl font-bold mb-3 md '>99.5<span className='text-[#84CC16]'>%</span></h1>
                    <p className='text-center text-[#313A34] text-xl flex gap-2'> <BsHeartPulseFill/>Diagnosis Accuracy</p>
                </div> */}
                <div className='bg-slate-200   p-14  rounded-3xl text-center '>
                    <h1 className='text-black text-7xl font-extrabold  mb-3'>99.5<span className='text-[#84CC16]'>%</span></h1>
                    <p className='justify-center text-[#313A34] text-2xl flex gap-2'>
                    <BsHeartPulseFill className="mt-1"/>Diagnosis Accuracy</p>
                </div>
            </div>
        </div>
    </section>
    </RevealonScroll>
  )
}

export default Statistics