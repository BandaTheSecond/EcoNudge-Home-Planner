import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Planner from "./components/Planner.jsx";
import Reports from "./components/Reports.jsx";
import Rewards from "./components/Rewards.jsx";
import Settings from "./components/Settings.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<div className="p">Not found</div>} />
    </Routes>
  );
}
