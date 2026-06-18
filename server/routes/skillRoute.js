import express from "express";
import {
  getSkills,
  getSingleSkill,
  addSkill,
  editSkill,
  deleteSkill,
} from "../controllers/skillControllers.js";

import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getSkills);
router.get("/:slug", getSingleSkill);
router.post("/", authenticateToken, addSkill);
router.put("/:slug", authenticateToken, editSkill);
router.delete("/:id", authenticateToken, deleteSkill);

export default router;
