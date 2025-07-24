const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const orgRoutes = require('./routes/orgRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const incidentRoutes = require('./routes/incidentRoutes');


const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // update for frontend
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api', orgRoutes);
app.use('/api', serviceRoutes);
app.use('/api', incidentRoutes);



// Routes (to be added soon)
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
