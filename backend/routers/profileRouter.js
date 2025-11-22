import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { auth } from "../middleWare/authMiddleware.js";

const router = express.Router();

router.use(auth);

router.get("/", getProfile);
router.put("/", updateProfile);

export default router;
