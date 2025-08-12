import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  status: { type: String, enum: ['not-started', 'in-progress', 'completed'], default: 'not-started' },
  quizScore: { type: Number },
  totalQuestions: { type: Number },
  completedAt: { type: Date },
}, { timestamps: true });

progressSchema.index({ user: 1, lesson: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;