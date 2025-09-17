import { Router } from "express";
import { register, login, verifyToken, getCurrentUser } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/verify", verifyToken);

// Protected routes
router.get("/me", authenticateToken, getCurrentUser);

export default router;