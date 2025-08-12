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
const errorLogger = (err, req, res, next) => {
  console.error('Route Error:', err);
  next(err);
};

router.route('/subjects').post(protect, admin, upload.single('icon'), createSubject);
router.route('/subjects').get(protect, errorLogger, getAllSubjects);
router.route('/subjects/:subjectId/chapters').get(protect, errorLogger, getChaptersBySubject);
router.route('/lessons/:lessonId').get(protect, errorLogger, getLessonDetails);

export default router;