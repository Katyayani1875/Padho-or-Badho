import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose'; // <-- 1. IMPORT MONGOOSE
import Progress from '../models/Progress.model.js';
import User from '../models/User.model.js';
import Lesson from '../models/Lesson.model.js';

// @desc    Submit quiz results and update progress
// @route   POST /api/v1/progress/quiz
// @access  Private
const submitQuiz = asyncHandler(async (req, res) => {
  const { lessonId, score, totalQuestions } = req.body;
  const userId = req.user._id;

  // --- 2. THE DEFINITIVE FIX: VALIDATE THE ID ---
  // First, check if the provided lessonId is a valid MongoDB ObjectId format.
  // This prevents crashes from malformed IDs before we even query the database.
  if (!mongoose.Types.ObjectId.isValid(lessonId)) {
    res.status(400); // 400 Bad Request is more appropriate for an invalid ID format
    throw new Error('Invalid Lesson ID format');
  }

  // Now, we can safely find the lesson.
  const lesson = await Lesson.findById(lessonId);
  
  // This check now correctly handles cases where the ID format is valid, but the lesson doesn't exist.
  if (!lesson) {
    res.status(404);
    throw new Error('Lesson not found');
  }

  // Calculate XP earned (e.g., 10 XP per correct answer)
  const xpGained = score * 10;

  // Create or update progress for this lesson
  const progress = await Progress.findOneAndUpdate(
    { user: userId, lesson: lessonId },
    {
      user: userId,
      lesson: lessonId,
      status: 'completed',
      quizScore: score,
      totalQuestions,
      completedAt: Date.now(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // Update user's total XP points
  await User.findByIdAndUpdate(userId, { $inc: { 'studentProfile.xpPoints': xpGained } });

  res.status(201).json({
    message: 'Progress updated successfully!',
    progress,
    xpGained,
  });
});

export { submitQuiz };