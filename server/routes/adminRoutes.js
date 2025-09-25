import express from "express";
import {
  getAdmin,
  updateAdmin,
  addAdmin,
  changePassword,
} from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/", getAdmin);
router.post("/", addAdmin);
router.put("/:id", updateAdmin);
router.patch("/:id/change-password", changePassword);

export default router;
