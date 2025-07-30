// backend/src/controllers/content.controller.js

const Subject = require('../models/Subject.model');

// @desc    Fetch all subjects
// @route   GET /api/v1/content/subjects
// @access  Private (requires login)
const getAllSubjects = async (req, res, next) => {
  try {
    // We can filter by grade level later, e.g., req.user.studentProfile.grade
    const subjects = await Subject.find({});
    res.json(subjects);
  } catch (error) {
    next(error); // Pass error to the central error handler
  }
};

// We will add more functions here later, like getLessonsByChapter, etc.

module.exports = {
  getAllSubjects,
};