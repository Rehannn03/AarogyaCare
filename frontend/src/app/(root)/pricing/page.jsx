// components/PricingSection.js
export default function page() {
  return (
    <section className="relative pt-28 pb-36 bg-white overflow-hidden">
      <div className="relative z-10 container px-4 mx-auto">
        <h2 className="mb-6 text-6xl md:text-8xl xl:text-10xl font-bold tracking-tight leading-none text-center mx-auto">
          Choose Your Plan
        </h2>
        <p className="mb-20 text-lg text-gray-900 text-center font-medium leading-normal md:max-w-lg mx-auto">
          Simplify your healthcare experience with our telemedicine solutions.
          Select the plan that best fits your needs and start accessing quality
          care from anywhere.
        </p>
        <div className="md:max-w-4xl mx-auto">
          <div className="flex flex-wrap -m-5">
            <div className="w-full md:w-1/2 p-5">
              <div
                className="bg-white bg-opacity-90 border border-gray-200 rounded-4xl shadow-xl"
                style={{ backdropFilter: "blur(46px)" }}
              >
                <div className="border-b border-gray-200">
                  <div className="py-7 px-9">
                    <h3 className="mb-3 text-xl text-gray-900 font-bold leading-snug">
                      Basic
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      Ideal for individuals who need essential telemedicine
                      services.
                    </p>
                  </div>
                </div>
                <div className="pt-8 pb-9 px-9">
                  <p className="mb-6 text-gray-600 font-medium leading-relaxed">
                    Features included:
                  </p>
                  <ul className="mb-11">
                    <li className="mb-4 flex items-center">
                      <svg
                        className="mr-2"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                          stroke="#4F46E5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-semibold leading-normal">
                        Telemedicine Consultations
                      </p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <svg
                        className="mr-2"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                          stroke="#4F46E5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-semibold leading-normal">
                        Upload and Access Reports
                      </p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <svg
                        className="mr-2"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                          stroke="#4F46E5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-semibold leading-normal">
                        Book Appointments Online
                      </p>
                    </li>
                  </ul>
                  <p className="mb-6 text-xl text-gray-500 font-semibold leading-normal">
                    <span>Starting from </span>
                    <span className="text-gray-900">$29/mo</span>
                  </p>
                  <div className="md:inline-block">
                    <button
                      className="py-4 px-10 w-full text-white font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 transition ease-in-out duration-200"
                      type="button"
                    >
                      Start 14 days free trial
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-5">
              <div
                className="bg-white bg-opacity-90 border border-gray-200 rounded-4xl shadow-xl"
                style={{ backdropFilter: "blur(46px)" }}
              >
                <div className="border-b border-gray-200">
                  <div className="py-7 px-9">
                    <h3 className="mb-3 text-xl text-gray-900 font-bold leading-snug">
                      Premium
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      For those who need advanced features and priority support.
                    </p>
                  </div>
                </div>
                <div className="pt-8 pb-9 px-9">
                  <p className="mb-6 text-gray-600 font-medium leading-relaxed">
                    Features included:
                  </p>
                  <ul className="mb-11">
                    <li className="mb-4 flex items-center">
                      <svg
                        className="mr-2"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                          stroke="#4F46E5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-semibold leading-normal">
                        Unlimited Telemedicine Consultations
                      </p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <svg
                        className="mr-2"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                          stroke="#4F46E5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-semibold leading-normal">
                        Upload and Access Reports with Advanced Analytics
                      </p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <svg
                        className="mr-2"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 10L9.16667 11.6667L12.5 8.33333M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                          stroke="#4F46E5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-semibold leading-normal">
                        Priority Booking and Support
                      </p>
                    </li>
                  </ul>
                  <p className="mb-6 text-xl text-gray-500 font-semibold leading-normal">
                    <span>Starting from </span>
                    <span className="text-gray-900">$149/mo</span>
                  </p>
                  <div className="md:inline-block">
                    <button
                      className="py-4 px-10 w-full text-white font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 transition ease-in-out duration-200"
                      type="button"
                    >
                      Start 14 days free trial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full py-64 bg-indigo-600"></div>
    </section>
  );
}
