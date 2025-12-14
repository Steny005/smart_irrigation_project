const express = require("express");
const SensorData = require("../models/SensorData");

const router = express.Router();

/**
 * TEST ROUTE
 * Check if sensor routes are working
 */
router.get("/test", (req, res) => {
  res.send("Sensor route working ✅");
});

/**
 * TEMP: Insert test sensor data via browser
 * (REMOVE after testing)
 */
router.get("/insert-test", async (req, res) => {
  try {
    const sampleData = new SensorData({
      soilMoisture: 37,
      temperature: 34,
      humidity: 66,
      light: 610,
      tankLevel: 48,
      pumpStatus: "OFF"
    });

    await sampleData.save();

    res.json({
      message: "✅ Test sensor data inserted",
      data: sampleData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET: Latest sensor data
 */
router.get("/latest", async (req, res) => {
  try {
    const latest = await SensorData.findOne().sort({ createdAt: -1 });
    res.json(latest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET: Sensor history (with optional limit)
 */
router.get("/history", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const history = await SensorData.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST: Add sensor data (ESP32 / real input)
 */
router.post("/", async (req, res) => {
  try {
    const data = new SensorData(req.body);
    await data.save();
    res.status(201).json({
      message: "Sensor data saved",
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
