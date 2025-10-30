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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Weekly Eco Actions" data={completion} />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Stats</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex justify-between">
              <span>Tasks total:</span>
              <span className="font-semibold">{tasks.length}</span>
            </li>
            <li className="flex justify-between">
              <span>Completed:</span>
              <span className="font-semibold text-green-600">{tasks.filter(t => t.completed).length}</span>
            </li>
            <li className="flex justify-between">
              <span>Nudges available:</span>
              <span className="font-semibold">{nudges.length}</span>
            </li>
            {weather && (
              <li className="flex justify-between">
                <span>Weather:</span>
                <span className="font-semibold">{weather.city} - {weather.temperature}°C, {weather.description}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nudges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nudges.map(n => (
            <NudgeCard key={n.id} title={n.title} description={n.message} category={n.category} />
          ))}
          {nudges.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No nudges yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
