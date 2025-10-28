import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Reports from "./pages/Reports";
import Rewards from "./pages/Rewards";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
