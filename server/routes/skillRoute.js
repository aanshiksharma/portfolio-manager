import express from "express";
import {
  getSkills,
  addSkill,
  editSkill,
} from "../controllers/skillControllers.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/add", addSkill);
router.post("/edit", editSkill);

export default router;
