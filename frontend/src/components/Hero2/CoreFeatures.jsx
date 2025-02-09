import React from "react";
import { Button } from "../ui/button";
import { HiOutlineDownload } from "react-icons/hi";
import RevealonScroll from '../../RevealonScroll';
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

const CoreFeatures = () => {
  const t = useTranslations("Corefeature");  // hook to get translations

  return (
    <RevealonScroll>
      <section className="xl:px-48 lg:px-2 sm:px-8 mt-8 font-title bg-white">
        <div>
          <h2 className="font-title text-center lg:text-6xl text-4xl font-bold text-gray-800 mb-12">
            {t('coreFeaturesSectionTitle')}
          </h2>
          <div>
            {/* Feature 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-44 gap-5 items-center px-7 lg:mb-11 mb-16">
              <div className="order-1 md:order-2">
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.0005 }}
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  src="https://i.ibb.co/DRWKYnb/Logo-Pillow.png"
                  alt="Logo-Pillow"
                  className="w-full h-auto object-cover rotate-12"
                />
              </div>

              <div className="order-2 md:order-1">
                <Button className="outline" variant="ghost">
                  {t('feature1Button')}
                </Button>
                <h1 className="font-extrabold md:text-5xl text-3xl font-title mt-7 mb-6 justify-center items-center">
                  {t('feature1Title')}
                </h1>
                <p className="mb:text-xl text-xl mb-6 text-[#647067]">
                  {t('feature1Description')}
                </p>
                <div className="flex">
                  <div className="flex flex-col font-title mr-28">
                    <h1 className="text-3xl font-extrabold">
                      120<span className="text-red-600">%</span>
                    </h1>
                    <p>{t('feature1MoreEfficient')}</p>
                  </div>
                  <div className="flex flex-col font-title">
                    <h1 className="text-3xl font-extrabold">
                      154.8<span className="text-red-600">M</span>
                    </h1>
                    <p>{t('feature1PatientsSaved')}</p>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-start items-center mt-10">
                  <button className="px-8 py-5 bg-[#313A34] text-white font-title font-extrabold text-xl flex gap-2 rounded-full">
                    {t('downloadAppButton')} <HiOutlineDownload size={30} />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-44 gap-5 items-center px-7">
              <div>
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.0005 }}
                  whileHover={{ scale: 1.08, rotate: -5 }}
                  src="https://i.ibb.co/6wfyKLd/Telehealth-AIChatbot.png"
                  alt="Logo-Pillow"
                  className="w-full h-auto object-cover lg:-rotate-45"
                />
              </div>

              <div>
                <Button className="outline" variant="ghost">
                  {t('feature2Button')}
                </Button>
                <h1 className="font-extrabold md:text-5xl text-3xl font-title mt-7 mb-6 justify-center items-center">
                  {t('feature2Title')}
                </h1>
                <p className="mb:text-xl text-xl mb-6 text-[#647067]">
                  {t('feature2Description')}
                </p>
                <div className="flex">
                  <div className="flex flex-col font-title mr-28">
                    <h1 className="text-3xl font-extrabold">
                      120<span className="text-red-600">%</span>
                    </h1>
                    <p>{t('feature2MoreEfficient')}</p>
                  </div>
                  <div className="flex flex-col font-title">
                    <h1 className="text-3xl font-extrabold">
                      154.8<span className="text-red-600">M</span>
                    </h1>
                    <p>{t('feature2PatientsSaved')}</p>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-start items-center mt-10">
                  <button className="px-8 py-5 bg-[#313A34] text-white font-title font-extrabold text-xl flex gap-2 rounded-full">
                    {t('downloadAppButton')} <HiOutlineDownload size={30} />
                  </button>
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
