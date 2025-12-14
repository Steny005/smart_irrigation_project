const express = require("express");
const SensorData = require("../models/SensorData");
const Decision = require("../models/Decision");
const callMLService = require("../services/mlService");

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    const sensor = await SensorData.findOne().sort({ createdAt: -1 });
    if (!sensor) return res.json({ message: "No sensor data available" });

    const mlResult = await callMLService(sensor);

    const decisionDoc = new Decision({
      decision: mlResult.pump === 1 ? "Irrigation Required" : "Not Required",
      duration: mlResult.minutes,
      reason: mlResult.reason,
      source: mlResult.source
    });

    await decisionDoc.save();
    res.json(decisionDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
