import express from "express";
import { auth } from "../middleWare/authMiddleware.js";
import { getMeetings, createMeeting, getMeeting, deleteMeeting } from "../controllers/meetingController.js";

const router = express.Router();
router.use(auth);
router.get("/", getMeetings);
router.post("/", createMeeting);
router.get("/:meetingId", getMeeting);
router.delete("/:meetingId", deleteMeeting);

export default router;