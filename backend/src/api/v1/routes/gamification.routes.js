import express from 'express';
import { getLeaderboard } from '../../../controllers/gamification.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/leaderboard').get(protect, getLeaderboard);

export default router;  