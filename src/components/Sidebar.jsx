import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="side-section">
        <h4>Menu</h4>
        <ul>
          <li><NavLink to="/" end>🏠 Dashboard</NavLink></li>
          <li><NavLink to="/planner">🗓️ Planner</NavLink></li>
          <li><NavLink to="/rewards">🏅 Rewards</NavLink></li>
          <li><NavLink to="/reports">📈 Reports</NavLink></li>
          <li><NavLink to="/settings">⚙️ Settings</NavLink></li>
        </ul>
      </div>
    </aside>
  );
}
