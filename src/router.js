import { Dashboard } from "./components/Dashboard.js";
import { Planner } from "./components/Planner.js";

export function router(route) {
  const app = document.querySelector("#app");
  app.innerHTML = "";

  if (route === "planner") {
    app.appendChild(Planner());
  } else {
    app.appendChild(Dashboard());
  }
}
