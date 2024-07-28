// backend/controllers/questionSetController.js
import { QuestionSet } from '../models/questionSet.model.js';
import { CodingQuestion } from '../models/codingQuestion.model.js';
import { DatabaseQuestion } from '../models/databaseQuestion.model.js';
import { AptitudeQuestion } from '../models/aptitudeQuestion.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createQuestionSet = asyncHandler(async (req, res, next) => {
  const { title, codingQuestions, databaseQuestions, aptitudeQuestions } = req.body;
  const createdBy = req.user._id;

  const questionSet = new QuestionSet({ title, createdBy });

  if (codingQuestions) {
    questionSet.codingQuestions = await CodingQuestion.insertMany(codingQuestions);
  }

  if (databaseQuestions) {
    questionSet.databaseQuestions = await DatabaseQuestion.insertMany(databaseQuestions);
  }

  if (aptitudeQuestions) {
    questionSet.aptitudeQuestions = await AptitudeQuestion.insertMany(aptitudeQuestions);
  }

  await questionSet.save();

  res.status(201).json(new ApiResponse(201, questionSet, 'Question set created successfully'));
});

export const getQuestionSets = asyncHandler(async (req, res, next) => {
  const questionSets = await QuestionSet.find()
    .populate('codingQuestions')
    .populate('databaseQuestions')
    .populate('aptitudeQuestions');
  res.status(200).json(new ApiResponse(200, questionSets, 'Question sets retrieved successfully'));
});

export const getQuestionSetById = asyncHandler(async (req, res, next) => {
  const questionSet = await QuestionSet.findById(req.params.id)
    .populate('codingQuestions')
    .populate('databaseQuestions')
    .populate('aptitudeQuestions');

  if (!questionSet) {
    return next(new ApiError(404, 'Question set not found'));
  }

  res.status(200).json(new ApiResponse(200, questionSet, 'Question set retrieved successfully'));
});

export const updateQuestionSet = asyncHandler(async (req, res, next) => {
  const { title, codingQuestions, databaseQuestions, aptitudeQuestions } = req.body;

  const questionSet = await QuestionSet.findById(req.params.id);

  if (!questionSet) {
    return next(new ApiError(404, 'Question set not found'));
  }

  if (title) questionSet.title = title;

  if (codingQuestions) {
    questionSet.codingQuestions = await CodingQuestion.insertMany(codingQuestions);
  }

  if (databaseQuestions) {
    questionSet.databaseQuestions = await DatabaseQuestion.insertMany(databaseQuestions);
  }

  if (aptitudeQuestions) {
    questionSet.aptitudeQuestions = await AptitudeQuestion.insertMany(aptitudeQuestions);
  }

  await questionSet.save();

  res.status(200).json(new ApiResponse(200, questionSet, 'Question set updated successfully'));
});

export const deleteQuestionSet = asyncHandler(async (req, res, next) => {
  const questionSet = await QuestionSet.findByIdAndDelete(req.params.id);

  if (!questionSet) {
    return next(new ApiError(404, 'Question set not found'));
  }

  res.status(200).json(new ApiResponse(200, null, 'Question set deleted successfully'));
});
