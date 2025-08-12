import asyncHandler from 'express-async-handler';
import User from '../models/User.model.js';

const getLeaderboard = asyncHandler(async (req, res) => {
  const topStudents = await User.find({ role: 'student' })
    .sort({ 'studentProfile.xpPoints': -1 })
    .limit(10) // Get top 10
    .select('name studentProfile.xpPoints avatar'); 

  res.json(topStudents);
});

export { getLeaderboard };