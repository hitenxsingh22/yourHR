// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// MongoDB connection URI from environment variables
const mongoUri = process.env.MONGODB_URI;
let bucket; // Variable to hold GridFSBucket instance

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  
  // Initialize GridFSBucket after successful MongoDB connection
  const db = mongoose.connection.db;
  bucket = new GridFSBucket(db, { bucketName: 'uploads' });
  console.log('GridFSBucket initialized');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Import User model
const User = require('./models/User');

// Configure Multer for handling file uploads
const storage = multer.memoryStorage(); // Store uploaded files in memory
const upload = multer({ storage });

// API route for user signup and resume upload
app.post('/api/signup', upload.single('resume'), async (req, res) => {
  const { name, email, jobPosition } = req.body; // Extract name, email, and jobPosition from request body
  const { buffer, mimetype, originalname } = req.file; // Extract file information from request

  // Check if a file was uploaded
  if (!buffer) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Check if GridFSBucket is initialized
  if (!bucket) {
    return res.status(500).json({ error: 'GridFS bucket not initialized' });
  }

  try {
    // Create an upload stream to store the file in GridFS
    const uploadStream = bucket.openUploadStream(originalname, {
      contentType: mimetype
    });
    uploadStream.end(buffer); // End the upload stream with the file buffer

    // Handle the finish event of the upload stream
    uploadStream.on('finish', async () => {
      try {
        // Create a new user with resume details
        const newUser = new User({
          name,
          email,
          jobPosition, // Include jobPosition in the user data
          resume: {
            id: uploadStream.id,
            contentType: mimetype
          }
        });

        // Save the new user to the database
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Handle errors during the file upload process
    uploadStream.on('error', (error) => {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: error.message });
    });
  } catch (error) {
    console.error('Error in signup route:', error);
    res.status(500).json({ error: error.message });
  }
});

// API route for downloading a resume by filename
// API route for downloading a resume by _id
app.get('/api/resume/:id', async (req, res) => {
  const { id } = req.params; // Extract the _id from request parameters

  // Convert the string id to a MongoDB ObjectId
  const objectId = new mongoose.Types.ObjectId(id);

  // Check if GridFSBucket is initialized
  if (!bucket) {
    return res.status(500).json({ error: 'GridFS bucket not initialized' });
  }

  try {
    // Create a download stream to retrieve the file from GridFS by _id
    const downloadStream = bucket.openDownloadStream(objectId);

    // Set the appropriate content type
    res.setHeader('Content-Type', 'application/pdf'); // Adjust based on contentType stored in DB

    // Pipe the file data to the response object
    downloadStream.pipe(res);

    // Handle errors during the file download process
    downloadStream.on('error', (error) => {
      console.error('Error downloading file:', error);
      res.status(500).json({ error: 'Error downloading file' });
    });

    // End the response when the download is complete
    downloadStream.on('end', () => {
      res.end();
    });
  } catch (error) {
    console.error('Error in download route:', error);
    res.status(500).json({ error: error.message });
  }
});


// Start the Express server
app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});

