import React, { useState } from "react";
import "../styles.css";

const Rewards = () => {
  const [points, setPoints] = useState(1250);
  const [progress, setProgress] = useState(65);

  const rewards = [
    { id: 1, name: "Eco Tote Bag", cost: 500, icon: <Leaf /> },
    { id: 2, name: "Reusable Water Bottle", cost: 800, icon: <Gift /> },
    { id: 3, name: "Plant a Tree", cost: 1000, icon: <Star /> },
    { id: 4, name: "Solar Lantern", cost: 1500, icon: <Trophy /> },
  ];

  const badges = ["Green Starter", "Energy Saver", "Plastic-Free Hero", "Eco Warrior"];

  const handleRedeem = (cost) => {
    if (points >= cost) {
      setPoints(points - cost);
      alert("🎉 Reward redeemed successfully!");
    } else {
      alert("⚠️ Not enough points to redeem this reward.");
    }
  };

  return (
    <div className="rewards-container">
      {/* 🌿 Header */}
      <div className="rewards-header">
        <h1>Rewards & Achievements</h1>
        <p>Track your eco-points, redeem rewards, and celebrate your green impact.</p>
      </div>

      {/* 💰 Points Summary */}
      <div className="points-summary">
        <h2>Your Eco Points</h2>
        <div className="points-balance">{points}</div>
        <p className="points-note">Earn more points by completing eco challenges.</p>
      </div>

      {/* 🌡️ Progress Bar */}
      <div className="progress-section">
        <h2>Progress Towards Next Reward</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="points-note" style={{ marginTop: "8px" }}>
          {progress}% of your monthly eco goal achieved
        </p>
      </div>

      {/* 🎁 Rewards Grid */}
      <div className="rewards-grid">
        {rewards.map((reward) => (
          <div className="reward-card" key={reward.id}>
            <div className="reward-image">{reward.icon}</div>
            <h3 className="reward-title">{reward.name}</h3>
            <p className="reward-points">{reward.cost} pts</p>
            <button onClick={() => handleRedeem(reward.cost)}>Redeem</button>
          </div>
        ))}
      </div>

      {/* 🏅 Badges Section */}
      <div className="badges-section">
        <h2 className="badges-title">Your Badges</h2>
        <div className="badges-grid">
          {badges.map((badge, index) => (
            <div className="badge" key={index}>
              <Award size={14} style={{ marginRight: "6px" }} /> {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
