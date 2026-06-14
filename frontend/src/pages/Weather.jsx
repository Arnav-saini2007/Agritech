import { useEffect, useState } from "react";
import api from "../lib/api";
import PageShell from "../components/PageShell";

const Weather = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/weather").then((res) => setData(res.data)).catch(() => {});
  }, []);

  return (
    <PageShell title="Weather" subtitle="Clean weather cards for the farm.">
      <section className="detail-grid">
        <article className="detail-card wide">
          <h3>{data ? `${data.location} • ${data.summary}` : "Loading weather..."}</h3>
          <p>
            {data
              ? `${data.temperatureC}°C · Humidity ${data.humidity}% · Rain ${data.rainfallChance}%`
              : "Fetching live demo data from the backend."}
          </p>
        </article>

        {data?.forecast?.map((day) => (
          <article key={day.day} className="detail-card">
            <span>{day.day}</span>
            <strong>{day.min}° / {day.max}°</strong>
            <small>Rain {day.rain}%</small>
          </article>
        ))}
      </section>
    </PageShell>
  );
};

export default Weather;
