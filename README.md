# 🩺 Diabetes Prediction System

A machine learning web application that predicts whether a person is **positive** or **negative** for diabetes based on health parameters like glucose, BMI, insulin, and more.

---
## 🧠 Features

- 🧾 Input health data (Glucose, BMI, Insulin, etc.)
- 🔍 Predicts diabetes status using a trained ML model
- 📊 Clean and user-friendly interface
- 📁 Built using Python and scikit-learn
- 🧪 Trained on the **Pima Indian Diabetes Dataset**

---

## 🖥️ Tech Stack

| Category      | Tools/Frameworks             |
|---------------|------------------------------|
| ML & Data     | `scikit-learn`, `pandas`, `numpy` |
| Backend/API   | `Flask` or `Streamlit`       |
| Frontend (if any) | `React` (optional) |
| Testing    | `PostMan` |

---

## 📸 Screenshots

| Input Form | Prediction Result |
|------------|------------------|
| ![form](https://github.com/AveeckPandey/Diabetes-Prediction-App/blob/main/Frontend/src/assets/Form.png?raw=true) | ![result](https://github.com/AveeckPandey/Diabetes-Prediction-App/blob/main/Frontend/src/assets/Negative.png?raw=true) |

---

## 📂 Project Structure
Diabetes-Prediction-App/
├── Backend/
│   ├── __pycache__/
│   ├── venv/
│   │   ├── Include/
│   │   ├── Lib/
│   │   └── Scripts/
│   ├── .gitignore
│   ├── diabetes_model.joblib
│   ├── diabetes.csv
│   ├── main.py
│   ├── Procfile
│   ├── requirements.txt
│   └── scaler.joblib
│

├── Frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│

└── vercel.json

