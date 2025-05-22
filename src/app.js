const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const softwareRoutes = require('./routes/software.routes');
const requestRoutes = require('./routes/request.routes');

const app = express();

// ✅ CORS configuration for React frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

module.exports = app;
