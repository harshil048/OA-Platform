// backend/models/AptitudeQuestion.js
import mongoose from 'mongoose';

const AptitudeQuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

export const AptitudeQuestion = mongoose.model('AptitudeQuestion', AptitudeQuestionSchema);

