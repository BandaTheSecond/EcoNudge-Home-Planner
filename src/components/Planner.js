import React, { useEffect, useState } from "react";
import { getWeekPlan, savePlan } from "../api";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Planner() {
  const [tasks, setTasks] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getWeekPlan(1).then((data) => setTasks(data.tasks || []));
  }, []);

  function toggle(dayIndex, taskIndex) {
    setSaved(false);
    setTasks((prev) => {
      const copy = [...prev];
      const row = { ...copy[taskIndex] };
      const checks = [...row.dayChecks];
      checks[dayIndex] = !checks[dayIndex];
      row.dayChecks = checks;
      copy[taskIndex] = row;
      return copy;
    });
  }

  async function onSave() {
    const payload = tasks.map((t) => ({ id: t.id, dayChecks: t.dayChecks }));
    await savePlan(payload, 1);
    setSaved(true);
  }

  return (
    <div className="p">
      <h1>Weekly Planner</h1>

      <div className="table">
        <div className="t-head row">
          <div className="cell head">Action</div>
          {DAYS.map((d) => (
            <div key={d} className="cell head">{d}</div>
          ))}
        </div>

        {tasks.map((t, r) => (
          <div key={t.id} className="row">
            <div className="cell">
              <div className="bold">{t.label}</div>
              <div className="muted">~{t.estimated_kwh?.toFixed(1) ?? 0.5} kWh</div>
            </div>
            {t.dayChecks.map((checked, c) => (
              <div key={c} className="cell center">
                <input type="checkbox" checked={checked} onChange={() => toggle(c, r)} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="row mt">
        <button className="btn primary" onClick={onSave}>Save Plan</button>
        {saved && <span className="muted">Saved ✓</span>}
      </div>
    </div>
  );
}
