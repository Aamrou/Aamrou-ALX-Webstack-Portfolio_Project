const express = require('express');
const { protect } = require('../utils/authMiddleware');
const Quiz = require('../models/quizModel');

const router = express.Router();

// Fetch individual performance data
router.get('/performance', protect, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ 'leaderboard.userId': req.user.id });

    const performance = quizzes.map((quiz) => {
      const userEntry = quiz.leaderboard.find((entry) => entry.userId.toString() === req.user.id);
      return {
        quizTitle: quiz.title,
        attempts: quiz.attempts,
        score: userEntry ? userEntry.score : 0,
      };
    });

    res.status(200).json(performance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching performance data', error: error.message });
  }
});

module.exports = router;

