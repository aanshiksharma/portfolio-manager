import express from "express";
import {
  getProjects,
  addProject,
  editProject,
} from "../controllers/projectControllers.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/add", addProject);
router.post("/edit", editProject);

export default router;
