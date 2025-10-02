import express from "express";
import {
  getProjects,
  getSingleProject,
  addProject,
  editProject,
  deleteProject,
} from "../controllers/projectControllers.js";

import authenticateToken from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getSingleProject);
router.post("/", authenticateToken, addProject);
router.put("/:id", authenticateToken, upload.single("coverImage"), editProject);
router.delete("/:id", authenticateToken, deleteProject);

export default router;
