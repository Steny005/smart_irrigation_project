const API = "http://localhost:5000/api";

/* ---------- LIVE TIME ---------- */
setInterval(() => {
  document.getElementById("time").innerText = new Date().toLocaleString();
}, 1000);

/* ---------- FETCH LATEST SENSOR ---------- */
async function fetchLatestSensor() {
  const res = await fetch(`${API}/sensors/latest`);
  const d = await res.json();
  if (!d) return;

  document.getElementById("soil").innerText = d.soilMoisture + "%";
  document.getElementById("temp").innerText = d.temperature + "°C";
  document.getElementById("humidity").innerText = d.humidity + "%";
  document.getElementById("light").innerText = d.light + " lux";
  document.getElementById("tank").innerText = d.tankLevel + "%";

  const pump = document.getElementById("pump");
  pump.innerText = d.pumpStatus;
  pump.className = "status " + (d.pumpStatus === "ON" ? "on" : "off");
}

/* ---------- FETCH IRRIGATION DECISION ---------- */
async function fetchDecision() {
  const res = await fetch(`${API}/decision/latest`);
  const d = await res.json();

  document.getElementById("decisionText").innerText = d.decision;
  document.getElementById("decisionReason").innerText = d.reason;
  document.getElementById("decisionDuration").innerText = d.duration;
  document.getElementById("decisionSource").innerText = d.source;
}

/* ---------- INIT CHARTS ---------- */
let soilChart, tempChart, pumpChart;

function initCharts() {
  soilChart = new Chart(document.getElementById("soilChart"), {
    type: "line",
    data: {
      labels: [],
      datasets: [{ label: "Soil Moisture (%)", data: [], borderWidth: 2 }]
    }
  });

  tempChart = new Chart(document.getElementById("tempChart"), {
    type: "line",
    data: {
      labels: [],
      datasets: [{ label: "Temperature (°C)", data: [], borderWidth: 2 }]
    }
  });

  pumpChart = new Chart(document.getElementById("pumpChart"), {
    type: "bar",
    data: {
      labels: [],
      datasets: [{ label: "Pump ON/OFF", data: [], borderWidth: 1 }]
    }
  });
}

/* ---------- UPDATE CHARTS FROM HISTORY ---------- */
async function updateCharts() {
  const res = await fetch(`${API}/sensors/history?limit=10`);
  const history = await res.json();

  if (!history || history.length === 0) return;

  history.reverse();

  const labels = history.map(d =>
    new Date(d.createdAt).toLocaleTimeString()
  );

  soilChart.data.labels = labels;
  soilChart.data.datasets[0].data = history.map(d => d.soilMoisture);

  tempChart.data.labels = labels;
  tempChart.data.datasets[0].data = history.map(d => d.temperature);

  pumpChart.data.labels = labels;
  pumpChart.data.datasets[0].data =
    history.map(d => d.pumpStatus === "ON" ? 1 : 0);

  soilChart.update();
  tempChart.update();
  pumpChart.update();
}

/* ---------- START EVERYTHING ---------- */
initCharts();
fetchLatestSensor();
fetchDecision();
updateCharts();

setInterval(fetchLatestSensor, 5000);
setInterval(fetchDecision, 7000);
setInterval(updateCharts, 10000);
