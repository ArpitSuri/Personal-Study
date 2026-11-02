import mongoose from "mongoose";
import { Note } from "../model/noteModel.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id }).sort({ updatedAt: -1 });
        return res.status(200).json(notes);
    } catch (err) {
        console.error("Get notes error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const createNote = async (req, res) => {
    try {
        const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
        const content = typeof req.body.content === "string" ? req.body.content : "";
        if (title.length > 160 || content.length > 50000) {
            return res.status(400).json({ message: "Note is too long" });
        }
        const note = await Note.create({ userId: req.user._id, title: title || "Untitled note", content });
        return res.status(201).json(note);
    } catch (err) {
        console.error("Create note error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if ((title !== undefined && (typeof title !== "string" || title.length > 160)) ||
            (content !== undefined && (typeof content !== "string" || content.length > 50000))) {
            return res.status(400).json({ message: "Invalid note content" });
        }
        const updates = {};
        if (title !== undefined) updates.title = title.trim() || "Untitled note";
        if (content !== undefined) updates.content = content;
        if (!Object.keys(updates).length) return res.status(400).json({ message: "No changes provided" });

        const note = await Note.findOneAndUpdate(
            { _id: req.params.noteId, userId: req.user._id }, updates, { new: true, runValidators: true }
        );
        if (!note) return res.status(404).json({ message: "Note not found" });
        return res.status(200).json(note);
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) return res.status(404).json({ message: "Note not found" });
        console.error("Update note error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.noteId, userId: req.user._id });
        if (!note) return res.status(404).json({ message: "Note not found" });
        return res.status(200).json({ message: "Note deleted" });
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) return res.status(404).json({ message: "Note not found" });
        console.error("Delete note error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
