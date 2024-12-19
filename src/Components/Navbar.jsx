// Navbar.js
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="" src="./assets/TestLogo.svg" alt="Tech.Care Logo" />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-5 flex items-baseline space-x-4">
            <a href="#overview" className="flex items-center text-gray-900 hover:text-gray-700">
            <img src="./assets/Home.svg" alt="Home Icon" className="mr-2" />
                 Overview
            </a>

            <a href="#patient" className="flex items-center text-gray-900 hover:text-gray-700">
            <img src="./assets/Patient.svg" alt="Home Icon" className="mr-2" />
                 Patients
            </a>
            <a href="#shedule" className="flex items-center text-gray-900 hover:text-gray-700">
            <img src="./assets/Schedule.svg" alt="Home Icon" className="mr-2" />
                 Schedule
            </a>
            <a href="#overview" className="flex items-center text-gray-900 hover:text-gray-700">
            <img src="./assets/Message.svg" alt="Home Icon" className="mr-2" />
                 Message
            </a>
            <a href="#overview" className="flex items-center text-gray-900 hover:text-gray-700">
            <img src="./assets/Transaction.svg" alt="Home Icon" className="mr-2" />
                 Transaction
            </a>
            
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#overview" className="block text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"><img src="./assets/Home.svg" alt="" />Overview</a>
            <a href="#patients" className="block bg-green-500 text-white px-3 py-2 rounded-md text-base font-medium">Patients</a>
            <a href="#schedule" className="block text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium">Schedule</a>
            <a href="#message" className="block text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium">Message</a>
            <a href="#transactions" className="block text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium">Transactions</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
