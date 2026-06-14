import Sidebar from "./Sidebar";
import Header from "./Header";

const PageShell = ({ title, subtitle, children }) => {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="content">
        <Header title={title} subtitle={subtitle} />
        {children}
      </main>
    </div>
  );
};

export default PageShell;
