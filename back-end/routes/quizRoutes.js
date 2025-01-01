const express = require('express');
const { protect } = require('../utils/authMiddleware');
const Quiz = require('../models/quizModel');

const router = express.Router();

// Create a quiz (Admin Only)
router.post('/create', protect, async (req, res) => {
  const { title, questions } = req.body;

  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied' });
  }

  try {
    const newQuiz = new Quiz({ title, questions, createdBy: req.user.id });
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
  }
});

// Get all quizzes
router.get('/list', protect, async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('title');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
});

module.exports = router;

// Submit Quiz Answers
router.post('/:id/submit', protect, async (req, res) => {
  const { answers } = req.body;

  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.answer) score++;
    });

    quiz.attempts++;
    await quiz.save();

    res.status(200).json({ message: 'Quiz submitted', score });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error: error.message });
  }
});

// Leaderboard Logic
router.get('/:id/leaderboard', protect, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select('leaderboard');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.status(200).json(quiz.leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
});

// Update leaderboard upon quiz submission
router.post('/:id/submit', protect, async (req, res) => {
  const { answers } = req.body;

  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.answer) score++;
    });

    quiz.attempts++;
    await quiz.save();

    // Update leaderboard
    const userId = req.user.id;
    const existingEntry = quiz.leaderboard.find(entry => entry.userId.toString() === userId);

    if (existingEntry) {
      existingEntry.score = Math.max(existingEntry.score, score); // Update if higher score
    } else {
      quiz.leaderboard.push({ userId, score });
    }

    await quiz.save();
    res.status(200).json({ message: 'Quiz submitted', score });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error: error.message });
  }
});

// Get leaderboard for a quiz
router.get('/:id/leaderboard', protect, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('leaderboard.userId', 'name');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.status(200).json(quiz.leaderboard.sort((a, b) => b.score - a.score));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
});

// Fetch quiz analytics
router.get('/:id/analytics', protect, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const totalAttempts = quiz.attempts;
    const averageScore =
      quiz.leaderboard.reduce((acc, entry) => acc + entry.score, 0) / quiz.leaderboard.length || 0;

    res.status(200).json({ totalAttempts, averageScore });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});


