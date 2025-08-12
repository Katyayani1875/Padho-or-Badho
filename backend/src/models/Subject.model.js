import mongoose from 'mongoose';

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
  // --- FIX STARTS HERE ---
  // We uncomment this line to enable the chapters array
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  // --- FIX ENDS HERE ---
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;