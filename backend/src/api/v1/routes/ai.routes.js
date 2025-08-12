import express from 'express';
import { askAI } from '../../../controllers/ai.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';

const router = express.Router();

// This defines the final part of the path: /ask
// The full path will be /api/v1/ai/ask
router.route('/ask').post(protect, askAI);

export default router;