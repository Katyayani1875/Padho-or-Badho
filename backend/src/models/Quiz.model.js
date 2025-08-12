import mongoose from 'mongoose';

const i18nString = {
  type: Map,
  of: String,
};

const optionSchema = new mongoose.Schema({
  text: i18nString,
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
  questionText: i18nString,
  options: [optionSchema],
  explanation: i18nString,
});

const quizSchema = new mongoose.Schema({
  title: i18nString,
  questions: [questionSchema],
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;