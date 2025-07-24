from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from fastapi.middleware.cors import CORSMiddleware
import joblib

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-project.vercel.app"],  # Add Vercel URL after deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionInput(BaseModel):
    pregnancies: int
    glucose: int
    bloodPressure: int
    skinThickness: int
    insulin: int
    bmi: float
    diabetesPedigree: float
    age: int

# Load pre-trained model and scaler (or train and save if not exists)
model_file = "diabetes_model.joblib"
scaler_file = "scaler.joblib"
try:
    model = joblib.load(model_file)
    scaler = joblib.load(scaler_file)
    print("Loaded pre-trained model and scaler.")
except FileNotFoundError:
    print("Model files not found, training a new model...")
    data = pd.read_csv('diabetes.csv')
    X = data.drop('Outcome', axis=1)
    y = data['Outcome']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train_scaled, y_train)
    joblib.dump(model, model_file)
    joblib.dump(scaler, scaler_file)
    print("New model and scaler trained and saved.")

@app.post("/predict/")
async def predict_diabetes(data: PredictionInput):
    input_data = np.array([[data.pregnancies, data.glucose, data.bloodPressure,
                           data.skinThickness, data.insulin, data.bmi,
                           data.diabetesPedigree, data.age]])
    input_data_scaled = scaler.transform(input_data)
    prediction = model.predict(input_data_scaled)[0]
    result = "Positive" if prediction == 1 else "Negative"
    return {"result": result}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}