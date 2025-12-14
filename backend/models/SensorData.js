const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
  soilMoisture: Number,
  temperature: Number,
  humidity: Number,
  light: Number,
  tankLevel: Number,
  pumpStatus: {
    type: String,
    enum: ["ON", "OFF"],
    default: "OFF"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SensorData", sensorDataSchema);
