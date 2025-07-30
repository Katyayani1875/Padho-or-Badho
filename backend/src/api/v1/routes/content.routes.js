// backend/src/api/v1/routes/content.routes.js

const express = require('express');
const { getAllSubjects } = require('../../../controllers/content.controller');
const { protect } = require('../../../middlewares/auth.middleware');

const router = express.Router();

// This route will be protected, meaning a user must be logged in to access it.
router.route('/subjects').get(protect, getAllSubjects);

// We will add more routes here later
// e.g., router.route('/lessons/:chapterId').get(protect, getLessons);

module.exports = router;