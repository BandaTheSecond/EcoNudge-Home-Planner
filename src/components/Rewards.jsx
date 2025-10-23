import React, { useEffect, useState } from "react";
import { listRewards } from "../api";

function Badge({ label, when }) {
  return (
    <div className="badge">
      <div className="bold">{label}</div>
      <div className="muted">{when}</div>
    </div>
  );
}

export default function Rewards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    listRewards(1)
      .then(setData)
      .catch(() =>
        setData({
          points: 240,
          streakDays: 4,
          rewards: [
            { name: "First Nudge Accepted", earned_at: "2025-10-12" },
            { name: "7-Day Streak", earned_at: "2025-10-18" },
          ],
        })
      );
  }, []);

  if (!data) return <div className="p">Loading…</div>;
  const { points = 0, streakDays = 0, rewards = [] } = data;

  return (
    <div className="p">
      <h1>Rewards</h1>

      <div className="grid-3">
        <div className="card">
          <div className="muted">Points</div>
          <div className="big">{points}</div>
        </div>
        <div className="card">
          <div className="muted">Current streak</div>
          <div className="big">{streakDays} days</div>
        </div>
        <div className="card">
          <div className="muted">Next milestone</div>
          <div className="big">500 pts</div>
        </div>
      </div>

      <h2 className="mt">Badges</h2>
      <div className="grid-3">
        {rewards.length === 0 && <div className="muted">No badges yet.</div>}
        {rewards.map((r, i) => (
          <Badge key={i} label={r.name} when={new Date(r.earned_at).toDateString()} />
        ))}
      </div>
    </div>
  );
}
