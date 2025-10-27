import React, { useState } from 'react';
import '../styles/planner.css';

const Planner = ({ onNavigate }) => {
  const [weeklyTasks, setWeeklyTasks] = useState({
    Mon: [
      { id: 1, text: 'Turn off lights', completed: true },
      { id: 2, text: 'Shorter shower', completed: true }
    ],
    Tue: [
      { id: 3, text: 'Unplug devices', completed: false }
    ],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: []
  });

  const [newTask, setNewTask] = useState({
    day: 'Mon',
    text: ''
  });

  const toggleTaskCompletion = (day, taskId) => {
    setWeeklyTasks(prev => ({
      ...prev,
      [day]: prev[day].map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const addNewTask = () => {
    if (newTask.text.trim() === '') return;
    
    const taskId = Date.now();
    const newTaskObj = {
      id: taskId,
      text: newTask.text,
      completed: false
    };

    setWeeklyTasks(prev => ({
      ...prev,
      [newTask.day]: [...prev[newTask.day], newTaskObj]
    }));

    setNewTask({ ...newTask, text: '' });
  };

  const removeTask = (day, taskId) => {
    setWeeklyTasks(prev => ({
      ...prev,
      [day]: prev[day].filter(task => task.id !== taskId)
    }));
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="planner">
      <header className="planner-header">
        <h1>EcoNudge</h1>
        <h2>Planner</h2>
      </header>

      <nav className="navigation">
        <button 
          className="nav-btn"
          onClick={() => onNavigate('dashboard')}
        >
          Dashboard
        </button>
        <button className="nav-btn active">
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

      <div className="planner-content">
        <div className="add-task-section">
          <h3>Add New Task</h3>
          <div className="add-task-form">
            <select 
              value={newTask.day}
              onChange={(e) => setNewTask({...newTask, day: e.target.value})}
            >
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <input 
              type="text"
              placeholder="Enter a sustainability task..."
              value={newTask.text}
              onChange={(e) => setNewTask({...newTask, text: e.target.value})}
              onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
            />
            <button onClick={addNewTask}>Add Task</button>
          </div>
        </div>

        <div className="weekly-planner">
          <h3>Weekly Planner</h3>
          <div className="planner-grid">
            {days.map(day => (
              <div key={day} className="planner-day">
                <div className="day-header">{day}</div>
                <div className="day-tasks">
                  {weeklyTasks[day].map(task => (
                    <div 
                      key={task.id} 
                      className={`task-item ${task.completed ? 'completed' : ''}`}
                    >
                      <span 
                        className="task-checkbox"
                        onClick={() => toggleTaskCompletion(day, task.id)}
                      >
                        {task.completed ? '✔' : '○'}
                      </span>
                      <span className="task-text">{task.text}</span>
                      <button 
                        className="remove-task"
                        onClick={() => removeTask(day, task.id)}
                        aria-label="Remove task"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {weeklyTasks[day].length === 0 && (
                    <div className="empty-task">No tasks</div>
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

export default Planner;