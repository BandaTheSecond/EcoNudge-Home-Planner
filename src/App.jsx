import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import AppProvider from "./context/AppProvider";
import "./App.css";
import "./styles.css";

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        {/* 🌿 Navbar */}
        <Navbar />

        {/* 🧭 Main Layout */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />

          {/* Page Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>

        {/* 🌍 Footer */}
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
