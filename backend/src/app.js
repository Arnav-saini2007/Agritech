const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const cropRoutes = require("./routes/cropRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "KrishiApp API is running",
    docs: "/api/health"
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/crop", cropRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
