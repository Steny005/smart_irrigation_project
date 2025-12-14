const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema({
  decision: String,
  duration: Number,
  reason: String,
  source: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Decision", decisionSchema);
