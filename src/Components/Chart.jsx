import React, { useEffect, useRef, useState } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const DiagnosisChart = ({ patientChart }) => {
  const patient = patientChart;
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [timeRange, setTimeRange] = useState(12);
  const [filteredData, setFilteredData] = useState([]);

  const [respiratoryRate, setRespiratoryRate] = useState(0);
  const [RespiratoryRateStatus, setRespiratoryRateStatus] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [tempStatus, settempStatus] = useState("");
  const [heartRate, setHeartRate] = useState(0);
  const [systolicVal, setSystolicVal] = useState(0);
  const [systolicStatus, setSystolicStatus] = useState("");
  const [disystolicVal, setDiystolicVal] = useState(0);
  const [disystolicStatus, setDiystolicStatus] = useState("");
  const [heartRateStatus, setHeartRateStatus] = useState("");

  useEffect(() => {
    if (!patient || !patient.diagnosis_history || !Array.isArray(patient.diagnosis_history)) {
      console.error("Invalid patient data:", patient);
      return;
    }

    const latestData = patient.diagnosis_history[patient.diagnosis_history.length - 1] || {};
    setRespiratoryRate(latestData.respiratory_rate?.value || 0);
    setRespiratoryRateStatus(latestData.respiratory_rate?.levels || "");
    setTemperature(latestData.temperature?.value || 0);
    settempStatus(latestData.temperature?.levels || "");
    setHeartRate(latestData.heart_rate?.value || 0);
    setHeartRateStatus(latestData.heart_rate?.levels || "");
    setSystolicVal(latestData.blood_pressure?.systolic?.value || 0);
    setSystolicStatus(latestData.blood_pressure?.systolic?.levels || "");
    setDiystolicVal(latestData.blood_pressure?.diastolic?.value || 0);
    setDiystolicStatus(latestData.blood_pressure?.diastolic?.levels || "");
  }, [patient]);

  useEffect(() => {
    if (!patient || !patient.diagnosis_history || !Array.isArray(patient.diagnosis_history)) return;

    const filtered = patient.diagnosis_history.slice(-timeRange);
    setFilteredData(filtered);

    const months = filtered.map((data) => data.month || "N/A");
    const systolic = filtered.map((data) => data.blood_pressure?.systolic?.value || 0);
    const diastolic = filtered.map((data) => data.blood_pressure?.diastolic?.value || 0);

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Systolic",
            data: systolic,
            borderColor: "#F43F5E",
            backgroundColor: "rgba(244, 63, 94, 0.2)",
            pointBackgroundColor: "#F43F5E",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
          {
            label: "Diastolic",
            data: diastolic,
            borderColor: "#A855F7",
            backgroundColor: "rgba(168, 85, 247, 0.2)",
            pointBackgroundColor: "#A855F7",
            borderWidth: 2,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            display: true, 
            position: "top",
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
            }
          },
        },
        scales: {
          x: { 
            title: { 
              display: true, 
              text: "Months",
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            grid: {
              display: false
            }
          },
          y: { 
            title: { 
              display: true, 
              text: "Blood Pressure (mmHg)",
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            min: 60,
            max: 180,
            grid: {
              color: "rgba(0, 0, 0, 0.05)"
            }
          },
        },
      },
    });
  }, [timeRange, patient]);

  const handleTimeRangeChange = (e) => {
    setTimeRange(parseInt(e.target.value, 10));
  };

  const InfoCard = ({ title, value, unit, status, icon, color }) => {
    return (
      <div className={`p-4 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md ${color}`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <img src={icon} alt={title} className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">{title}</h4>
            <p className="text-xl font-bold text-gray-900">{value} {unit}</p>
            <span className="text-xs text-gray-500">{status}</span>
          </div>
        </div>
      </div>
    );
  };

  const Card = ({ title, value, status, color, borderColor }) => {
    return (
      <div className={`bg-white rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md border-l-4 ${borderColor}`}>
        <div className="flex items-center space-x-2 mb-2">
          <span className={`w-2 h-2 rounded-full ${color}`}></span>
          <h4 className="text-sm font-medium text-gray-600">{title}</h4>
        </div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{status}</div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
        <h3 className="text-xl font-bold text-gray-900">Diagnosis Overview</h3>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value={6}>Last 6 Months</option>
          <option value={12}>Last 12 Months</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card
          title="Systolic"
          value={systolicVal}
          status={systolicStatus}
          color="bg-pink-500"
          borderColor="border-pink-500"
        />
        <Card
          title="Diastolic"
          value={disystolicVal}
          status={disystolicStatus}
          color="bg-purple-500"
          borderColor="border-purple-500"
        />
      </div>

      <div className="relative h-[300px] md:h-[400px] mb-6">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          title="Respiratory Rate"
          value={respiratoryRate}
          unit="bpm"
          status={RespiratoryRateStatus}
          icon="https://img.icons8.com/ios/50/lungs.png"
          color="bg-blue-50"
        />
        <InfoCard
          title="Temperature"
          value={temperature}
          unit="°F"
          status={tempStatus}
          icon="https://img.icons8.com/ios/50/thermometer.png"
          color="bg-red-50"
        />
        <InfoCard
          title="Heart Rate"
          value={heartRate}
          unit="bpm"
          status={heartRateStatus}
          icon="https://img.icons8.com/ios/50/heart-with-pulse.png"
          color="bg-pink-50"
        />
      </div>
    </div>
  );
};

export default DiagnosisChart;
