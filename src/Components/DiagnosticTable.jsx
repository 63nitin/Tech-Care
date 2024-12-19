import React from "react";

const DiagnosticTable = ({ data }) => {
  // Ensure 'data' is an array or convert it into one
  const tableData = Array.isArray(data) ? data : [];

  if (tableData.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Diagnostic List</h2>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Diagnostic List</h2>
      {/* Scrollable Container for Body */}
      <div className="overflow-y-auto max-h-[140px] w-full"> {/* Set height to show only 2 rows */}
        <table className="min-w-full border border-gray-200 rounded-md">
          <thead className="sticky top-0 bg-white"> {/* Sticky header */}
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Problem/Diagnosis</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Description</th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">{item.name || "N/A"}</td>
                <td className="px-4 py-2 text-gray-600">{item.description || "N/A"}</td>
                <td className="px-4 py-2 text-gray-800">{item.status || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosticTable;
