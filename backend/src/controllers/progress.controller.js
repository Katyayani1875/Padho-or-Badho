import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Progress from '../models/Progress.model.js';
import User from '../models/User.model.js';
import Lesson from '../models/Lesson.model.js';
import Badge from '../models/Badge.model.js'; // 1. Import Badge model

// @desc    Submit quiz results and update progress
// @route   POST /api/v1/progress/quiz
// @access  Private
const submitQuiz = asyncHandler(async (req, res) => {
  const { lessonId, score, totalQuestions } = req.body;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(lessonId)) {
    res.status(400);
    throw new Error('Invalid Lesson ID format');
  }

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    res.status(404);
    throw new Error('Lesson not found');
  }

  const xpGained = score * 10;

  const progress = await Progress.findOneAndUpdate(
    { user: userId, lesson: lessonId },
    { status: 'completed', quizScore: score, totalQuestions, completedAt: Date.now() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const user = await User.findByIdAndUpdate(userId, 
    { $inc: { 'studentProfile.xpPoints': xpGained } }, 
    { new: true }
  );

  let newlyAwardedBadge = null;

  const firstQuizBadge = await Badge.findOne({ criteria: 'COMPLETE_QUIZ', criteriaValue: '1' });
  if (firstQuizBadge && !user.studentProfile.badges.includes(firstQuizBadge._id)) {
    const quizCount = await Progress.countDocuments({ user: userId, status: 'completed' });
    if (quizCount === 1) {
      user.studentProfile.badges.push(firstQuizBadge._id);
      await user.save();
      newlyAwardedBadge = firstQuizBadge;
    }
  }
  res.status(201).json({
    message: 'Progress updated successfully!',
    progress,
    xpGained,
    newlyAwardedBadge, 
  });
});

export { submitQuiz };