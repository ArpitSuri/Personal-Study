import express from "express";
import { auth } from "../middleWare/authMiddleware.js";
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/noteController.js";

const router = express.Router();
router.use(auth);
router.get("/", getNotes);
router.post("/", createNote);
router.patch("/:noteId", updateNote);
router.delete("/:noteId", deleteNote);

export default router;
