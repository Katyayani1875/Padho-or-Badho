import mongoose from 'mongoose';

const i18nString = {
  type: Map,
  of: String,
};

const chapterSchema = new mongoose.Schema({
  title: i18nString,
  description: i18nString,
  chapterNumber: { type: Number, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
}, { timestamps: true });

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;