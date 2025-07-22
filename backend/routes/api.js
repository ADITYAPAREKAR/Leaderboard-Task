const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new user
router.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const user = new User({ name, totalPoints: 0 });
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Claim points
router.post('/claim', async (req, res) => {
  try {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;
    
    await User.findByIdAndUpdate(userId, { $inc: { totalPoints: points } });
    
    const history = new ClaimHistory({ userId, points });
    await history.save();
    
    res.json({ points });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    const leaderboard = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get claim history
router.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .populate('userId', 'name')
      .sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;