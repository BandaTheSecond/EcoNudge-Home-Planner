import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { getTasks, addTask, toggleTask, deleteTask } from "../api/api";

export default function Planner() {
  const { tasks, setTasks } = useApp();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTasks().then(setTasks).catch(console.error);
  }, [setTasks]);

  const onAdd = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const created = await addTask({ task: text });
      setTasks([...tasks, { id: created.id ?? Date.now(), task: text, completed: false }]);
      setText("");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onToggle = async (t) => {
    try {
      await toggleTask(t.id, !t.completed);
      setTasks(tasks.map(x => x.id === t.id ? { ...x, completed: !x.completed } : x));
    } catch (e) {
      console.error(e);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="stack">
      <form className="row" onSubmit={onAdd}>
        <input
          className="input"
          placeholder="Add a green action…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn" disabled={loading}>{loading ? "Adding…" : "Add"}</button>
      </form>

      <ul className="todos">
        {tasks.map(t => (
          <li key={t.id} className={`todo ${t.completed ? "done" : ""}`}>
            <label>
              <input type="checkbox" checked={t.completed} onChange={() => onToggle(t)} />
              <span>{t.task}</span>
            </label>
            <button className="btn ghost" onClick={() => onDelete(t.id)}>Delete</button>
          </li>
        ))}
        {tasks.length === 0 && <div className="muted">No tasks yet. Add your first eco action!</div>}
      </ul>
    </div>
  );
}
