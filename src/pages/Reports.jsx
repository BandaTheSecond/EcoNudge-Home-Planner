import { useEffect, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { getReports } from "../api/api";
import ChartCard from "../components/ChartCard";

function toDayLabel(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function Reports() {
  const { reports, setReports } = useApp();

  useEffect(() => {
    getReports().then(setReports).catch(console.error);
  }, [setReports]);

  const chartData = useMemo(() => {
    const counts = {};
    reports.forEach(r => {
      const label = r.created_at ? toDayLabel(r.created_at) : "N/A";
      counts[label] = (counts[label] || 0) + 1;
    });
    return Object.entries(counts).map(([label, value]) => ({ label, value }));
  }, [reports]);

  return (
    <div className="stack">
      <ChartCard title="Reports over Time" data={chartData} />
      <div className="card">
        <h3 className="card-title">Latest Reports</h3>
        <ul className="list">
          {reports.map(r => (
            <li key={r.id}>
              <strong>#{r.id}</strong> — {r.summary ?? "No summary"} <span className="muted">({r.created_at})</span>
            </li>
          ))}
          {reports.length === 0 && <div className="muted">No reports yet.</div>}
        </ul>
      </div>
    </div>
  );
}
