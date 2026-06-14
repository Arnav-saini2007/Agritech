const Header = ({ title, subtitle }) => {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Agritech dashboard</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>

      <div className="topbar-badge">
        <span className="pulse" />
        backend connected
      </div>
    </header>
  );
};

export default Header;
