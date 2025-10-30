const json = (res) => {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
};

// NUDGES
export const getNudges = () => fetch(`/api/nudges/`).then(json);

// PLANNER
export const getTasks = () => fetch(`/api/planner/`).then(json);
export const addTask = (task) =>
  fetch(`/api/planner/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  }).then(json);

export const toggleTask = (id, completed) =>
  fetch(`/api/planner/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed })
  }).then(json);

export const deleteTask = (id) =>
  fetch(`/api/planner/${id}`, { method: "DELETE" }).then(json);

// REWARDS
export const getRewards = () => fetch(`/api/rewards/`).then(json);

// REPORTS
export const getReports = () => fetch(`/api/reports/`).then(json);

// EXTERNAL APIs
export const getAINudge = (input) =>
  fetch(`/api/external/ai-nudge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input })
  }).then(json);

export const getWeather = (city) => fetch(`/api/external/weather?city=${city}`).then(json);

export const calculateCarbon = (data) =>
  fetch(`/api/external/carbon`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(json);

export const getEPAData = (zip) => fetch(`/api/external/epa-data?zip=${zip}`).then(json);
