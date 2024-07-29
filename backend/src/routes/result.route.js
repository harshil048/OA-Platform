// backend/routes/result.js
import express from 'express';
import {
  createResult,
  getResults,
  getResultById,
  getResultsByCandidate,
  deleteResult,
} from '../controllers/result.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/', verifyJWT, createResult); // Create a new result
router.get('/', verifyJWT, getResults); // Get all results
router.get('/:id', verifyJWT, getResultById); // Get a single result by ID
router.get('/candidate/:candidateId', verifyJWT, getResultsByCandidate); // Get results by candidate
router.delete('/:id', verifyJWT, deleteResult); // Delete a result by ID

export default router;
