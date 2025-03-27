import React from "react";
import { memo } from "react";

const PatientDetails = memo(({ patient }) => {
  if (!patient) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
        <img
          src={patient.profile_picture}
          alt={patient.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{patient.name}</h2>
          <p className="text-gray-600">Patient ID: {patient.id || "N/A"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Date of Birth */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <img src="./assets/BirthIcon.svg" alt="Birth Icon" className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Date of Birth</p>
              <p className="font-medium text-gray-900">{patient.date_of_birth || "N/A"}</p>
            </div>
          </div>

          {/* Gender */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <img
                src={patient.gender === "Male" ? "./assets/MaleIcon.svg" : "./assets/FemaleIcon.svg"}
                alt={`${patient.gender} Icon`}
                className="w-5 h-5"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              <p className="font-medium text-gray-900">{patient.gender || "N/A"}</p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <img src="./assets/PhoneIcon.svg" alt="Phone Icon" className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="font-medium text-gray-900">{patient.phone_number || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Emergency Contact */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <img src="./assets/PhoneIcon.svg" alt="Emergency Contact Icon" className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Emergency Contact</p>
              <p className="font-medium text-gray-900">{patient.emergency_contact || "N/A"}</p>
            </div>
          </div>

          {/* Insurance Provider */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <img src="./assets/InsuranceIcon.svg" alt="Insurance Icon" className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Insurance Provider</p>
              <p className="font-medium text-gray-900">{patient.insurance_type || "N/A"}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Visit</p>
              <p className="font-medium text-gray-900">{patient.last_visit || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PatientDetails;
