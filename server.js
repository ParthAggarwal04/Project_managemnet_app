require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./server/config');

const authRoutes = require('./server/routes/authRoutes');
const projectRoutes = require('./server/routes/projectRoutes');
const taskRoutes = require('./server/routes/taskRoutes');
const dashboardRoutes = require('./server/routes/dashboardRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
