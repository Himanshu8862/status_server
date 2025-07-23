const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // update for frontend
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

// Routes (to be added soon)
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
