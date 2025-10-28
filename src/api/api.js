const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5555";

export const getPlannerTasks = async () => {
  const res = await fetch(`${API_URL}/api/planner/`);
  return res.json();
};

export const createPlannerTask = async (task) => {
  const res = await fetch(`${API_URL}/api/planner/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const getReports = async () => {
  const res = await fetch(`${API_URL}/api/reports/`);
  return res.json();
};

export const getRandomReward = async () => {
  const res = await fetch(`${API_URL}/api/rewards/random`);
  return res.json();
};
