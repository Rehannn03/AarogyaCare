"use client"
import { motion } from 'framer-motion';

const Speciality = () => {
  const specialities = [
    { name: 'General physician', icon: '🩺' },
    { name: 'Gynecologist', icon: '🤰' },
    { name: 'Dermatologist', icon: '💆‍♀️' },
    { name: 'Pediatricians', icon: '👶' },
    { name: 'Neurologist', icon: '🧠' },
    { name: 'Gastroenterologist', icon: '🍽️' },
  ];

  return (
    <section className="py-12   px-4 sm:px-8 lg:px-16 font-title">
        <div className='rounded-[5vw] bg-gray-200 p-[5%]'>
      <div className="text-center  ">
        <h2 className="text-[8vh] font-bold text-slate-800 mb-2 ">Find by Speciality</h2>
        <p className="text-gray-600 mb-16 text-[2.5vh] ">
          Simply browse through our extensive list of trusted doctors, schedule your
          appointment hassle-free.
        </p>
      </div>

      <motion.div drag className="flex flex-wrap justify-center gap-8 ">
        {specialities.map((speciality, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-2 pb-[30px] hover:-translate-y-5 hover:border-indigo-500 transition-all duration-300 hover:border-b-4 cursor-pointer">
            {/* Use actual icons/images here */}
            <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center text-[5vh] ">
              {speciality.icon}
            </div>
            <p className="text-gray-800 font-semibold text-[120%]">{speciality.name}</p>
          </div>
        ))}
      </motion.div>
      </div>
    </section>
  );
};

export default Speciality;
