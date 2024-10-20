// src/components/MySales/MySales.js
import React, { useState } from 'react';
import './MySales.css'; // Create a CSS file for styling

const MySales = () => {
  const [salesData, setSalesData] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setSalesData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/predict-sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sales: salesData.split(',').map(Number) }), // Convert input to array of numbers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError('Error predicting sales. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="mysales-container">
      <h1>Sales Prediction</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={salesData}
          onChange={handleInputChange}
          placeholder="Enter last 7 days sales separated by commas"
          rows="4"
          className="input-textarea"
        />
        <button type="submit" className="submit-button">Predict</button>
      </form>
      {prediction && <h2>Predicted Sales for Next Day: ${prediction}</h2>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default MySales;
