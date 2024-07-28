// backend/models/DatabaseQuestion.js
import mongoose from 'mongoose';

const DatabaseQuestionSchema = new mongoose.Schema({
  schema: { type: String, required: true },
  problemStatement: { type: String, required: true },
  sampleInput: { type: String, required: true },
  sampleOutput: { type: String, required: true },
  constraints: { type: String, required: true },
  hiddenTestCases: [
    {
      query: { type: String, required: true },
      expectedOutput: { type: String, required: true },
    },
  ],
});

export const DatabaseQuestion = mongoose.model('DatabaseQuestion', DatabaseQuestionSchema);

