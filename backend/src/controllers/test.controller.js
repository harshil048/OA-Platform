// backend/controllers/testController.js
import { Test } from '../models/test.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createTest = asyncHandler(async (req, res, next) => {
  const { title, description, questions, scheduledAt } = req.body;
  const createdBy = req.user._id;

  const test = new Test({
    title,
    description,
    questions,
    createdBy,
    scheduledAt,
  });

  await test.save();
  res.status(201).json(new ApiResponse(201, test, 'Test created successfully'));
});

export const getTests = asyncHandler(async (req, res, next) => {
  const tests = await Test.find().populate('questions createdBy');
  res.status(200).json(new ApiResponse(200, tests, 'Tests retrieved successfully'));
});

export const getTestById = asyncHandler(async (req, res, next) => {
  const test = await Test.findById(req.params.id).populate('questions createdBy');
  if (!test) {
    return next(new ApiError(404, 'Test not found'));
  }
  res.status(200).json(new ApiResponse(200, test, 'Test retrieved successfully'));
});

export const updateTest = asyncHandler(async (req, res, next) => {
  const { title, description, questions, scheduledAt } = req.body;

  const test = await Test.findById(req.params.id);
  if (!test) {
    return next(new ApiError(404, 'Test not found'));
  }

  if (title) test.title = title;
  if (description) test.description = description;
  if (questions) test.questions = questions;
  if (scheduledAt) test.scheduledAt = scheduledAt;

  await test.save();
  res.status(200).json(new ApiResponse(200, test, 'Test updated successfully'));
});

export const deleteTest = asyncHandler(async (req, res, next) => {
  const test = await Test.findByIdAndDelete(req.params.id);
  if (!test) {
    return next(new ApiError(404, 'Test not found'));
  }
  res.status(200).json(new ApiResponse(200, null, 'Test deleted successfully'));
});
