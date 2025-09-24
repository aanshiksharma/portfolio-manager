import express from "express";
import {
  getAdminConfig,
  editAdminConfig,
} from "../controllers/adminConfigControllers.js";

const router = express.Router();

router.get("/", getAdminConfig);
router.put("/", editAdminConfig);

export default router;
