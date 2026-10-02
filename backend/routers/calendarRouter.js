import express from "express";
import {
    getTasksByDate,
    getMonthSummary,
    createTask,
    toggleTask,
    deleteTask
} from "../controllers/calendarController.js";
import { auth } from "../middleWare/authMiddleware.js";

const router = express.Router();

router.use(auth);

router.get("/month/:year/:month", getMonthSummary);
router.get("/:date", getTasksByDate);
router.post("/", createTask);
router.patch("/:taskId/toggle", toggleTask);
router.delete("/:taskId", deleteTask);

export default router;
