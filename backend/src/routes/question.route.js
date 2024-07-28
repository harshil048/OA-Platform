// backend/routes/questionSet.js
import express from 'express';
import {
  createQuestionSet,
  getQuestionSets,
  getQuestionSetById,
  updateQuestionSet,
  deleteQuestionSet,
} from '../controllers/questionSet.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/', verifyJWT, createQuestionSet);  // Create a new question set
router.get('/', verifyJWT, getQuestionSets);     // Get all question sets
router.get('/:id', verifyJWT, getQuestionSetById); // Get a single question set by ID
router.put('/:id', verifyJWT, updateQuestionSet);  // Update a question set by ID
router.delete('/:id', verifyJWT, deleteQuestionSet); // Delete a question set by ID

export default router;
