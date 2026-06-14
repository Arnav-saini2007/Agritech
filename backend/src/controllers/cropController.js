const analyzeCrop = (req, res) => {
  const { crop = "Tomato" } = req.body || {};

  res.json({
    success: true,
    crop,
    disease: "Healthy leaf / placeholder",
    confidence: 0.98,
    recommendation: "This is demo data. Hook the Python CNN later.",
    profitHint: "Use mandi price + cost inputs for profit estimation",
    soilHint: "Check NPK and pH before planting"
  });
};

const getCropModules = (req, res) => {
  res.json({
    success: true,
    modules: ["disease", "soil", "profit", "mandi", "voice", "chat"]
  });
};

module.exports = {
  analyzeCrop,
  getCropModules
};
