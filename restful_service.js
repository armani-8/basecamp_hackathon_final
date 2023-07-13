const express = require('express');
const { PythonShell } = require('python-shell');

const app = express();
const port = 3000;

// Route to handle salary prediction
app.get('/predict-salary', (req, res) => {
  const { jobRole, location } = req.query;

  // Call the Python script to get the predicted salary
  PythonShell.run('predict_salary.py', { args: [jobRole, location] }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error occurred');
    } else {
      const predictedSalary = parseFloat(result);
      res.json({ predictedSalary });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
