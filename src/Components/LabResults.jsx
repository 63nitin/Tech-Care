import React from 'react';

const LabResults = ({ data }) => {

    const LabData = Array.isArray(data) ? data : [];
    console.log(LabData)

    if (LabData.length === 0) {
      return (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Diagnostic List</h2>
          <p className="text-gray-500">No data available</p>
        </div>
      );
    }

    return (
      <div className="bg-white shadow-md rounded-md p-4 max-h-80 overflow-y-scroll">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Lab Results</h2>
        </div>
        <ul>
          {LabData.map((item, index) => (
            <li key={index} className="flex overflow-y-auto max-h-[140px] w-full items-center justify-between py-2 border-b border-gray-200">
              <div className="flex items-center">
                <span className="text-gray-900">{item}</span>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m4-4H8" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default LabResults;
