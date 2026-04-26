import express from "express";
import {
  adminLogin,
  adminRegister,
  guestLogin,
} from "../controllers/authControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/admin-login", adminLogin);
router.post("/recruiter-login", guestLogin);
router.post("/visitor-login", guestLogin);

router.get("/verify-token", authenticateToken, (req, res) => {
  res.status(200).json({ message: "User authorized" });
});

export default router;
