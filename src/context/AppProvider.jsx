import { useMemo, useState } from "react";
import { AppContext } from "./AppContext";

export default function AppProvider({ children }) {
  const [user, setUser] = useState({ id: 1, name: "Eco User" });
  const [nudges, setNudges] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [reports, setReports] = useState([]);

  const value = useMemo(
    () => ({ user, setUser, nudges, setNudges, tasks, setTasks, rewards, setRewards, reports, setReports }),
    [user, nudges, tasks, rewards, reports]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
