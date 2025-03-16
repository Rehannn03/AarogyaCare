"use client"
import React from 'react'
import { BsHeartPulseFill } from "react-icons/bs";
import { FaStethoscope } from "react-icons/fa6";
import { RiMedicineBottleLine } from "react-icons/ri";
import RevealonScroll from '../../RevealonScroll'
import { useTranslations } from 'next-intl';

const Statistics = () => {
  const t = useTranslations("Statistics"); // Namespace: "Statistics"

  return (
    <RevealonScroll>
      <section className="px-4 sm:px-8 lg:px-16 font-title bg-white">
        <div className='rounded-[5vw] bg-[#5F6FFF] p-[5%] flex flex-col text-white'>
          <h2 className='text-6xl text-center font-semibold mb-16'>{t("ourStatistics")}</h2>
          <div className='flex justify-around gap-3 text-center flex-col md:flex-wrap lg:flex-row'>
            {[
              { icon: <RiMedicineBottleLine className="mt-1" />, key: "diagnosisAccuracy" },
              { icon: <FaStethoscope className="mt-1" />, key: "diagnosisAccuracy" },
              { icon: <BsHeartPulseFill className="mt-1" />, key: "diagnosisAccuracy" }
            ].map((stat, index) => (
              <div key={index} className='bg-slate-200 p-14 rounded-3xl text-center'>
                <h1 className='text-black text-7xl font-extrabold mb-3'>99.5<span className='text-[#84CC16]'>%</span></h1>
                <p className='justify-center text-[#313A34] text-2xl flex gap-2'>
                  {stat.icon}{t(stat.key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealonScroll>
  )
}

export default Statistics;
