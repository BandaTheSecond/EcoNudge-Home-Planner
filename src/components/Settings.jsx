import React from 'react';

const Settings = () => {
  return (
    <div className="settings">
      <header className="settings-header">
        <h1>EcoNudge</h1>
        <h2>Settings</h2>
      </header>

      <nav className="navigation">
        <button className="nav-btn">Dashboard</button>
        <button className="nav-btn">Planner</button>
        <button className="nav-btn">Reports</button>
        <button className="nav-btn">Rewards</button>
        <button className="nav-btn active">Settings</button>
      </nav>

      <div className="settings-content">
        <h3>Application Settings</h3>
        <p>Settings functionality coming soon...</p>
      </div>
    </div>
  );
};

export default Settings;
