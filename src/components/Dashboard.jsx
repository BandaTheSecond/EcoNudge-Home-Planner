import React, { useEffect, useState } from "react";
import { getNudges } from "../api";

export default function Dashboard() {
  const [nudges, setNudges] = useState([]);
  const today = nudges[0];

  useEffect(() => {
    getNudges().then(setNudges).catch(() => setNudges([]));
  }, []);

  return (
    <div className="p">
      <h1>Welcome 👋</h1>

      <section className="card">
        <h2>Today’s Nudge</h2>
        {!today ? (
          <p className="muted">No nudges yet. Add some from the API.</p>
        ) : (
          <div className="nudge">
            <div className="nudge-text">{today.message}</div>
            <div className="muted">saves ~{today.est_kwh_save} kWh</div>
            <div className="row">
              <button className="btn primary">Accept</button>
              <button className="btn">Dismiss</button>
            </div>
          </div>
        )}
      </section>

      <section className="card mt">
        <h2>Progress</h2>
        <div className="progress">
          <div className="bar" style={{ width: "68%" }} />
        </div>
        <div className="muted">68% complete · CO₂ saved: <b>4.2 kg</b></div>
      </section>
    </div>
  );
}
