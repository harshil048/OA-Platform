// backend/models/QuestionSet.js
import mongoose from 'mongoose';

const QuestionSetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  codingQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CodingQuestion' }],
  databaseQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DatabaseQuestion' }],
  aptitudeQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AptitudeQuestion' }],
});

export const QuestionSet = mongoose.model('QuestionSet', QuestionSetSchema);

