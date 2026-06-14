import { NavLink, Link } from "react-router-dom";
import { modules } from "../data/modules";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/" className="brand">
        <span className="brand-mark">K</span>
        <span>
          <strong>KrishiApp</strong>
          <small>Agritech control center</small>
        </span>
      </Link>

      <nav className="side-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Dashboard
        </NavLink>

        {modules.map((module) => (
          <NavLink
            key={module.key}
            to={module.route}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {module.title}
          </NavLink>
        ))}
      </nav>

      
    </aside>
  );
};

export default Sidebar;
