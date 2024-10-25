"use client"
import React, { useEffect } from 'react';
import { IoHardwareChipOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { motion } from 'framer-motion';

// const fadeIn = {
//   hidden: {
//     opacity: 0,
//     y: 100,
//   },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.3, // Delay between children animations
//       duration: 1,
//     },
//   },
// };

const Hero = () => {
  // useEffect(() => {
  //   // Disable scrolling during animation
  //   document.body.style.overflow = 'hidden';

  //   // Re-enable scrolling after 1.5 seconds (time for the animation to complete)
  //   const timer = setTimeout(() => {
  //     document.body.style.overflow = 'auto';
  //   }, 1500); // Set the duration according to your animation timing

  //   return () => {
  //     clearTimeout(timer);
  //     document.body.style.overflow = 'auto'; // Ensure scroll is re-enabled when component unmounts
  //   };
  // }, []);

  return (
    <section className='bg-white font-title'>
      <motion.div drag className='h-10 w-10 bg-green-600 rounded-full absolute'></motion.div>
      <div className='flex flex-col md:flex-row justify-around'>
        <div className='left-Hero flex flex-col max-w-full justify-center items-center'>
          <h1
            // variants={fadeIn}
            // initial="hidden"
            // animate="show"
            className='text-4xl flex flex-col md:text-[4.5vw] leading-[1.1em] font-extrabold text-slate-800 p-6 tracking-tight text-center'
          >
            <span>Where AI Meets</span> <span>Telehealth &</span> <span>Telemedicine<span  className='text-[#84CC16]'>.</span></span>
          </h1>
          <motion.p
            // variants={fadeIn}
            // initial="hidden"
            // animate="show"
            className='text-[1rem] md:text-2.5rem lg:text-[1.4rem] text-center text-slate-600 max-w-[80vw] md:max-w-[30vw] mb-5'
          >
            We're pioneering the future of healthcare with cutting-edge telehealth and telemedicine solutions.
          </motion.p>
          <div className='flex gap-3 mb-8'>
            <div className='flex gap-1 items-center hover:-translate-y-2 transition-all duration-300'>
              <MdOutlinePersonOutline className='text-xl md:text-2xl ' />
              <p className='text-[#647067] font-bold text-sm md:text-base '>Trusted By 2.5M+</p>
            </div>
            <div className='flex gap-1 items-center hover:-translate-y-2 transition-all duration-300 '>
              <IoHardwareChipOutline size={23} />
              <p className='text-[#647067] font-bold text-sm md:text-base '>AI/ML Technology</p>
            </div>
          </div>
          <div className='rounded-2xl 
         text-2xl  bg-[#84CC16] px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_green] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none'>
            Get Started
          </div>
        </div>
        <motion.div
          // variants={fadeIn}
          // initial="hidden" 
          // animate="show"
          className='right-Hero flex'
        >
          <img src="/Hero/MockUpDestop1.png" alt="HeroImg" className='w-full h-[522.29px] object-contain md:w-auto md:justify-center lg:h-[90vh]' />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
