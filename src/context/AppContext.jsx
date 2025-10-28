import { createContext, useContext, useState, useEffect } from "react";
import { getPlannerTasks, getReports } from "../api/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const taskData = await getPlannerTasks();
        const reportData = await getReports();
        setTasks(Array.isArray(taskData) ? taskData : []);
        setReport(reportData || {});
      } catch (error) {
        console.error("Error fetching data:", error);
        setTasks([]);
        setReport({});
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ tasks, setTasks, report, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
