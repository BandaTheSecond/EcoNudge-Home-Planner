import React from 'react';

const Reports = () => {
  return (
    <div className="reports">
      <header className="reports-header">
        <h1>EcoNudge</h1>
        <h2>Reports</h2>
      </header>

      <nav className="navigation">
        <button className="nav-btn">Dashboard</button>
        <button className="nav-btn">Planner</button>
        <button className="nav-btn active">Reports</button>
        <button className="nav-btn">Rewards</button>
        <button className="nav-btn">Settings</button>
      </nav>

      <div className="reports-content">
        <h3>Environmental Impact Report</h3>
        <p>Reports functionality coming soon...</p>
      </div>
    </div>
  );
};

export default Reports;
