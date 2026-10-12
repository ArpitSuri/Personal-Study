import express from "express";
import { auth } from "../middleware/authMiddleware.js"; // use your existing auth middleware
import {
    createSession,
    getSessionsByDate,
    getMonthFocusSummary,
    deleteSession,
} from "../controllers/focusController.js";

const router = express.Router();

router.use(auth);

router.post("/", createSession);
router.get("/", getSessionsByDate);
router.get("/summary/:year/:month", getMonthFocusSummary);
router.delete("/:id", deleteSession);

export default router;