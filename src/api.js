const API_BASE_URL = "https://econudge-api.onrender.com/api";

export async function fetchData(endpoint) {
  const res = await fetch(`${API_BASE_URL}/${endpoint}`);
  return res.json();
}
