import React, { useEffect, useState } from "react";
import PatientDetails from "./PatientDetail"; // Import the details component
import DiagnosticTable from "./DiagnosticTable";
import DiagnosisChart from "./Chart.jsx";
import LabResults from "./LabResults.jsx";

const Sidebar = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(0); // State for selected patient
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const username = "coalition";
        const password = "skills-test";
        const encodedCredentials = btoa(`${username}:${password}`);
        const response = await fetch(
          "https://fedskillstest.coalitiontechnologies.workers.dev/",
          {
            headers: {
              Authorization: `Basic ${encodedCredentials}`,
              "Content-Type": "application/json",
            },
          }
        );
        

        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        const patientsData = Array.isArray(data) ? data : data.patients;
        setPatients(patientsData || []);
        setFilteredPatients(patientsData || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  
  
  // Filter patients based on the search term
  useEffect(() => {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);
  
  return (
    <div className="flex flex-row">
      {/* Sidebar */}
      <div className="bg-gray-100 w-64 h-screen p-4 shadow-md overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Patients</h2>

        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="space-y-4">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPatient(patient)} // Set selected patient on click
                  className={`flex items-center space-x-4 p-3 bg-white rounded-lg shadow hover:bg-blue-100 transition cursor-pointer ${
                    selectedPatient?.name === patient.name ? "bg-blue-200" : ""
                  }`}
                >
                  <img
                    src={patient.profile_picture}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-600">
                      {patient.gender}, {patient.age}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No patients found.</p>
            )}
          </div>
        )}
      </div>

      {/* Patient Details // Chart */}
      <div className="flex-2 p-2">
        {selectedPatient ? (
          <PatientDetails patient={selectedPatient} />
        ) : (
          <p>Select a patient to view their details.</p>
        )}
        
        {  <DiagnosisChart patientChart={selectedPatient} />}     
      </div>
      {/* TestList */}
      <div className="absolute flex mt-[32%] ml-[20%] justify-between w-full p-4">
  <div className="w-1/2">
    <DiagnosticTable data={selectedPatient.diagnostic_list} />
  </div>
  <div className="w-1/2">
    <LabResults data={selectedPatient.lab_results} />
  </div>
</div>

   </div>

  );
};

export default Sidebar;
