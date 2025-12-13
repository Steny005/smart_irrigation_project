// Live Time
setInterval(() => {
  document.getElementById("time").innerText = new Date().toLocaleString();
}, 1000);

// Charts
const soilCtx = document.getElementById('soilChart');
new Chart(soilCtx, {
  type: 'line',
  data: {
    labels: ['10AM','11AM','12PM','1PM','2PM'],
    datasets: [{
      label: 'Soil Moisture (%)',
      data: [60,55,50,45,40],
      borderWidth: 2
    }]
  }
});

const tempCtx = document.getElementById('tempChart');
new Chart(tempCtx, {
  type: 'line',
  data: {
    labels: ['10AM','11AM','12PM','1PM','2PM'],
    datasets: [{
      label: 'Temperature (°C)',
      data: [28,29,30,31,32],
      borderWidth: 2
    }]
  }
});

const pumpCtx = document.getElementById('pumpChart');
new Chart(pumpCtx, {
  type: 'bar',
  data: {
    labels: ['10AM','11AM','12PM','1PM','2PM'],
    datasets: [{
      label: 'Pump ON/OFF',
      data: [0,1,1,0,1],
      borderWidth: 1
    }]
  }
});
