import React from "react";
import { Button } from "../ui/button";
import { HiOutlineDownload } from "react-icons/hi";
import RevealonScroll from '../../RevealonScroll'
import { motion } from "framer-motion";

const CoreFeatures = () => {
  const features = [
    {
      id: 1,
      featureNumber: "Feature #1",
      title: (
        <>
          Intelligent <br className="hidden lg:block" />
          Health Metrics <br className="hidden lg:block" />
          For All
        </>
      ),
      description:
        "Our platform employs state-of-the-art algorithms and machine learning to assist healthcare professionals in accurate diagnosis and treatment planning.",
      stats: [
        { value: "120", suffix: "%", label: "More Efficient" },
        { value: "154.8", suffix: "M", label: "Patients Saved" },
      ],
      imageSrc: "https://i.ibb.co/DRWKYnb/Logo-Pillow.png",
      buttonText: "Download The App",
    },
    // Add more feature objects if needed
  ];

  return (
    <RevealonScroll>
    <section className="xl:px-48 lg:px-2  sm:px-8 mt-8 font-title bg-white">
      <div className="">
        <h2 className="font-title text-center lg:text-6xl text-4xl font-bold text-gray-800 mb-12">
          Our Core Features
        </h2>
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-44 gap-5 items-center px-7 lg:mb-32 mb-16 ">
          {/* Image */}
          <div className="order-1 md:order-2">
            <motion.img
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.2, delay:0.0005 }}
             whileHover={{ scale: 1.08,rotate:5 }}
              src="https://i.ibb.co/DRWKYnb/Logo-Pillow.png"
              alt="Logo-Pillow"
              className="w-full h-auto object-cover rotate-12  "
            />
          </div>

          {/* Text Content */}
          <div className="order-2 md:order-1">
            <Button className="outline" variant="ghost">
              Feature #1
            </Button>
            <h1 className="font-extrabold md:text-5xl text-3xl font-title mt-7 mb-6 justify-center items-center">
              Intelligent <br className="hidden lg:block"/>Health Metrics <br className="hidden lg:block" />For All
            </h1>
            <p className="mb:text-xl text-xl mb-6 text-[#647067]">
              Our platform employs state-of-the-art algorithms and machine
              learning to assist healthcare professionals in accurate diagnosis
              and treatment planning.
            </p>
            <div className="flex">
              <div className="flex flex-col font-title mr-28">
                <h1 className="text-3xl font-extrabold">
                  120<span className="text-red-600">%</span>
                </h1>
                <p>More Efficient</p>
              </div>
              <div className="flex flex-col font-title">
                <h1 className="text-3xl font-extrabold">
                  154.8<span className="text-red-600">M</span>
                </h1>
                <p>Patients Saved</p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-start items-center mt-10 ">
              <button className="px-8 py-5 bg-[#313A34] text-white font-title font-extrabold text-xl flex gap-2 rounded-full ">Download The App <HiOutlineDownload size={30} /></button>
            </div>
          </div>
        </div>

        {/* * ! 2nd Feature */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-44 gap-5 items-center px-7">
          {/* Image */}
          <div className="">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay:0.0005 }}
              whileHover={{ scale: 1.08,rotate:-5 }}
              src="https://i.ibb.co/6wfyKLd/Telehealth-AIChatbot.png"
              alt="Logo-Pillow"
              className="w-full h-auto object-cover lg:-rotate-45- "
            />
          </div>

          {/* Text Content */}
          <div className="">
            <Button className="outline" variant="ghost">
              Feature #2
            </Button>
            <h1 className="font-extrabold md:text-5xl text-3xl font-title mt-7 mb-6 justify-center items-center">
            Telehealth AI  <br className="hidden lg:block"/>Chatbot 
            </h1>
            <p className="mb:text-xl text-xl mb-6 text-[#647067]">
            With MedTech, patients can schedule telehealth consultations with qualified healthcare providers. Whether you're seeking routine check-ups, specialist opinions, or mental health support.
            </p>
            <div className="flex">
              <div className="flex flex-col font-title mr-28">
                <h1 className="text-3xl font-extrabold">
                  120<span className="text-red-600">%</span>
                </h1>
                <p>More Efficient</p>
              </div>
              <div className="flex flex-col font-title">
                <h1 className="text-3xl font-extrabold">
                  154.8<span className="text-red-600">M</span>
                </h1>
                <p>Patients Saved</p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-start items-center mt-10 ">
              <button className="px-8 py-5 bg-[#313A34] text-white font-title font-extrabold text-xl flex gap-2 rounded-full ">Download The App <HiOutlineDownload size={30} /></button>
            </div>
          </div>
        </div>

        {/* 3rd Feature */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-44 gap-5 items-center px-7 lg:mb-32 mb-16 ">
          {/* Image */}
          <div className="order-1 md:order-2">
            <motion.img
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.2, delay:0.0005 }}
             whileHover={{ scale: 1.08,rotate:5 }}
              src="https://i.ibb.co/DRWKYnb/Logo-Pillow.png"
              alt="Logo-Pillow"
              className="w-full h-auto object-cover rotate-12  "
            />
          </div>

          {/* Text Content */}
          <div className="order-2 md:order-1">
            <Button className="outline" variant="ghost">
              Feature #1
            </Button>
            <h1 className="font-extrabold md:text-5xl text-3xl font-title mt-7 mb-6 justify-center items-center">
              Intelligent <br className="hidden lg:block"/>Health Metrics <br className="hidden lg:block" />For All
            </h1>
            <p className="mb:text-xl text-xl mb-6 text-[#647067]">
              Our platform employs state-of-the-art algorithms and machine
              learning to assist healthcare professionals in accurate diagnosis
              and treatment planning.
            </p>
            <div className="flex">
              <div className="flex flex-col font-title mr-28">
                <h1 className="text-3xl font-extrabold">
                  120<span className="text-red-600">%</span>
                </h1>
                <p>More Efficient</p>
              </div>
              <div className="flex flex-col font-title">
                <h1 className="text-3xl font-extrabold">
                  154.8<span className="text-red-600">M</span>
                </h1>
                <p>Patients Saved</p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-start items-center mt-10 ">
              <button className="px-8 py-5 bg-[#313A34] text-white font-title font-extrabold text-xl flex gap-2 rounded-full ">Download The App <HiOutlineDownload size={30} /></button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
    </RevealonScroll>
  );
};

export default CoreFeatures;




          //     {/* Paragraphs */}
          //     <Button className=" outline" variant="ghost">Feature #1</Button>
          //     <div className="w-[40%]">
          //       <h1 className=" font-extrabold md:text-5xl text-3xl font-title mt-7 mb-6">
          //       Intelligent Health Metrics For All
          //       </h1>
          //       <div>
          //       <p className="mb:text-xl text-xl mb-6 text-[#647067]">
          //       Our platform employs state-of-the-art algorithms and machine learning to assist healthcare professionals in accurate diagnosis and treatment planning.
          //       </p>
          //       </div>
          //       <div className="flex">
          //         <div className="flex flex-col font-title mr-28">
          //           <h1 className="text-3xl font-extrabold ">120<span className="text-red-600">%</span>
          //           </h1>
          //           <p>More Efficent</p>
          //         </div>
          //         <div className="flex flex-col font-title">
          //           <h1 className="text-3xl font-extrabold ">120<span className="text-red-600">%</span>
          //           </h1>
          //           <p>More Efficent</p>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          //   <div className="mb-6 w-45% h-full" >
          //   <img src="https://i.ibb.co/DRWKYnb/Logo-Pillow.png" alt="Logo-Pillow" border="0" className="object-cover"/>
          //   </div>
          // </div>