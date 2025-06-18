import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsersEmail,
} from "../controllers/user.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/admin-panel").get(protect, admin, getAllUsersEmail);

export default router;
