import { Link } from "react-router-dom";

const ModuleCard = ({ title, subtitle, route, tone, status }) => {
  return (
    <Link to={route} className={`module-card tone-${tone}`}>
      <div className="module-card-top">
        <span className="module-pill">KrishiApp</span>
        <span className="module-status">{status || "Open"}</span>
      </div>

      <h3>{title}</h3>
      <p>{subtitle}</p>

      <div className="module-card-foot">Open module →</div>
    </Link>
  );
};

export default ModuleCard;
