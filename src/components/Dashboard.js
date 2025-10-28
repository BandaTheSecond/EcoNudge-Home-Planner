import React, { useState } from 'react';
import '../styles/dashboard.css';

const Dashboard = ({ onNavigate }) => {
  const [user, setUser] = useState('Amos');
  const [progress, setProgress] = useState(68);
  const [co2Saved, setCo2Saved] = useState(4.2);
  const [todaysNudge, setTodaysNudge] = useState({
    id: 1,
    title: 'Turn off sockets before bed',
    description: 'Saves 0.8kWh',
    status: 'pending'
  });
  const [weeklyPlan, setWeeklyPlan] = useState([
    { day: 'Mon', task: 'Turn off lights', completed: true },
    { day: 'Tue', task: 'Shorter shower', completed: true },
    { day: 'Wed', task: 'Unplug devices', completed: false },
    { day: 'Thu', task: '', completed: false },
    { day: 'Fri', task: '', completed: false },
    { day: 'Sat', task: '', completed: false },
    { day: 'Sun', task: '', completed: false }
  ]);

  const handleAcceptNudge = () => {
    setTodaysNudge({ ...todaysNudge, status: 'accepted' });
    setProgress(prev => Math.min(prev + 5, 100));
    setCo2Saved(prev => prev + 0.2);
  };

  const handleDismissNudge = () => {
    setTodaysNudge({ ...todaysNudge, status: 'dismissed' });
  };

  const toggleTaskCompletion = (index) => {
    const updatedPlan = [...weeklyPlan];
    if (updatedPlan[index].task) {
      updatedPlan[index].completed = !updatedPlan[index].completed;
      setWeeklyPlan(updatedPlan);
      
      const completedCount = updatedPlan.filter(task => task.completed).length;
      setProgress(Math.round((completedCount / 7) * 100));
      
      if (updatedPlan[index].completed) {
        setCo2Saved(prev => prev + 0.6);
      } else {
        setCo2Saved(prev => Math.max(prev - 0.6, 0));
      }
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>EcoNudge</h1>
        <h2>Welcome, {user}</h2>
      </header>

      <nav className="navigation">
        <button className="nav-btn active">
          Dashboard
        </button>
        <button 
          className="nav-btn"
          onClick={() => onNavigate('planner')}
        >
          Planner
        </button>
        <button className="nav-btn">
          Reports
        </button>
        <button className="nav-btn">
          Rewards
        </button>
        <button className="nav-btn">
          Settings
        </button>
      </nav>

      <div className="dashboard-content">
        <div className="todays-nudge">
          <h3>Today's Nudge</h3>
          <div className="nudge-card">
            <h4>{todaysNudge.title}</h4>
            <p>{todaysNudge.description}</p>
            <div className="nudge-actions">
              <button 
                className={`accept-btn ${todaysNudge.status === 'accepted' ? 'accepted' : ''}`}
                onClick={handleAcceptNudge}
                disabled={todaysNudge.status === 'accepted'}
              >
                {todaysNudge.status === 'accepted' ? 'Accepted' : 'Accept'}
              </button>
              <button 
                className={`dismiss-btn ${todaysNudge.status === 'dismissed' ? 'dismissed' : ''}`}
                onClick={handleDismissNudge}
                disabled={todaysNudge.status === 'dismissed'}
              >
                {todaysNudge.status === 'dismissed' ? 'Dismissed' : 'Dismiss'}
              </button>
            </div>
          </div>
        </div>

        <div className="progress-section">
          <h3>Progress</h3>
          <div className="progress-card">
            <div className="progress-circle">
              <div className="progress-text">
                {progress}%
              </div>
              <div className="progress-label">complete</div>
            </div>
            <div className="co2-saved">
              <div className="co2-value">{co2Saved.toFixed(1)} kg</div>
              <div className="co2-label">CO₂ Saved</div>
            </div>
          </div>
        </div>

        <div className="weekly-planner">
          <h3>Weekly Planner</h3>
          <div className="planner-grid">
            {weeklyPlan.map((day, index) => (
              <div key={index} className="planner-day">
                <div className="day-name">{day.day}</div>
                <div 
                  className={`task ${day.completed ? 'completed' : ''} ${!day.task ? 'empty' : ''}`}
                  onClick={() => toggleTaskCompletion(index)}
                >
                  {day.task && (
                    <>
                      <span className="checkmark">
                        {day.completed ? '✔' : '○'}
                      </span>
                      {day.task}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
