import express from 'express';
import {
  getAllSubjects,
  getChaptersBySubject,
  getLessonDetails,
  createSubject, // For admin
} from '../../../controllers/content.controller.js';
import { protect, admin } from '../../../middlewares/auth.middleware.js';
import { upload } from '../../../middlewares/upload.middleware.js';

const router = express.Router();

// Enable detailed error logging for development
const errorLogger = (err, req, res, next) => {
  console.error('Route Error:', err);
  next(err);
};

// @desc    Admin route to create a new subject with an icon
// @route   POST /api/v1/content/subjects
router.route('/subjects').post(protect, admin, upload.single('icon'), createSubject);

// @desc    Public/User routes to get content
router.route('/subjects').get(protect, errorLogger, getAllSubjects);
router.route('/subjects/:subjectId/chapters').get(protect, errorLogger, getChaptersBySubject);
router.route('/lessons/:lessonId').get(protect, errorLogger, getLessonDetails);

export default router;