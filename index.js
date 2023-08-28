const express = require('express');
const app = express();
const PORT = 3000;

// Array to store the history of operations
const history = [];

// Middleware to parse incoming request URL and perform calculations
app.get('/:operator/:num1/:num2', (req, res) => {
  const operator = req.params.operator;
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);

  let result;
  switch (operator) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num1 / num2;
      break;
    default:
      return res.status(400).send('Invalid operator');
  }

  // Store the operation in history, keeping the latest 20 operations
  history.push({ operator, num1, num2, result });
  if (history.length > 20) {
    history.shift();
  }

  res.send(`Result: ${result}`);
});

// Route to view history
app.get('/history', (req, res) => {
  res.json(history);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
