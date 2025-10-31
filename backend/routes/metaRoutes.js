import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getUserMeta, addUserMeta } from '../controllers/metaController.js';

const router = express.Router();

router.get('/', authMiddleware, getUserMeta);
router.post('/', authMiddleware, addUserMeta);

export default router;
