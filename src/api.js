const BASE_URL = "http://localhost:5555/api";

export async function getNudges() {
  const res = await fetch(`${BASE_URL}/nudges/`);
  return res.json();
}

export async function addUser(user) {
  const res = await fetch(`${BASE_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  return res.json();
}
