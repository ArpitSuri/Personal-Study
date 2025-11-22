import express from "express";
import {
    createPlaylist,
    getMyPlaylists,
    getPlaylistWithVideos,
    updatePlaylist,
    deletePlaylist
} from "../controllers/playListController.js";
import { auth } from "../middleWare/authMiddleware.js";

const router = express.Router();

router.use(auth);

router.post("/", createPlaylist);
router.get("/", getMyPlaylists);
router.get("/:id", getPlaylistWithVideos);
router.put("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);

export default router;
