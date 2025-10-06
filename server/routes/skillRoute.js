import express from "express";
import {
  getSkills,
  getSkillbyId,
  addSkill,
  editSkill,
  deleteSkill,
} from "../controllers/skillControllers.js";

import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getSkills);
router.get("/:id", getSkillbyId);
router.post("/", authenticateToken, addSkill);
router.put("/:id", authenticateToken, editSkill);
router.delete("/:id", authenticateToken, deleteSkill);

export default router;
