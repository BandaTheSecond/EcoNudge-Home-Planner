import React, { useState } from "react";
import { getAINudge } from "../api/api";

const NudgeCard = ({ title, description, category }) => {
  const [aiNudge, setAiNudge] = useState(null);
  const [loading, setLoading] = useState(false);

  const impactColors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  const handleGetAINudge = async () => {
    setLoading(true);
    try {
      const response = await getAINudge(`Give me a personalized eco-friendly tip related to: ${title}`);
      setAiNudge(response.nudge);
    } catch (error) {
      console.error("Error fetching AI nudge:", error);
      setAiNudge("Unable to generate AI nudge. Please check API configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      <span
        className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
          impactColors[category] || "bg-gray-100 text-gray-700"
        }`}
      >
        {category} Impact
      </span>
      <button
        onClick={handleGetAINudge}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
      >
        {loading ? "Generating..." : "Get AI Tip"}
      </button>
      {aiNudge && (
        <p className="mt-3 text-sm text-gray-600 italic">{aiNudge}</p>
      )}
    </div>
  );
};

export default NudgeCard;
