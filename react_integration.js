import React, { useState } from 'react';
import axios from 'axios';

function SalaryPrediction() {
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');
  const [predictedSalary, setPredictedSalary] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Make API call to the RESTful service
    axios.get('/predict-salary', {
      params: {
        jobRole,
        location
      }
    })
    .then(response => {
      const { predictedSalary } = response.data;
      setPredictedSalary(predictedSalary);
    })
    .catch(error => {
      console.error(error);
      setPredictedSalary(null);
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Job Role:
          <input type="text" value={jobRole} onChange={e => setJobRole(e.target.value)} />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
        </label>
        <button type="submit">Predict Salary</button>
      </form>

      {predictedSalary !== null && (
        <div>
          Predicted Salary: {predictedSalary}
        </div>
      )}
    </div>
  );
}
