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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Sending data:', formData);
    
    try {
      // Use environment variable for API URL, fallback to localhost for development
      const apiUrl = 'https://your-backend-url.com'; // Replace with your actual deployed backend URL
      
      const response = await fetch(`${apiUrl}/predict/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Add CORS headers if needed
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
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
          min="0"
          required
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
          min="0"
          required
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
          min="0"
          required
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
          min="0"
          required
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
          min="0"
          required
        />
      </div>
      <div>
        <label>BMI:</label>
        <input
          type="number"
          step="0.1"
          name="bmi"
          value={formData.bmi}
          onChange={handleChange}
          placeholder="Enter BMI"
          min="0"
          required
        />
      </div>
      <div>
        <label>Diabetes Pedigree:</label>
        <input
          type="number"
          step="0.001"
          name="diabetesPedigree"
          value={formData.diabetesPedigree}
          onChange={handleChange}
          placeholder="Likelihood based on family history"
          min="0"
          required
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
          min="1"
          max="120"
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Predicting...' : 'Predict'}
      </button>
      {result && <div id="result">{result}</div>}
    </form>
  );
};

export default PredictionForm;