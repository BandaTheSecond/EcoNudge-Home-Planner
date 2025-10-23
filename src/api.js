// src/api.js
const API = import.meta.env.VITE_API_URL || "http://localhost:5555";

// ---- Nudges (CRUD)
export const getNudges = async (params = "") =>
  (await fetch(`${API}/nudges${params}`)).json();

export const createNudge = async (payload) =>
  (await fetch(`${API}/nudges`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })).json();

export const patchNudge = async (id, payload) =>
  (await fetch(`${API}/nudges/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })).json();

export const deleteNudge = async (id) =>
  fetch(`${API}/nudges/${id}`, { method: "DELETE" });

// ---- Planner
export const getWeekPlan = async (userId = 1) =>
  (await fetch(`${API}/planner?user_id=${userId}`)).json();

export const savePlan = async (updates, userId = 1) =>
  (await fetch(`${API}/planner`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, updates }),
  })).json();

// ---- Reports
export const getWeeklyReport = async (userId = 1) =>
  (await fetch(`${API}/reports?user_id=${userId}&range=weekly`)).json();

// ---- Rewards
export const listRewards = async (userId = 1) =>
  (await fetch(`${API}/rewards?user_id=${user_id}`)).json();
