const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const User = require('./models/User');

// Load .env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.set('strictQuery', false); // Optional but recommended
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Atlas connected');
  initializeUsers(); // Only initialize after successful DB connection
})
.catch(err => console.error('❌ MongoDB connection error:', err));

// Initialize default users if not present
async function initializeUsers() {
  try {
    const defaultUsers = ['Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit', 'Neha', 'Ravi', 'Sonia', 'Vikram', 'Anita'];
    const userCount = await User.countDocuments();
    
    if (userCount === 0) {
      const users = defaultUsers.map(name => ({ name, totalPoints: 0 }));
      await User.insertMany(users);
      console.log('🆕 Default users inserted');
    }
  } catch (err) {
    console.error('❌ Error initializing users:', err);
  }
}

// Routes
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
