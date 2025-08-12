import mongoose from 'mongoose';

const i18nString = {
  type: Map,
  of: String, 
};

const subjectSchema = new mongoose.Schema({
  name: i18nString,
  description: i18nString,
  iconUrl: { type: String, required: true },
  gradeLevel: { type: Number, required: true },
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;