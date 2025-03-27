// Navbar.js
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-auto" src="./assets/TestLogo.svg" alt="Tech.Care Logo" />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={toggleMenu} 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#overview" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                <img src="./assets/Home.svg" alt="Home Icon" className="w-5 h-5 mr-2" />
                Overview
              </a>
              <a href="#patient" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                <img src="./assets/Patient.svg" alt="Patient Icon" className="w-5 h-5 mr-2" />
                Patients
              </a>
              <a href="#shedule" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                <img src="./assets/Schedule.svg" alt="Schedule Icon" className="w-5 h-5 mr-2" />
                Schedule
              </a>
              <a href="#message" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                <img src="./assets/Message.svg" alt="Message Icon" className="w-5 h-5 mr-2" />
                Message
              </a>
              <a href="#transaction" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
                <img src="./assets/Transaction.svg" alt="Transaction Icon" className="w-5 h-5 mr-2" />
                Transaction
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <a href="#overview" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">
            <img src="./assets/Home.svg" alt="Home Icon" className="w-5 h-5 mr-2" />
            Overview
          </a>
          <a href="#patients" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">
            <img src="./assets/Patient.svg" alt="Patient Icon" className="w-5 h-5 mr-2" />
            Patients
          </a>
          <a href="#schedule" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">
            <img src="./assets/Schedule.svg" alt="Schedule Icon" className="w-5 h-5 mr-2" />
            Schedule
          </a>
          <a href="#message" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">
            <img src="./assets/Message.svg" alt="Message Icon" className="w-5 h-5 mr-2" />
            Message
          </a>
          <a href="#transactions" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">
            <img src="./assets/Transaction.svg" alt="Transaction Icon" className="w-5 h-5 mr-2" />
            Transactions
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
