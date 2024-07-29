// backend/routes/test.js
import express from 'express';
import {
  createTest,
  getTests,
  getTestById,
  updateTest,
  deleteTest,
} from '../controllers/test.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/', verifyJWT, createTest); // Create a new test
router.get('/', verifyJWT, getTests); // Get all tests
router.get('/:id', verifyJWT, getTestById); // Get a single test by ID
router.put('/:id', verifyJWT, updateTest); // Update a test by ID
router.delete('/:id', verifyJWT, deleteTest); // Delete a test by ID

export default router;
