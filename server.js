const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Set up mock database (replace with real DB if needed)
let usersDB = {
  '123456789': { diamonds: 100000, rank: 'Master', skins: ['Season 1', 'Season 2'] },
  // Add more users as needed
};

// Middleware
app.use(bodyParser.json());

// API endpoint to adjust settings and claim rewards
app.post('/adjustSettings', (req, res) => {
  const { uid, diamonds, rank, skins } = req.body;

  if (!usersDB[uid]) {
    return res.status(400).json({ message: 'User not found' });
  }

  usersDB[uid].diamonds += diamonds || 0;
  usersDB[uid].rank = rank || usersDB[uid].rank;
  usersDB[uid].skins = [...usersDB[uid].skins, ...skins];

  res.json({
    message: 'Settings updated successfully!',
    rewards: {
      diamonds: 100000,
      skins: ['Season 1 Bundle', 'Season 2 Bundle'],
      message: 'Thanks for joining Xeno Program!'
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Xeno Modz Proxy Server is running on http://localhost:3000');
});
