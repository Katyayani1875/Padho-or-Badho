import express from 'express';
import { getUserProfile } from '../../../controllers/user.controller.js';
import { protect } from '../../../middlewares/auth.middleware.js';
const router = express.Router();

router.route('/profile').get(protect, getUserProfile);

export default router;