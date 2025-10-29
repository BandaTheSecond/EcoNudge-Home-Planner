export default function RewardBadge({ name, points }) {
  return (
    <div className="badge">
      <div className="medal">🏅</div>
      <div>
        <div className="badge-title">{name}</div>
        <div className="muted">{points} pts</div>
      </div>
    </div>
  );
}
