const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/db'); // make sure this connects properly
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const seed = require('./adminlogin/seed');

const app = express();

// --- Middleware ---
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname + '/public'));
app.use(cors());

// --- Mongoose configuration ---
mongoose.set('strictQuery', true); // removes deprecation warning

// --- Routes ---
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);

// --- Default Route (optional but helps test on Render) ---
app.get('/', (req, res) => {
  res.send('✅ Backend is Live and Running!');
});

// --- Seed admin data ---
seed.seedadmin();

// --- Start Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
