"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "../ui/button";
import { useTranslations } from 'next-intl';  // Import useTranslations from next-intl

const Benefits = () => {
  const t = useTranslations("Benefits");  // Hook to access the translations

  const benefits = [
    {
      title: t('cuttingEdgeTitle'),
      description: t('cuttingEdgeDescription'),
      icon: "💡",
    },
    {
      title: t('convenienceTitle'),
      description: t('convenienceDescription'),
      icon: "📱",
    },
    {
      title: t('personalizedTitle'),
      description: t('personalizedDescription'),
      icon: "➕",
    },
    {
      title: t('efficientBookingTitle'),
      description: t('efficientBookingDescription'),
      icon: "📅",
    },
    {
      title: t('secureTitle'),
      description: t('secureDescription'),
      icon: "🔒",
    },
    {
      title: t('healthcareEcosystemTitle'),
      description: t('healthcareEcosystemDescription'),
      icon: "🌐",
    },
  ];

  const [visibleBenefits, setVisibleBenefits] = useState(3);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setVisibleBenefits(showAll ? 3 : benefits.length);
    setShowAll(!showAll);
  };

  return (
    <section className="px-4 sm:px-8 lg:px-16 font-title bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="rounded-[5vw] bg-[#6c63ff] p-8"
      >
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm font-semibold text-white uppercase tracking-wider"
          >
            <Button className="outline hover:bg-[#7882D4] hover:text-white mb-4" variant="ghost">{t('benefitsSectionTitle')}</Button>
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl font-bold text-white"
          >
            {t('benefitsHeading')}
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {benefits.slice(0, visibleBenefits).map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.005 }}
              whileHover={{ scale: 1.08 }}
              className="bg-white p-6 rounded-[5vw] shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center mb-4 pl-8 pt-8">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl"
                >
                  {benefit.icon}
                </motion.div>
              </div>
              <div className="p-8 pt-5">
                <h3 className="text-2xl font-extrabold text-slate-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-xl">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle}
            className="flex items-center justify-center font-bold text-lg px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors mb-8 "
          >
            {showAll ? t('showLessBenefits') : t('seeAllBenefits')}
            <FaArrowRight className="ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Benefits;
