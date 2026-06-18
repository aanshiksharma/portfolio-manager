import express from "express";
import {
  getProjects,
  getSingleProject,
  addProject,
  editProject,
  deleteProject,
} from "../controllers/projectControllers.js";

import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:slug", getSingleProject);
router.post("/", authenticateToken, addProject);
router.put("/:slug", authenticateToken, editProject);
router.delete("/:id", authenticateToken, deleteProject);

export default router;
