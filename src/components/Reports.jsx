// src /components/Reports.js
import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    LineChart, Line
} from "recharts";

const API = import.meta.env.VITE_API_URL || "http://localhost:5555";

export default function Reports() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Use demo data since no backend is available
    const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const co2 = [1.1,1.4,1.6,1.3,1.5,1.2,0.9];
    const water = [20,25,30,22,18,26,21];
    setData({
      co2Series: days.map((d,i)=>({ day:d, value:co2[i] })),
      waterSeries: days.map((d,i)=>({ day:d, value:water[i] })),
      summary: { totalCO2: co2.reduce((a,b)=>a+b,0).toFixed(2), totalWater: water.reduce((a,b)=>a+b,0), totalKwh: 4.2, fridgeDays: 2 }
    });
  }, []);

  if (!data) return <div className="p-6">Loading reports…</div>;

  const { co2Series, waterSeries, summary } = data;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Reports</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <div className="mb-3 font-medium">CO₂ (kg) saved</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={co2Series}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4">
          <div className="mb-3 font-medium">Water (L) saved</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waterSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border bg-white p-5">
        <div className="text-lg">
          You saved enough CO₂ to power a fridge for <b>{summary.fridgeDays}</b> days!
        </div>
        <div className="mt-1 text-gray-600">
          Weekly totals — CO₂: <b>{summary.totalCO2} kg</b>, Water: <b>{summary.totalWater} L</b>, Energy: <b>{summary.totalKwh} kWh</b>
        </div>
      </div>
    </div>
  );
}