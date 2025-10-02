import express from "express";
import {
  adminLogin,
  adminRegister,
  recruiterLogin,
  visitorLogin,
} from "../controllers/authControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/register", adminRegister);
router.post("/recruiter-login", recruiterLogin);
router.post("/visitor-login", visitorLogin);

router.get("/verify-token", authenticateToken, (req, res) => {
  res.status(200).json({ message: "User authorized" });
});

export default router;
