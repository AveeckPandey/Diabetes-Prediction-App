import React, { useState } from 'react';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigree: '',
    age: ''
  });

  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending data:', formData); // Log the data being sent

    // Validate required fields
    if (!formData.pregnancies || !formData.glucose || !formData.bmi || !formData.age) {
      console.error('Missing required fields:', formData);
      setResult('Please fill all required fields');
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://your-project.vercel.app/api/predict/';
      console.log('Using API_URL:', API_URL); // Log the URL being used
      if (!/^(http|https):\/\/[^ "]+$/.test(API_URL)) {
        console.error('Malformed URI detected:', API_URL);
        setResult('Invalid URL configuration');
        return;
      }
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      console.log('Response status:', response.status); // Log status
      if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
      const data = await response.json();
      console.log('Response data:', data); // Log the response
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="prediction-form">
      <div>
        <label>Pregnancies:</label>
        <input
          type="number"
          name="pregnancies"
          value={formData.pregnancies}
          onChange={handleChange}
          placeholder="Number of times pregnant"
          required
          min="0"
        />
      </div>
      <div>
        <label>Glucose Level:</label>
        <input
          type="number"
          name="glucose"
          value={formData.glucose}
          onChange={handleChange}
          placeholder="Enter glucose level (mg/dL)"
          required
          min="0"
        />
      </div>
      <div>
        <label>Blood Pressure:</label>
        <input
          type="number"
          name="bloodPressure"
          value={formData.bloodPressure}
          onChange={handleChange}
          placeholder="Diastolic BP (mm Hg)"
          required
          min="0"
        />
      </div>
      <div>
        <label>Skin Thickness:</label>
        <input
          type="number"
          name="skinThickness"
          value={formData.skinThickness}
          onChange={handleChange}
          placeholder="Triceps skin fold (mm)"
          required
          min="0"
        />
      </div>
      <div>
        <label>Insulin:</label>
        <input
          type="number"
          name="insulin"
          value={formData.insulin}
          onChange={handleChange}
          placeholder="2-Hour serum insulin (mu U/ml)"
          required
          min="0"
        />
      </div>
      <div>
        <label>BMI:</label>
        <input
          type="number"
          name="bmi"
          value={formData.bmi}
          onChange={handleChange}
          placeholder="Enter BMI"
          required
          min="0"
          step="0.1"
        />
      </div>
      <div>
        <label>Diabetes Pedigree:</label>
        <input
          type="number"
          step="0.01"
          name="diabetesPedigree"
          value={formData.diabetesPedigree}
          onChange={handleChange}
          placeholder="Likelihood based on family history"
          required
          min="0"
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter age"
          required
          min="0"
        />
      </div>
      <button type="submit">Predict</button>
      <div id="result">{result}</div>
    </form>
  );
};

export default PredictionForm;