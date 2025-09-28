import express from "express";
import {
  adminLogin,
  adminRegister,
  recruiterLogin,
  visitorLogin,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/register", adminRegister);
router.post("/recruiter-login", recruiterLogin);
router.post("/visitor-login", visitorLogin);

export default router;
