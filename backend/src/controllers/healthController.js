const getHealth = (req, res) => {
  res.json({
    success: true,
    status: "ok",
    app: "KrishiApp API",
    time: new Date().toISOString(),
    postgres: "configured",
    prisma: "configured"
  });
};

module.exports = {
  getHealth
};
