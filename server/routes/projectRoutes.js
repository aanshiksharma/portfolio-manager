import express from "express";
import {
  getProjects,
  getSingleProject,
  addProject,
  editProject,
  deleteProject,
} from "../controllers/projectControllers.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getSingleProject);
router.post("/", addProject);
router.put("/:id", editProject);
router.delete("/:id", deleteProject);

export default router;
