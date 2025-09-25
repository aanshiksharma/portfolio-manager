import express from "express";
import {
  getAdmin,
  updateAdmin,
  addAdmin,
} from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/", getAdmin);
router.post("/", addAdmin);
router.put("/:id", updateAdmin);

export default router;
