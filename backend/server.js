const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Backend + MongoDB running 🚀");
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
