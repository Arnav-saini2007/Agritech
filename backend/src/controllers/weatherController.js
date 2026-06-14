const getWeather = (req, res) => {
  res.json({
    success: true,
    module: "weather",
    location: "Lucknow",
    summary: "Partly cloudy",
    temperatureC: 31,
    humidity: 58,
    rainfallChance: 24,
    windKph: 11,
    forecast: [
      { day: "Today", min: 26, max: 33, rain: 24 },
      { day: "Tomorrow", min: 25, max: 34, rain: 31 },
      { day: "Day 3", min: 24, max: 32, rain: 40 }
    ]
  });
};

module.exports = {
  getWeather
};
