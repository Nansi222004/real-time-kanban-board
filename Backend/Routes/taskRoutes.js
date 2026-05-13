import express from "express";

import {
  createTask,
  getBoardTasks,
} from "../Controllers/taskController.js";


import { protect } from "../Middleware/authMiddleware.js";
const router = express.Router();

router.post(
  "/",
  protect,
  createTask
);

router.get(
  "/board/:boardId",
  protect,
  getBoardTasks
);

export default router;