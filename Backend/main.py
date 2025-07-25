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
    allow_origins=["http://localhost:5173", "http://localhost:3000", "https://your-project.vercel.app"],  # Add common development ports
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Explicitly include OPTIONS
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

# Define feature names consistently
FEATURE_NAMES = [
    'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
    'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'
]

# Load pre-trained model and scaler (or train and save if not exists)
model_file = "diabetes_model.joblib"
scaler_file = "scaler.joblib"
feature_names_file = "feature_names.joblib"

try:
    model = joblib.load(model_file)
    scaler = joblib.load(scaler_file)
    feature_names = joblib.load(feature_names_file)
    print("Loaded pre-trained model, scaler, and feature names.")
except FileNotFoundError:
    print("Model files not found, training a new model...")
    
    # Load data
    data = pd.read_csv('diabetes.csv')
    X = data.drop('Outcome', axis=1)
    y = data['Outcome']
    
    # Ensure consistent feature names
    X.columns = FEATURE_NAMES  # Standardize column names
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Fit scaler on DataFrame (preserves feature names)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)  # X_train is still a DataFrame
    X_test_scaled = scaler.transform(X_test)
    
    # Train model
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train_scaled, y_train)
    
    # Save model, scaler, and feature names
    joblib.dump(model, model_file)
    joblib.dump(scaler, scaler_file)
    joblib.dump(FEATURE_NAMES, feature_names_file)
    
    feature_names = FEATURE_NAMES
    print("New model, scaler, and feature names trained and saved.")

@app.post("/predict/")
async def predict_diabetes(data: PredictionInput):
    try:
        # Create input DataFrame with proper column names
        input_data = pd.DataFrame([[
            data.pregnancies,
            data.glucose,
            data.bloodPressure,
            data.skinThickness,
            data.insulin,
            data.bmi,
            data.diabetesPedigree,
            data.age
        ]], columns=feature_names)
        
        # Scale the input data
        input_data_scaled = scaler.transform(input_data)
        
        # Make prediction
        prediction = model.predict(input_data_scaled)[0]
        probability = model.predict_proba(input_data_scaled)[0]
        
        result = "Positive" if prediction == 1 else "Negative"
        
        return {
            "result": result,
            "prediction": int(prediction),
            "probability": {
                "negative": round(float(probability[0]), 4),
                "positive": round(float(probability[1]), 4)
            }
        }
        
    except Exception as e:
        return {"error": str(e), "result": "Error"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Optional: Add endpoint to get feature names
@app.get("/features")
async def get_features():
    return {"feature_names": feature_names}

# Optional: Add endpoint to get model info
@app.get("/model-info")
async def get_model_info():
    return {
        "model_type": "Logistic Regression",
        "features": feature_names,
        "input_format": {
            "pregnancies": "int - Number of pregnancies",
            "glucose": "int - Glucose level",
            "bloodPressure": "int - Blood pressure",
            "skinThickness": "int - Skin thickness",
            "insulin": "int - Insulin level",
            "bmi": "float - Body Mass Index",
            "diabetesPedigree": "float - Diabetes pedigree function",
            "age": "int - Age"
        }
    }