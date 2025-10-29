<<<<<<< HEAD
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
=======
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Rewards from "./pages/Rewards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "planner", element: <Planner /> },
      { path: "reports", element: <Reports /> },
      { path: "rewards", element: <Rewards /> },
      { path: "settings", element: <Settings /> }
    ]
  }
]);

export default router;
>>>>>>> Melisa
