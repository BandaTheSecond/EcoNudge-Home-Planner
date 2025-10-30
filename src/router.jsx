import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Rewards from "./pages/Rewards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "planner", element: <Planner /> },
      { path: "reports", element: <Reports /> },
      { path: "rewards", element: <Rewards /> },
      { path: "settings", element: <Settings /> }
    ]
  }
]);

export default router;
