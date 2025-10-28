import { useAppContext } from "../context/AppContext";

export default function Reports() {
  const { report, loading } = useAppContext();

  if (loading) return <p className="p-6">Loading report...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Sustainability Report</h2>
      <div className="bg-green-100 p-4 rounded">
        <p><strong>Total Tasks:</strong> {report.total_tasks}</p>
        <p><strong>Total Energy Used:</strong> {report.total_energy_used} kWh</p>
        <p><strong>Estimated CO₂ Emission:</strong> {report.estimated_emission.toFixed(2)} kg</p>
        <p><strong>Eco Score:</strong> {report.eco_score.toFixed(1)} / 100</p>
      </div>

      <h3 className="mt-6 text-lg font-semibold">Tasks by Category</h3>
      <ul>
        {Object.entries(report.tasks_by_category || {}).map(([cat, count]) => (
          <li key={cat}>{cat}: {count}</li>
        ))}
      </ul>
    </div>
  );
}
