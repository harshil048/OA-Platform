import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  type: { type: String, enum: ['coding', 'aptitude', 'database'], required: true },
  questionText: { type: String, required: true },
  options: { type: [String] }, // For aptitude questions
  correctAnswer: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coding: {
    language: { type: String }, // e.g., 'javascript', 'python'
    testCases: [
      {
        input: { type: String },
        output: { type: String },
      },
    ],
  },
  database: {
    schema: { type: String }, // Example schema
    expectedOutput: { type: String },
  },
});

export const Question = mongoose.model('Question', QuestionSchema);
