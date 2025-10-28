export default function Navbar() {
    return (
      <nav className="flex justify-between items-center bg-green-700 text-white p-4">
        <h1 className="text-xl font-bold">🌿 EcoNudge Planner</h1>
        <div className="flex gap-4">
          <a href="/">Dashboard</a>
          <a href="/planner">Planner</a>
          <a href="/reports">Reports</a>
          <a href="/rewards">Rewards</a>
        </div>
      </nav>
    );
  }
  