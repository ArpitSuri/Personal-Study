import express from "express";
import { signup, login, me, googleLogin } from "../controllers/authController.js";
import { auth } from "../middleWare/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/me", auth, me);


export default router;
