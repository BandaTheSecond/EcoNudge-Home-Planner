import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <aside className="sidebar">
          <div className="brand">🌿 EcoNudge</div>
          <nav>
            <a href="/">Dashboard</a>
            <a href="/planner">Planner</a>
            <a href="/reports">Reports</a>
            <a href="/rewards">Rewards</a>
            <a href="/settings">Settings</a>
          </nav>
        </aside>
        <main className="content">
          <Router />
        </main>
      </div>
    </BrowserRouter>
  );
}
