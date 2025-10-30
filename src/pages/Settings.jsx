import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Settings() {
  const { user, setUser } = useApp();
  const [name, setName] = useState(user?.name || "");

  return (
    <div className="stack">
      <div className="card">
        <h3 className="card-title">Profile</h3>
        <form
          className="stack"
          onSubmit={(e) => {
            e.preventDefault();
            setUser({ ...user, name });
          }}
        >
          <label className="stack-sm">
            <span>Name</span>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <button className="btn">Save</button>
        </form>
      </div>

      <div className="card">
        <h3 className="card-title">About</h3>
        <p className="muted">
          Eco-Nudge helps you plan small daily actions that add up to a greener life.
        </p>
      </div>
    </div>
  );
}
