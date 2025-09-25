import express from "express";
import {
  getSkills,
  addSkill,
  editSkill,
  deleteSkill,
} from "../controllers/skillControllers.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", addSkill);
router.put("/:id", editSkill);
router.delete("/:id", deleteSkill);

export default router;
