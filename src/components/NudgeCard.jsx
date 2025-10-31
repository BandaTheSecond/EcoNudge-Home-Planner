import React, { useState } from "react";
import { getAINudge } from "../api/api";

const NudgeCard = ({ title, description, category }) => {
  const [aiNudge, setAiNudge] = useState(null);
  const [loading, setLoading] = useState(false);

  const impactColors = {
    Low: "bg-green-100 text-green-700 border border-green-300",
    Medium: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    High: "bg-red-100 text-red-700 border border-red-300",
  };

  const handleGetAINudge = async () => {
    setLoading(true);
    try {
      const response = await getAINudge(
        `Give me a personalized eco-friendly tip related to: ${title}`
      );
      setAiNudge(response.nudge);
    } catch (error) {
      console.error("Error fetching AI nudge:", error);
      setAiNudge(
        "⚠️ Unable to generate AI nudge. Please check your API connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nudge-card">
      <div className="nudge-header">
        <h3 className="nudge-title">{title}</h3>
        <span
          className={`nudge-badge ${
            impactColors[category] || "bg-gray-100 text-gray-700"
          }`}
        >
          {category} Impact
        </span>
      </div>

      <p className="nudge-description">{description}</p>

      <button
        onClick={handleGetAINudge}
        disabled={loading}
        className="nudge-button"
      >
        {loading ? "Generating..." : "💡 Get AI Tip"}
      </button>

      {aiNudge && (
        <p className="nudge-ai-tip">
          <strong>AI Suggestion:</strong> {aiNudge}
        </p>
      )}
    </div>
  );
};

export default NudgeCard;
