const getDashboard = (req, res) => {
  res.json({
    success: true,
    title: "KrishiApp Overview",
    stats: [
      { label: "Weather cards", value: "1 live" },
      { label: "Modules ready", value: "6" },
      { label: "ML services", value: "future" }
    ],
    modules: [
      {
        key: "weather",
        title: "Weather",
        subtitle: "Forecast, rainfall, and alerts",
        status: "Demo ready"
      },
      {
        key: "disease",
        title: "Disease Detection",
        subtitle: "Leaf image analysis later",
        status: "Python ML later"
      },
      {
        key: "soil",
        title: "Soil Quality",
        subtitle: "NPK and pH insights",
        status: "Demo ready"
      },
      {
        key: "mandi",
        title: "Mandi Prices",
        subtitle: "Market rates and trends",
        status: "Demo ready"
      },
      {
        key: "profit",
        title: "Profit Estimation",
        subtitle: "Cost and yield calculator",
        status: "Demo ready"
      },
      {
        key: "voice",
        title: "Voice Chat",
        subtitle: "Regional language assistant",
        status: "Local LLM later"
      }
    ]
  });
};

module.exports = {
  getDashboard
};
