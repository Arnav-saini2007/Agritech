import { useEffect, useState } from "react";
import api from "../lib/api";
import { modules } from "../data/modules";
import ModuleCard from "../components/ModuleCard";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => setDashboard(res.data)).catch(() => {});
  }, []);

  const stats = dashboard?.stats || [
    { label: "Weather cards", value: "1 live" },
    { label: "Modules ready", value: "5" },
    { label: "ML services", value: "future" }
  ];

  return (
    <div className="page-stack">
      <section className="hero-grid">
        <div className="hero-panel">
          <p className="eyebrow">Modern farmer dashboard</p>
          <h2>One place for weather,  profit, soil, disease, and voice.</h2>
          
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section className="module-grid">
        {modules.map((module) => (
          <ModuleCard key={module.key} {...module}  />
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
