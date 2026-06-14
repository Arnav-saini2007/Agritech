import PageShell from "../components/PageShell";

const Mandi = () => {
  return (
    <PageShell title="Mandi Prices" subtitle="Market rate cards for crops.">
      <section className="detail-card wide">
        <h3>Coming next</h3>
        <p>Later this page can read API data from Agmarknet or a government feed.</p>
        <div className="pill-row">
          <span>Wheat</span>
          <span>Rice</span>
          <span>Tomato</span>
          <span>Onion</span>
        </div>
      </section>
    </PageShell>
  );
};

export default Mandi;
