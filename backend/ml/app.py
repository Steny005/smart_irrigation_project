from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import requests

# -------- CONFIG --------
API_KEY = "ddddec6f094f8cbdc75eb7f15445c786"
LAT = 9.456717872532293
LON = 76.52561688145256

MODEL_PATH = "irrigation_best_model.pkl"
model = joblib.load(MODEL_PATH)

app = FastAPI(title="Irrigation ML Service")

# -------- WEATHER --------
def get_weather():
    url = f"https://api.openweathermap.org/data/2.5/forecast?lat={LAT}&lon={LON}&appid={API_KEY}&units=metric"
    data = requests.get(url).json()
    return data["list"][0].get("rain", {}).get("3h", 0.0)

# -------- INPUT --------
class SensorInput(BaseModel):
    soil_moisture: float
    temperature: float
    humidity: float
    light: float
    tank_level: float

# -------- ML ENDPOINT --------
@app.post("/predict")
def predict(sensor: SensorInput):

    X = np.array([[sensor.soil_moisture,
                   sensor.temperature,
                   sensor.humidity,
                   sensor.light]])

    irrigation_needed = int(model.predict(X)[0])
    rain_next_3h = get_weather()

    pump = 0
    reason = "No irrigation required"

    if irrigation_needed == 1:
        if sensor.tank_level > 20 and rain_next_3h < 2.0:
            pump = 1
            reason = "ML predicts dry soil and no rain expected"
        elif rain_next_3h >= 2.0:
            reason = "Rain expected, irrigation delayed"
        else:
            reason = "Tank level too low"

    return {
        "pump": pump,
        "minutes": 5 if pump == 1 else 0,
        "reason": reason,
        "source": "ML + Weather"
    }
