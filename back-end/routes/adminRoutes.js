const express = require('express');
const { protect } = require('../utils/authMiddleware');
const Quiz = require('../models/quizModel');

const router = express.Router();

// Get all quizzes for management
router.get('/quizzes', protect, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied' });
  }

  try {
    const quizzes = await Quiz.find().select('title createdBy attempts');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
});

// Delete a quiz
router.delete('/quiz/:id', protect, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied' });
  }

  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting quiz', error: error.message });
  }
});

module.exports = router;

