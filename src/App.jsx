import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AppProvider from "./context/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </AppProvider>
  );
}
