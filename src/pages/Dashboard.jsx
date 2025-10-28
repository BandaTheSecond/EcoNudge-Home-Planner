import { useAppContext } from "../context/AppContext";

export default function Dashboard() {
  const { report } = useAppContext();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Eco Score</h3>
          <p className="text-3xl">{report.eco_score?.toFixed(1) || 0}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Tasks Completed</h3>
          <p className="text-3xl">{report.total_tasks || 0}</p>
        </div>
      </div>
    </div>
  );
}
