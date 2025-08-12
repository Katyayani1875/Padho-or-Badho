import asyncHandler from 'express-async-handler';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Lesson from '../models/Lesson.model.js';
import mongoose from 'mongoose';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const askAI = asyncHandler(async (req, res) => {
  const { question, lessonId } = req.body;
  if (!question || !lessonId) {
    res.status(400);
    throw new Error('Please provide a question and a lesson ID.');
  }
  if (!mongoose.Types.ObjectId.isValid(lessonId)) {
    res.status(400);
    throw new Error('Invalid Lesson ID format');
  }
  const lesson = await Lesson.findById(lessonId).lean();
  if (!lesson) {
    res.status(404);
    throw new Error('Lesson context not found');
  }
  const prompt = `
    You are "Padho और Badho," a friendly and encouraging AI tutor for students aged 8-16 in India. 
    Your goal is to explain concepts simply, without giving away direct answers to quiz questions.
    
    The student is currently studying the lesson titled: "${lesson.title.en}".
    The lesson is about: ${lesson.content ? lesson.content.en : 'a video lesson on this topic'}.
    
    The student has asked the following question: "${question}"

    Please provide a helpful and simple answer. If the question is unrelated to the lesson, gently guide them back to the topic. Keep your response concise and easy to understand.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();
    res.json({ answer });
    
  } catch (error) {

    console.error('Error from Gemini API:', error);
    res.status(503); 
    throw new Error('The AI tutor is currently unavailable. Please try again later.');
  }
});

export { askAI };