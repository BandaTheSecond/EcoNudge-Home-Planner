import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="p-4">
        <h4 className="sidebar-title">Menu</h4>
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              🏠 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/planner"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              🗓️ Planner
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rewards"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              🏅 Rewards
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              📈 Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              ⚙️ Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
