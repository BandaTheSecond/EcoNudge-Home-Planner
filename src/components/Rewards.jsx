import React from 'react';

const Rewards = () => {
  return (
    <div className="rewards">
      <header className="rewards-header">
        <h1>EcoNudge</h1>
        <h2>Rewards</h2>
      </header>

      <nav className="navigation">
        <button className="nav-btn">Dashboard</button>
        <button className="nav-btn">Planner</button>
        <button className="nav-btn">Reports</button>
        <button className="nav-btn active">Rewards</button>
        <button className="nav-btn">Settings</button>
      </nav>

      <div className="rewards-content">
        <h3>Eco Rewards</h3>
        <p>Rewards functionality coming soon...</p>
      </div>
    </div>
  );
};

export default Rewards;
