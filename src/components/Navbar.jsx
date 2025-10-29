import { Link, NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { user } = useApp();
  return (
    <header className="navbar">
      <Link to="/" className="brand">Eco-Nudge</Link>
      <nav className="navlinks">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/planner">Planner</NavLink>
        <NavLink to="/rewards">Rewards</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
      <div className="userpill">👤 {user?.name}</div>
    </header>
  );
}
