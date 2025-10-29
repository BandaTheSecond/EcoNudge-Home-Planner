import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AppProvider from "./context/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <div className="app-shell">
        <Navbar />
        <div className="main-area">
          <Sidebar />
          <main className="content">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </AppProvider>
  );
}
