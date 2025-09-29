const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { db, bucket } = require('./config/firebase');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

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

// ===== TRAVEL CARDS ROUTES =====

// Get all travel cards
app.get('/api/travel-cards', async (req, res) => {
  try {
    const snapshot = await db.collection('travelCards')
      .orderBy('createdAt', 'desc')
      .get();
    
    const travelCards = [];
    snapshot.forEach(doc => {
      travelCards.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json(travelCards);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch travel cards',
      details: error.message 
    });
  }
});

// Get single travel card
app.get('/api/travel-cards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('travelCards').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Travel card not found' });
    }
    
    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch travel card',
      details: error.message 
    });
  }
});

// Create new travel card
app.post('/api/travel-cards', async (req, res) => {
  try {
    const cardData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await db.collection('travelCards').add(cardData);
    
    res.status(201).json({
      id: docRef.id,
      message: 'Travel card created successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to create travel card',
      details: error.message 
    });
  }
});

// Update travel card
app.put('/api/travel-cards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };
    
    await db.collection('travelCards').doc(id).update(updateData);
    
    res.json({ message: 'Travel card updated successfully' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to update travel card',
      details: error.message 
    });
  }
});

// Delete travel card
app.delete('/api/travel-cards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('travelCards').doc(id).delete();
    
    res.json({ message: 'Travel card deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete travel card',
      details: error.message 
    });
  }
});

// ===== ADMIN EVENTS ROUTES (Info Events) =====

// Get all admin events
app.get('/api/admin-events', async (req, res) => {
  try {
    const snapshot = await db.collection('adminEvents')
      .orderBy('createdAt', 'desc')
      .get();
    
    const adminEvents = [];
    snapshot.forEach(doc => {
      adminEvents.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json(adminEvents);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch admin events',
      details: error.message 
    });
  }
});

// Get single admin event
app.get('/api/admin-events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('adminEvents').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Admin event not found' });
    }
    
    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch admin event',
      details: error.message 
    });
  }
});

// Create new admin event
app.post('/api/admin-events', async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await db.collection('adminEvents').add(eventData);
    
    res.status(201).json({
      id: docRef.id,
      message: 'Admin event created successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to create admin event',
      details: error.message 
    });
  }
});

// Update admin event
app.put('/api/admin-events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };
    
    await db.collection('adminEvents').doc(id).update(updateData);
    
    res.json({ message: 'Admin event updated successfully' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to update admin event',
      details: error.message 
    });
  }
});

// Delete admin event
app.delete('/api/admin-events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('adminEvents').doc(id).delete();
    
    res.json({ message: 'Admin event deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete admin event',
      details: error.message 
    });
  }
});

// ===== IMAGE UPLOAD ROUTE =====

app.post('/api/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { folder = 'images' } = req.body;
    const timestamp = Date.now();
    const fileName = `${folder}/${timestamp}_${req.file.originalname}`;
    
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on('error', (error) => {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Upload failed' });
    });

    stream.on('finish', async () => {
      try {
        await file.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        
        res.json({
          url: publicUrl,
          path: fileName
        });
      } catch (error) {
        console.error('Error making file public:', error);
        res.status(500).json({ error: 'Failed to make file public' });
      }
    });

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ 
      error: 'Upload failed',
      details: error.message 
    });
  }
});

// ===== DASHBOARD STATS ROUTE =====

app.get('/api/dashboard-stats', async (req, res) => {
  try {
    // Get counts from different collections
    const [travelCardsSnapshot, adminEventsSnapshot] = await Promise.all([
      db.collection('travelCards').get(),
      db.collection('adminEvents').get()
    ]);

    const stats = {
      totalTravelCards: travelCardsSnapshot.size,
      totalAdminEvents: adminEventsSnapshot.size,
      lastUpdated: new Date()
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch dashboard stats',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
