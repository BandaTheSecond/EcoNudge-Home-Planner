import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
 import App from './App.jsx' 
 import './index.css'  // 👈 base  ReactDOM.createRoot(document.getElementById('root')).render(   <React.StrictMode>     <App />   </React.StrictMode> )
 import './styles.css';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
