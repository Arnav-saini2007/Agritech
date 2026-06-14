import { useState } from "react";
import PageShell from "../components/PageShell";

const Soil = () => {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [moisture, setMoisture] = useState("");

  const [result, setResult] = useState(null);

  const analyzeSoil = async () => {
    const response = await fetch(
      "http://localhost:8000/soil",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nitrogen: Number(nitrogen),
          phosphorus: Number(phosphorus),
          potassium: Number(potassium),
          ph: Number(ph),
          moisture: Number(moisture),
        }),
      }
    );

    const data = await response.json();

    setResult(data);
  };

  return (
    <PageShell
      title="Soil Quality"
      subtitle="Analyze soil health and crop suitability."
    >
      <section className="detail-card wide">

        <input
          placeholder="Nitrogen"
          value={nitrogen}
          onChange={(e) => setNitrogen(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Phosphorus"
          value={phosphorus}
          onChange={(e) => setPhosphorus(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Potassium"
          value={potassium}
          onChange={(e) => setPotassium(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="pH"
          value={ph}
          onChange={(e) => setPh(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Moisture"
          value={moisture}
          onChange={(e) => setMoisture(e.target.value)}
        />

        <br /><br />

        <button onClick={analyzeSoil}>
          Analyze Soil
        </button>

        {result && (
          <div style={{ marginTop: "20px" }}>
            <h3>Results</h3>

            <p>
              <strong>Soil Score:</strong>{" "}
              {result.soil_score}/100
            </p>

            <p>
              <strong>Quality:</strong>{" "}
              {result.quality}
            </p>

            <p>
              <strong>Recommended Crop:</strong>{" "}
              {result.recommended_crop}
            </p>
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default Soil;
