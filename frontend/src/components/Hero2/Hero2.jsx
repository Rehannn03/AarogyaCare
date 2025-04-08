"use client";
import React, { useState, useEffect } from "react";
import { IoHardwareChipOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { motion } from "framer-motion";
import RevealonScroll from "../../RevealonScroll";
import { useTranslations } from "next-intl";

import Link from "next/link";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const t= useTranslations("HomePage")
  useEffect(() => {
    // Stop loader when the component is displayed
    setIsLoading(false);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <>
      {isLoading ? (
        // Loader Component
        <div className="flex items-center justify-center h-screen bg-white">
          <div className="flex flex-row gap-2">
  <div className="w-4 h-4 rounded-full bg-[#84CC16] animate-bounce [animation-delay:.7s]"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-[#84CC16] animate-bounce [animation-delay:.7s]"></div>
</div>
        </div>
      ) : (
        // Hero Section
        <RevealonScroll>
          <section className="bg-white font-title">
            <div className="flex flex-col md:flex-row justify-around">
              <div className="left-Hero flex flex-col max-w-full justify-center items-center">
                <h1 className="text-4xl flex flex-col md:text-[4.5vw] leading-[1.1em] font-extrabold text-slate-800 p-6 tracking-tight text-center">
                  <span>{t("Title.title1")}</span> <span>{t.rich("Title.title2")}</span>{" "}
                  <span>
                  {t("Title.title3")}
                    <span className="text-[#84CC16]">.</span>
                  </span>
                </h1>
                <motion.p className="text-[1rem] md:text-2.5rem lg:text-[1.4rem] text-center text-slate-600 max-w-[80vw] md:max-w-[30vw] mb-5">
                  {t("SubTitle.sub1")}
                </motion.p>
                <div className="flex gap-3 mb-8">
                  <div className="flex gap-1 items-center hover:-translate-y-2 transition-all duration-300">
                    <MdOutlinePersonOutline className="text-xl md:text-2xl " />
                    <p className="text-[#647067] font-bold text-sm md:text-base ">
                    {t("SubTitle.sub2")}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center hover:-translate-y-2 transition-all duration-300 ">
                    <IoHardwareChipOutline size={23} />
                    <p className="text-[#647067] font-bold text-sm md:text-base ">
                    {t("SubTitle.sub3")}
                    </p>
                  </div>
                </div>
                <div
                  className="rounded-2xl text-2xl bg-[#84CC16] px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_green] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none mb-3"
                >
                  <Link href="/sign-up">{t("Button.button1")}</Link>
                </div>
              </div>
              <motion.div className="right-Hero flex">
                <img
                  src="/Hero/MockUpDestop1.png"
                  alt="HeroImg"
                  className="w-full h-[522.29px] object-contain md:w-auto md:justify-center lg:h-[90vh] no-drag no-select rounded-3xl "
                />
              </motion.div>
            </div>
          </section>
        </RevealonScroll>
      )}
    </>
  );
};

export default Hero;
