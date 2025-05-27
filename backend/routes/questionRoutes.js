import express from 'express';
import {
  generateQuestion,
  validateAnswer,
  getSessionStats
} from '../controllers/questionController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', authMiddleware, generateQuestion);
router.post('/validate', authMiddleware, validateAnswer);
router.get('/stats', authMiddleware, getSessionStats);

export default router;