# 🌱 Smart Irrigation System – ML & IoT Dashboard

An intelligent irrigation management system that combines sensor data, machine learning, and weather forecasting to automate irrigation decisions and visualize them on a live dashboard.

---

## Features

- Real-time sensor monitoring (soil moisture, temperature, humidity, light)
- Water tank level and pump status tracking
- Machine learning based irrigation decision
- Weather-aware irrigation logic
- Interactive dashboard with charts
- Cloud database using MongoDB Atlas
- Microservice architecture (Node.js + FastAPI)

---

## System Architecture

Sensor Data
→ Node.js Backend (Express)
→ MongoDB Atlas
→ FastAPI ML Service
→ Frontend Dashboard

---

## Project Structure

project-root  
├── backend  
│   ├── server.js  
│   ├── package.json  
│   ├── routes  
│   │   └── sensorRoutes.js  
│   ├── models  
│   │   └── SensorData.js  
│   ├── config  
│   │   └── db.js  
│   └── ml  
│       ├── app.py  
│       └── irrigation_best_model.pkl  
│  
└── frontend  
    ├── index.html  
    ├── app.js  
    └── style.css  

---

## Technologies Used

Frontend:
- HTML
- CSS
- JavaScript
- Chart.js

Backend:
- Node.js
- Express.js

ML Service:
- FastAPI
- Python
- scikit-learn

Database:
- MongoDB Atlas

Weather API:
- OpenWeatherMap

---

## How to Run the Project (Local Setup)

### Prerequisites

- Node.js (v16 or higher)
- Python 3.9 or higher
- Internet connection

---

### Step 1: Start ML Service (FastAPI)

Open Terminal 1:

cd backend/ml  
pip install fastapi uvicorn joblib numpy pymongo requests  
uvicorn app:app --port 8000  

Verify:
http://localhost:8000/docs

---

### Step 2: Start Backend Server (Node.js)

Open Terminal 2:

cd backend  
npm install  
npm run dev  

Verify:
http://localhost:5000/api/sensors/latest

---

### Step 3: Open Frontend Dashboard

Open the following file in browser or using Live Server:

frontend/index.html

---

## API Endpoints

Sensor APIs:
- GET /api/sensors/latest
- GET /api/sensors/history?limit=10

Decision API:
- GET /api/decision/latest

---

## Machine Learning Logic

- Model trained offline using historical sensor data
- Input parameters:
  - Soil Moisture
  - Temperature
  - Humidity
  - Light Intensity
- Output:
  - Irrigation Required / Not Required
- Final decision also considers weather forecast data

---

## Database

- MongoDB Atlas (cloud)
- Stores sensor readings and irrigation decisions
- Ensure IP access is enabled:
  Network Access → Allow 0.0.0.0/0

---

## Demo Notes

- Initial UI values are placeholders
- Live data replaces placeholders once backend services are running
- Flat graphs indicate stable sensor values during testing

---

## Use Cases

- Smart agriculture
- Automated irrigation
- Water conservation
- AI + IoT integration demos

---

## Future Enhancements

- Real ESP32 sensor integration
- Manual pump control
- Cloud deployment
- Mobile app support

---

## License

This project is intended for educational and demonstration purposes only.
