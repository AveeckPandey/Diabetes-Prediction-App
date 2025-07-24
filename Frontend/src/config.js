// src/config.js
const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.com'  // Replace with your actual backend URL
    : 'http://127.0.0.1:8000'
};

export default config;