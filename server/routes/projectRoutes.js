import express from "express";
import {
  getProjects,
  getSingleProject,
  addProject,
  editProject,
  deleteProject,
} from "../controllers/projectControllers.js";

import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getSingleProject);
router.post("/", authenticateToken, addProject);
router.put("/:id", authenticateToken, editProject);
router.delete("/:id", authenticateToken, deleteProject);

export default router;
