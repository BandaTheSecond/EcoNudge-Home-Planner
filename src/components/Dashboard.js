export function Dashboard() {
    const div = document.createElement("div");
    div.className = "dashboard";
    div.innerHTML = `
      <h1>🌿 EcoNudge Dashboard</h1>
      <p>Small habits create big change.</p>
    `;
    return div;
  }
  