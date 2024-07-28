// backend/models/CodingQuestion.js
import mongoose from 'mongoose';

const CodingQuestionSchema = new mongoose.Schema({
  problemStatement: { type: String, required: true },
  sampleInput: { type: String, required: true },
  sampleOutput: { type: String, required: true },
  constraints: { type: String, required: true },
  hiddenTestCases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    },
  ],
});

export const CodingQuestion = mongoose.model('CodingQuestion', CodingQuestionSchema);

