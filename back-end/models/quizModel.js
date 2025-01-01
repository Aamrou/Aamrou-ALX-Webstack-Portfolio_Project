const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  answer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attempts: { type: Number, default: 0 },
});

module.exports = mongoose.model('Quiz', quizSchema);

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number, required: true },
});

const quizSchema = new mongoose.Schema({
  // ...other fields
  leaderboard: [leaderboardSchema],
});
