import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Subject from '../models/Subject.model.js';
import Chapter from '../models/Chapter.model.js';
import Lesson from '../models/Lesson.model.js';
import Quiz from '../models/Quiz.model.js';

// @desc    Fetch all subjects
// @route   GET /api/v1/content/subjects
// @access  Private
const getAllSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({});
  res.json(subjects);
});

// @desc    Get all chapters for a specific subject
// @route   GET /api/v1/content/subjects/:subjectId/chapters
// @access  Private
const getChaptersBySubject = asyncHandler(async (req, res) => {
  const chapters = await Chapter.find({ subject: req.params.subjectId }).populate('lessons');
  if (chapters) {
    res.json(chapters);
  } else {
    res.status(404);
    throw new Error('Chapters not found for this subject');
  }
});

// @desc    Get details of a single lesson
// @route   GET /api/v1/content/lessons/:lessonId
// @access  Private
const getLessonDetails = asyncHandler(async (req, res) => {
  const { lessonId } = req.params;
  
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid lesson ID format'
      });
    }

    const lesson = await Lesson.findById(lessonId)
      .populate({
        path: 'quiz',
        select: '-__v -createdAt -updatedAt' // Exclude unnecessary fields
      })
      .populate({
        path: 'chapter',
        select: 'title chapterNumber'
      })
      .lean();

    if (!lesson) {
      return res.status(404).json({ 
        success: false,
        message: 'Lesson not found'
      });
    }

    // Safely handle missing quiz
    if (lesson.quiz === null) {
      lesson.quiz = undefined;
    }

    // Clean up response data
    const responseData = {
      ...lesson,
      quiz: lesson.quiz || undefined
    };

    return res.json({
      success: true,
      data: responseData
    });

  } catch (error) {
    console.error('Error in getLessonDetails:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error while fetching lesson',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }

});

// @desc    Create a new subject (Admin only)
// @route   POST /api/v1/content/subjects
// @access  Private/Admin
const createSubject = asyncHandler(async (req, res) => {
    const { name_en, name_hi, description_en, description_hi, gradeLevel } = req.body;
    
    const iconUrl = req.file ? req.file.path : '/uploads/default-icon.png';

    const subject = new Subject({
        name: { en: name_en, hi: name_hi },
        description: { en: description_en, hi: description_hi },
        iconUrl,
        gradeLevel,
    });

    const createdSubject = await subject.save();
    res.status(201).json(createdSubject);
});


export {
  getAllSubjects,
  getChaptersBySubject,
  getLessonDetails,
  createSubject,
};