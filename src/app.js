
const express = require('express');
const cors = require('cors');

const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express API is running');
});

app.use('/api/users', userRoutes);

module.exports = app;
