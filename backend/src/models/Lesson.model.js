import mongoose from 'mongoose';

const i18nString = {
  type: Map,
  of: String,
};

const lessonSchema = new mongoose.Schema({
  title: i18nString,
  lessonType: { type: String, enum: ['video', 'text', 'quiz'], required: true },
  content: i18nString, 
  videoUrl: { type: String }, 
  duration: { type: Number }, 
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;