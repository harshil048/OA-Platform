// backend/controllers/resultController.js
import { Result } from '../models/result.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createResult = asyncHandler(async (req, res, next) => {
  const { test, score } = req.body;
  const candidate = req.user._id; // Assuming the candidate is the logged-in user

  const result = new Result({
    test,
    candidate,
    score,
  });

  await result.save();
  res.status(201).json(new ApiResponse(201, result, 'Result created successfully'));
});

export const getResults = asyncHandler(async (req, res, next) => {
  const results = await Result.find().populate('test candidate');
  res.status(200).json(new ApiResponse(200, results, 'Results retrieved successfully'));
});

export const getResultById = asyncHandler(async (req, res, next) => {
  const result = await Result.findById(req.params.id).populate('test candidate');
  if (!result) {
    return next(new ApiError(404, 'Result not found'));
  }
  res.status(200).json(new ApiResponse(200, result, 'Result retrieved successfully'));
});

export const getResultsByCandidate = asyncHandler(async (req, res, next) => {
  const candidateId = req.params.candidateId;
  const results = await Result.find({ candidate: candidateId }).populate('test candidate');
  if (results.length === 0) {
    return next(new ApiError(404, 'Results not found for this candidate'));
  }
  res.status(200).json(new ApiResponse(200, results, 'Results retrieved successfully'));
});

export const deleteResult = asyncHandler(async (req, res, next) => {
  const result = await Result.findByIdAndDelete(req.params.id);
  if (!result) {
    return next(new ApiError(404, 'Result not found'));
  }
  res.status(200).json(new ApiResponse(200, null, 'Result deleted successfully'));
});
