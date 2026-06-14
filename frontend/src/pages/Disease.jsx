import { useState } from "react";
import PageShell from "../components/PageShell";

const Disease = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(
        "http://localhost:8000/predict-disease",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      title="Disease Detection"
      subtitle="Upload a crop image and identify possible crop diseases."
    >
      <section className="detail-card wide">
        <h3>Upload Leaf Image</h3>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) return;

            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        {preview && (
          <div style={{ marginTop: "20px" }}>
            <img
              src={preview}
              alt="Leaf Preview"
              style={{
                width: "300px",
                maxWidth: "100%",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />
          </div>
        )}

        <br />

        <button
          onClick={handlePredict}
          disabled={loading}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Detect Disease"}
        </button>

        {result && (
          <div
            style={{
              marginTop: "24px",
              padding: "20px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
            }}
          >
            <h3>Prediction Result</h3>

            <p>
              <strong>Disease:</strong> {result.disease}
            </p>

            <p>
              <strong>Confidence:</strong> {result.confidence}%
            </p>

            {result.top_predictions &&
              result.top_predictions.length > 0 && (
                <>
                  <h4 style={{ marginTop: "20px" }}>
                    Top Predictions
                  </h4>

                  <ul>
                    {result.top_predictions.map((prediction, index) => (
                      <li key={index}>
                        {prediction.label} — {prediction.confidence}%
                      </li>
                    ))}
                  </ul>
                </>
              )}
          </div>
        )}
      </section>
    </PageShell>
  );
};

export default Disease;