import React from "react";

const NudgeCard = ({ title, impact }) => {
  const impactColors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <span
        className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
          impactColors[impact] || "bg-gray-100 text-gray-700"
        }`}
      >
        {impact} Impact
      </span>
    </div>
  );
};

export default NudgeCard;
