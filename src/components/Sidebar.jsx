import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Menu</h4>
        <ul className="space-y-2">
          <li>
            <NavLink to="/" end className={({ isActive }) => `block px-4 py-2 rounded-md hover:bg-green-100 ${isActive ? 'bg-green-200 text-green-800' : 'text-gray-700'}`}>
              🏠 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/planner" className={({ isActive }) => `block px-4 py-2 rounded-md hover:bg-green-100 ${isActive ? 'bg-green-200 text-green-800' : 'text-gray-700'}`}>
              🗓️ Planner
            </NavLink>
          </li>
          <li>
            <NavLink to="/rewards" className={({ isActive }) => `block px-4 py-2 rounded-md hover:bg-green-100 ${isActive ? 'bg-green-200 text-green-800' : 'text-gray-700'}`}>
              🏅 Rewards
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={({ isActive }) => `block px-4 py-2 rounded-md hover:bg-green-100 ${isActive ? 'bg-green-200 text-green-800' : 'text-gray-700'}`}>
              📈 Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => `block px-4 py-2 rounded-md hover:bg-green-100 ${isActive ? 'bg-green-200 text-green-800' : 'text-gray-700'}`}>
              ⚙️ Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
