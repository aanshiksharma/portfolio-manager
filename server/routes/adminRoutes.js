import express from "express";
import {
  getAdmin,
  getAdminById,
  updateAdmin,
  changePassword,
} from "../controllers/adminControllers.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAdmin);
router.get("/:id", getAdminById);
router.put("/:id", authenticateToken, updateAdmin);
router.patch("/:id/change-password", authenticateToken, changePassword);

export default router;
