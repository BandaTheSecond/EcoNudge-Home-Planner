import { Link, NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { user } = useApp();
  return (
    <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-green-200">Eco-Nudge</Link>
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/" end className={({ isActive }) => `hover:text-green-200 ${isActive ? 'text-green-200 font-semibold' : ''}`}>Dashboard</NavLink>
          <NavLink to="/planner" className={({ isActive }) => `hover:text-green-200 ${isActive ? 'text-green-200 font-semibold' : ''}`}>Planner</NavLink>
          <NavLink to="/rewards" className={({ isActive }) => `hover:text-green-200 ${isActive ? 'text-green-200 font-semibold' : ''}`}>Rewards</NavLink>
          <NavLink to="/reports" className={({ isActive }) => `hover:text-green-200 ${isActive ? 'text-green-200 font-semibold' : ''}`}>Reports</NavLink>
          <NavLink to="/settings" className={({ isActive }) => `hover:text-green-200 ${isActive ? 'text-green-200 font-semibold' : ''}`}>Settings</NavLink>
        </nav>
        <div className="flex items-center space-x-2">
          <span className="text-sm">👤 {user?.name}</span>
        </div>
      </div>
    </header>
  );
}
