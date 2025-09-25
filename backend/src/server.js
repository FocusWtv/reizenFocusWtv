const express = require('express');
const cors = require('cors');
const { db } = require('./config/firebase');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Firebase test route
app.get('/api/test-firebase', async (req, res) => {
  try {
    // Test Firestore connection
    const testDoc = await db.collection('test').doc('connection').set({
      message: 'Firebase connected successfully!',
      timestamp: new Date()
    });
    
    res.json({ 
      message: 'Firebase Firestore connected successfully!',
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Firebase connection failed',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
