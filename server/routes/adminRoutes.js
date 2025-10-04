import express from "express";
import {
  getAdmin,
  getAdminById,
  updateAdmin,
  changePassword,
} from "../controllers/adminControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAdmin);
router.get("/:id", getAdminById);
router.put("/:id", authenticateToken, updateAdmin);
router.patch("/change-password/:id", authenticateToken, changePassword);

export default router;
