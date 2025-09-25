import express from "express";
import {
  getProjects,
  addProject,
  editProject,
  deleteProject,
} from "../controllers/projectControllers.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", addProject);
router.put("/:id", editProject);
router.delete("/:id", deleteProject);

export default router;
