const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for specific origins
const corsOptions = {
  origin: ['https://codecomet.in', 'http://localhost:3000', 'https://demo.apnividya.in', 'https://apnividya.in', 'https://site.apnividya.in'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());

// MongoDB setup
require('dotenv').config();
const MONGO_URI = process.env.MONGO_DB_CONNECTION;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a mongoose schema and model for users
const UserSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  mobileNumber: String,
  image: String,
  college: String,
  subject: String,
  location: String,
  mode: String,
  mobileNumber: String,
  experience: String,
  qrCode: String,
  transaction: String,
  agree: Boolean,
});

const User = mongoose.model('User', UserSchema);

// API route to handle POST requests for user creation
app.post('/api/users', async (req, res) => {
  const {
    name,
    address,
    email,
    image,
    college,
    subject,
    location,
    mode,
    mobileNumber,
    experience,
    qrCode,
    transaction,
    agree
  } = req.body;

  try {
    // Create a new user using the User model
    const newUser = new User({
      name,
      address,
      email,
      mobileNumber,
      image,
      college,
      subject,
      location,
      mode,
      mobileNumber,
      experience,
      qrCode,
      transaction,
      agree,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API route to handle GET requests for fetching users
app.get('/api/users', async (req, res) => {
  try {
    // Use the User model to find all users in the database
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
