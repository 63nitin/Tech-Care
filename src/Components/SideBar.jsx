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
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
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
    <div className="flex flex-col md:flex-row min-h-screen pt-16">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block bg-white w-full md:w-64 h-auto md:h-screen p-4 shadow-lg overflow-y-auto transition-all duration-300 ease-in-out`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Patients</h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-2">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPatient(patient)}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedPatient?.name === patient.name 
                      ? "bg-blue-50 border-2 border-blue-500" 
                      : "bg-white hover:bg-gray-50 border-2 border-transparent"
                  }`}
                >
                  <img
                    src={patient.profile_picture}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">
                      {patient.gender}, {patient.age}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No patients found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden mb-4 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {selectedPatient ? (
          <div className="space-y-6">
            <PatientDetails patient={selectedPatient} />
            <DiagnosisChart patientChart={selectedPatient} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <DiagnosticTable data={selectedPatient.diagnostic_list} />
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <LabResults data={selectedPatient.lab_results} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Select a patient to view their details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
