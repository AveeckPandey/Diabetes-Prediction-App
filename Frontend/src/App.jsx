import React from 'react';
import './App.css';
import PredictionForm from './components/PredictionsForm';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <div className="animation-section">
          <DotLottieReact 
            className='lottie'
            src="https://lottie.host/090d370f-1c04-4fa2-b38e-1bcbe47ed4a3/Swu4bz3lcZ.lottie"
            loop
            autoplay
            style={{width: "350px", height: "350px"}}
            onError={(err) => console.log("lottie Error", err)}
          />
        </div>
        
        <div className="form-section">
          <h1>Diabetes Prediction System</h1>
          <PredictionForm />
        </div>
      </div>
    </div>
  );
};

export default App;