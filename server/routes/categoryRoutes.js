import express from "express";

import {
  getCategories,
  getCategoryById,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);

export default router;
