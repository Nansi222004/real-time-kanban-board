import express from "express";
import { protect } from "../Middleware/authMiddleware.js";

import {
  createBoard,
  getBoards,
  getBoardById,
} from "../Controllers/boardController.js";

const router = express.Router();

router.post("/", protect, createBoard);

router.get("/", protect, getBoards);

router.get("/:id", protect, getBoardById);

export default router;