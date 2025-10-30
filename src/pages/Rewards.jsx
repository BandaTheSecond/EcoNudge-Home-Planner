import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { getRewards } from "../api/api";
import RewardBadge from "../components/RewardBadge";

export default function Rewards() {
  const { rewards, setRewards } = useApp();

  useEffect(() => {
    getRewards().then(setRewards).catch(console.error);
  }, [setRewards]);

  return (
    <div className="stack">
      <h2 className="section-title">Rewards</h2>
      <div className="grid-2">
        {rewards.map(r => (
          <RewardBadge key={r.id} name={r.name} points={r.points_required ?? r.points ?? 0} />
        ))}
        {rewards.length === 0 && <div className="muted">No rewards yet.</div>}
      </div>
    </div>
  );
}
