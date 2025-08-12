import express from 'express';
import { submitQuiz } from '../../../controllers/progress.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';

const router = express.Router();
router.route('/quiz').post(protect, submitQuiz);

export default router;