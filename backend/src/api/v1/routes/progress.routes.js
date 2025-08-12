import express from 'express';
import { submitQuiz } from '../../../controllers/progress.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';

const router = express.Router();

// @desc    Submit quiz results and update progress
// @route   POST /api/v1/progress/quiz
router.route('/quiz').post(protect, submitQuiz);

export default router;