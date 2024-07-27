import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
});

export const Result = mongoose.model('Result', ResultSchema);
