import express from "express";
import authMiddleware from "../middleware/auth.js";

import {
  addBlockedSite,
  getBlockedSites,
  removeBlockedSite
} from "../controllers/siteControllers.js"

const router = express.Router();

router.post('/', authMiddleware, addBlockedSite);

router.get('/', authMiddleware, getBlockedSites);

router.delete('/:id', authMiddleware, removeBlockedSite);

export default router