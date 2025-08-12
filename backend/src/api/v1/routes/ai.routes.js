import express from 'express';
import { askAI } from '../../../controllers/ai.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';

const router = express.Router();
router.route('/ask').post(protect, askAI);

export default router;