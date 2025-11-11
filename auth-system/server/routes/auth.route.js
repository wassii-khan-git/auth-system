import express from "express";
import {
  SignupController,
  LoginController,
} from "../controllers/auth.controller.js";

const router = express.Router();

// signup
router.post("/auth/signup", SignupController);
// login
router.post("/auth/login", LoginController);

export default router;
