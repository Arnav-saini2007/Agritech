import { useState } from "react";
import PageShell from "../components/PageShell";

const Profit = () => {
  const [crop, setCrop] = useState("");
  const [area, setArea] = useState("");
  const [cost, setCost] = useState("");
  const [yieldPerAcre, setYieldPerAcre] = useState("");
  const [marketPrice, setMarketPrice] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateProfit = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8000/profit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            crop,
            area: Number(area),
            cost_per_acre: Number(cost),
            yield_per_acre: Number(yieldPerAcre),
            market_price: Number(marketPrice),
          }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      title="Profit Estimation"
      subtitle="Estimate revenue, cost and expected profit."
    >
      <section className="detail-card wide">

        <input
          placeholder="Crop Name"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Area (Acres)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Cost Per Acre (₹)"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Yield Per Acre (Quintals)"
          value={yieldPerAcre}
          onChange={(e) => setYieldPerAcre(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Market Price (₹/Quintal)"
          value={marketPrice}
          onChange={(e) => setMarketPrice(e.target.value)}
        />

        <br /><br />

        <button onClick={calculateProfit}>
          {loading ? "Calculating..." : "Estimate Profit"}
        </button>

        {result && (
          <div style={{ marginTop: "20px" }}>
            <h3>Results</h3>

            <p>
              <strong>Revenue:</strong> ₹{result.revenue}
            </p>

            <p>
              <strong>Total Cost:</strong> ₹{result.cost}
            </p>

            <p>
              <strong>Profit:</strong> ₹{result.profit}
            </p>

            <hr />

            <h3>AI Explanation</h3>

            <p>{result.explanation}</p>
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default Profit;