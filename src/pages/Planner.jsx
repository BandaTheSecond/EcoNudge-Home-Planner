import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import { createPlannerTask } from "../api/api";

export default function Planner() {
  const { tasks, setTasks } = useAppContext();
  const [form, setForm] = useState({ title: "", description: "", city: "", energy_used: 0 });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = await createPlannerTask(form);
    setTasks([...tasks, newTask.task]);
    setForm({ title: "", description: "", city: "", energy_used: 0 });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create New Eco Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Task Title" value={form.title} onChange={handleChange} className="border p-2 w-full" required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 w-full" />
        <input name="energy_used" type="number" placeholder="Energy Used (kWh)" value={form.energy_used} onChange={handleChange} className="border p-2 w-full" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Task</button>
      </form>

      <h3 className="mt-6 text-xl font-semibold">Your Tasks</h3>
      <ul className="mt-2 space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="p-3 bg-green-100 rounded">
            <strong>{t.title}</strong> — {t.city} 🌤️
          </li>
        ))}
      </ul>
    </div>
  );
}
