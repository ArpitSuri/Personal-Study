import express from "express";
import {
    addVideo,
    getVideos,
    getVideoById,
    deleteVideo
} from "../controllers/videoController.js";
import { auth } from "../middleWare/authMiddleware.js";

const router = express.Router();

router.use(auth);

router.post("/", addVideo);
router.get("/", getVideos);
router.get("/:id", getVideoById);
router.delete("/:id", deleteVideo);

export default router;
