"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import RevealonScroll from "../../RevealonScroll";
import { FaArrowRight } from "react-icons/fa";
import { StetoScope } from "./icons/StetoScope";

const Services = () => {
  const  t  = useTranslations("Services");

  const services = [
    {
      number: "01",
      title: t("intelligent_virtual_consultations"),
      description: t("intelligent_virtual_consultations_desc"),
      icon: <StetoScope />,
    },
    {
      number: "02",
      title: t("intuitive_appointment_booking"),
      description: t("intuitive_appointment_booking_desc"),
      icon: <StetoScope />,
    },
    {
      number: "03",
      title: t("patient_records_management"),
      description: t("patient_records_management_desc"),
      icon: "",
    },
    {
      number: "04",
      title: t("ai_telehealth_chatbot"),
      description: t("ai_telehealth_chatbot_desc"),
      icon: "<icon1/>",
    },
    {
      number: "05",
      title: t("remote_health_monitoring"),
      description: t("remote_health_monitoring_desc"),
      icon: "📊",
    },
    {
      number: "06",
      title: t("ai_powered_diagnosis_assistance"),
      description: t("ai_powered_diagnosis_assistance_desc"),
      icon: "🧬",
    },
  ];

  const [visibleServices, setVisibleServices] = useState(4);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setVisibleServices(showAll ? 4 : services.length);
    setShowAll(!showAll);
  };

  return (
    <RevealonScroll>
      <section className="py-12 px-4 sm:px-8 lg:px-16 font-title bg-white">
        <div className="rounded-[5vw] bg-gray-100 p-[5%]">
          <div className="text-center mb-8">
            <h2 className="text-[8vh] font-bold text-slate-800 mb-2">
              {t("our_services")}
            </h2>
            <p className="text-gray-600 text-[2.5vh]">
              {t("description")}
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ staggerChildren: 0.2 }}
            className="flex flex-col space-y-4 items-center"
          >
            {services.slice(0, visibleServices).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.0005 }}
                whileHover={{ scale: 1.08 }}
                className="flex flex-wrap items-center md:justify-between bg-white shadow-md p-8 hover:scale-105 transition-all duration-200 w-3/4 rounded-3xl xl:rounded-full gap-3 cursor-pointer"
              >
                <div className="text-2xl block md:flex font-bold text-gray-500 mr-4 flex-row">
                  {service.number}
                </div>

                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center md:justify-center justify-end text-[2.5vh] gap-4">
                  {service.icon}
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-xl text-gray-600">{service.description}</p>
                </div>

                <div className="justify-end">
                  <FaArrowRight />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <button
              onClick={handleToggle}
              className="font-extrabold text-xl px-8 py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
            >
              {showAll ? t("show_less") : t("see_all")} →
            </button>
          </div>
        </div>
      </section>
    </RevealonScroll>
  );
};

export default Services;
