const axios = require("axios");

const callMLService = async (sensor) => {
  const response = await axios.post("http://localhost:8000/predict", {
    soil_moisture: sensor.soilMoisture,
    temperature: sensor.temperature,
    humidity: sensor.humidity,
    light: sensor.light,
    tank_level: sensor.tankLevel
  });

  return response.data;
};

module.exports = callMLService;
