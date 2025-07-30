// backend/src/models/Subject.model.js

const mongoose = require('mongoose');

// Using a Map for multilingual support from the start
const i18nString = {
  type: Map,
  of: String, // e.g., { en: 'Mathematics', hi: 'गणित' }
};

const subjectSchema = new mongoose.Schema({
  name: i18nString,
  description: i18nString,
  iconUrl: { type: String, required: true },
  gradeLevel: { type: Number, required: true },
  // We can add chapters later
  // chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;