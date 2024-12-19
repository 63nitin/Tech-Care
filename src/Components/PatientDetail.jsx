import React from "react";
import DiagnosisChart from "./Chart.jsx";
import { memo } from "react";

const PatientDetails = memo(({ patient }) => {
  console.log(patient);
  return (
    <div>
      <div className="p-2 bg-white rounded-lg absolute right-36 shadow-md">
        <div className=" items-center space-x-4 mb-1">
          <img
            src={patient.profile_picture}
            alt={patient.name}
            className="w-20 h-20  rounded-full object-cover"
          />
          <div>
            <h2 className=" font-bold">{patient.name}</h2>
          </div>
        </div>
        <div>

          {/* // Date of Birth */}
          <p>
            <strong className="flex items-center">
              <span>
                <img src="./assets/BirthIcon.svg" alt="Birth Icon" />
              </span>
              Date of Birth:
            </strong>
            <span className="ml-6">{patient.date_of_birth || "N/A"}</span>
          </p>

         {/* // Gender */}
          <p>
            <strong className="flex items-center">
              <span>
                <img
                  src={
                    patient.gender === "Male"
                      ? "./assets/MaleIcon.svg"
                      : "./assets/FemaleIcon.svg"
                  }
                  alt={patient.gender === "Male" ? "Male Icon" : "Female Icon"}
                />
              </span>
              Gender:
            </strong>{" "}
            <span className="ml-6">{patient.gender || "N/A"}</span>
          </p>

          {/* // Phone_Number */}
          <p>
            <strong className="flex items-center">
              <span>
                <img src="./assets/PhoneIcon.svg" alt="Birth Icon" />
              </span>
              Phone Number:
            </strong>
            <span className="ml-6">{patient.phone_number || "N/A"}</span>
          </p>

          {/* Emergency Contact */}
          <p>
            <strong className="flex items-center">
              <span>
                <img src="./assets/PhoneIcon.svg" alt="Birth Icon" />
              </span>
              Emergency Contact :
            </strong>
            <span className="ml-6">{patient.emergency_contact || "N/A"}</span>
          </p>
           
           {/* Insurance provider */}
           <p>
            <strong className="flex items-center">
              <span>
                <img src="./assets/InsuranceIcon.svg" alt="Birth Icon" />
              </span>
              Insurance Provider :
            </strong>
            <span className="ml-6">{patient.insurance_type|| "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
});

export default PatientDetails;
