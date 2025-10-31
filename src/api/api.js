// ✅ Unified JSON handler with better error messages
const json = async (res) => {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Error ${res.status}: ${res.statusText} → ${message}`);
  }
  return res.json();
};

// ✅ Base API URL (works for both local and deployed)
const API = import.meta.env.VITE_API_URL || "http://localhost:5555/api";

// ---------------------- NUDGES ----------------------
export const getNudges = () => fetch(`${API}/nudges/`).then(json);

// ---------------------- PLANNER ----------------------
export const getTasks = () => fetch(`${API}/planner/`).then(json);

export const addTask = (task) =>
  fetch(`${API}/planner/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  }).then(json);

export const toggleTask = (id, completed) =>
  fetch(`${API}/planner/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  }).then(json);

export const deleteTask = (id) =>
  fetch(`${API}/planner/${id}`, { method: "DELETE" }).then(json);

// ---------------------- REWARDS ----------------------
export const getRewards = () => fetch(`${API}/rewards/`).then(json);

// 🟢 NEW: Create reward when a task is completed
export const createReward = (reward) =>
  fetch(`${API}/rewards/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reward),
  }).then(json);

// ---------------------- REPORTS ----------------------
export const getReports = () => fetch(`${API}/reports/`).then(json);

// ---------------------- EXTERNAL APIs ----------------------
export const getAINudge = (input) =>
  fetch(`${API}/external/ai-nudge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  }).then(json);

export const getWeather = (city) =>
  fetch(`${API}/external/weather?city=${city}`).then(json);

export const calculateCarbon = (data) =>
  fetch(`${API}/external/carbon`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(json);

export const getEPAData = (zip) =>
  fetch(`${API}/external/epa-data?zip=${zip}`).then(json);
