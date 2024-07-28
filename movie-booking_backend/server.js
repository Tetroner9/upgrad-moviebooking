const express = require('express');
const app = express();

// Dynamic Routes
app.get('/movies', (req, res) => {
  res.send('All Movies Data in JSON format from Mongo DB');
});

app.get('/genres', (req, res) => {
  res.send('All Genres Data in JSON format from Mongo DB');
});

app.get('/artists', (req, res) => {
  res.send('All Artists Data in JSON format from Mongo DB');
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
