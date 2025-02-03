import React from "react";

const Features = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Features</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Feature Card 1 */}
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Comprehensive Dashboard</h2>
          <p className="text-gray-600">Get a complete overview of your data and key metrics at a glance. Our dashboard provides a user-friendly interface to manage all aspects of your medical practice efficiently.</p>
        </div>
        {/* Feature Card 2 */}
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">User-Friendly Interface</h2>
          <p className="text-gray-600">Navigate with ease through a clean and organized interface designed for efficiency. Our platform ensures you spend less time learning and more time doing.</p>
        </div>
        {/* Feature Card 3 */}
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Seamless Integration</h2>
          <p className="text-gray-600">Integrate effortlessly with other medical systems and tools to enhance functionality. Our system is designed to work smoothly with existing infrastructure.</p>
        </div>
        {/* Feature Card 4 */}
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Appointment Scheduling</h2>
          <p className="text-gray-600">Manage and schedule appointments easily with real-time updates. Our scheduling feature helps you keep track of appointments and avoid conflicts.</p>
        </div>
        {/* Feature Card 5 */}
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Real-Time Notifications</h2>
          <p className="text-gray-600">Receive instant alerts and reminders for appointments and important updates. Stay informed with notifications that keep you on top of your schedule.</p>
        </div>
        {/* Feature Card 6 */}
        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Patient & Doctor Profiles</h2>
          <p className="text-gray-600">Access detailed profiles and medical history to make informed decisions. Our profile system provides a comprehensive view of patient and doctor information.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
