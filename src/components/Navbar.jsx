import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { user } = useApp();
  const [theme, setTheme] = useState("light");

  // Apply theme to <html data-theme="...">
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="navbar">
      <div className="flex justify-between items-center w-full">
        {/* 🌿 Logo */}
        <Link to="/" className="text-xl font-bold text-white hover:text-green-200">
          EcoNudge
        </Link>

        {/* 🧭 Navigation Links */}
        <nav className="nav-links hidden md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hover:text-green-200 ${isActive ? "text-green-200 font-semibold" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/planner"
            className={({ isActive }) =>
              `hover:text-green-200 ${isActive ? "text-green-200 font-semibold" : ""}`
            }
          >
            Planner
          </NavLink>
          <NavLink
            to="/rewards"
            className={({ isActive }) =>
              `hover:text-green-200 ${isActive ? "text-green-200 font-semibold" : ""}`
            }
          >
            Rewards
          </NavLink>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `hover:text-green-200 ${isActive ? "text-green-200 font-semibold" : ""}`
            }
          >
            Reports
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `hover:text-green-200 ${isActive ? "text-green-200 font-semibold" : ""}`
            }
          >
            Settings
          </NavLink>
        </nav>

        {/* 🌗 Theme Toggle + User */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* User Name */}
          {user && <span className="text-sm text-white">👤 {user.name}</span>}
        </div>
      </div>
    </header>
  );
}
