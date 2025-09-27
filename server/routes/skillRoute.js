import express from "express";
import {
  getSkills,
  addSkill,
  editSkill,
  deleteSkill,
} from "../controllers/skillControllers.js";

import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", authenticateToken, addSkill);
router.put("/:id", authenticateToken, editSkill);
router.delete("/:id", authenticateToken, deleteSkill);

export default router;
