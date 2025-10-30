import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { getNudges, getWeather } from "../api/api";
import NudgeCard from "../components/NudgeCard";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  const { nudges, setNudges, tasks } = useApp();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getNudges().then(setNudges).catch(console.error);
    getWeather("New York").then(setWeather).catch(console.error);
  }, [setNudges]);

  const completion = [
    { label: "Mon", value: 1 },
    { label: "Tue", value: 3 },
    { label: "Wed", value: 2 },
    { label: "Thu", value: Math.max(0, tasks.filter(t=>t.completed).length) },
    { label: "Fri", value: 4 }
  ];

  return (
    <div className="stack">
      <div className="grid-2">
        <ChartCard title="Weekly Eco Actions" data={completion} />
        <div className="card">
          <h3 className="card-title">Quick Stats</h3>
          <ul className="list">
            <li>Tasks total: {tasks.length}</li>
            <li>Completed: {tasks.filter(t => t.completed).length}</li>
            <li>Nudges available: {nudges.length}</li>
            {weather && (
              <>
                <li>Weather: {weather.city} - {weather.temperature}°C, {weather.description}</li>
              </>
            )}
          </ul>
        </div>
      </div>

      <h2 className="section-title">Nudges</h2>
      <div className="grid-3">
        {nudges.map(n => (
          <NudgeCard key={n.id} title={n.title} description={n.message} category={n.category} />
        ))}
        {nudges.length === 0 && <div className="muted">No nudges yet.</div>}
      </div>
    </div>
  );
}
