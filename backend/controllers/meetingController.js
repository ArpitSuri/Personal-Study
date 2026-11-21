import mongoose from "mongoose";
import { Meeting } from "../model/meetingModel.js";

export const getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find({ userId: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json(meetings);
    } catch (err) {
        console.error("Get meetings error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const createMeeting = async (req, res) => {
    try {
        const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
        if (!title || title.length > 120) {
            return res.status(400).json({ message: "Title is required (max 120 chars)" });
        }
        const scheduledAt = req.body.scheduledAt ? new Date(req.body.scheduledAt) : null;
        if (scheduledAt && isNaN(scheduledAt)) {
            return res.status(400).json({ message: "Invalid date" });
        }
        const meeting = await Meeting.create({ userId: req.user._id, title, scheduledAt });
        return res.status(201).json(meeting);
    } catch (err) {
        console.error("Create meeting error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

// any logged-in user with the link can join
export const getMeeting = async (req, res) => {
    try {
        const { meetingId } = req.params;
        if (!mongoose.isValidObjectId(meetingId)) {
            return res.status(404).json({ message: "Room not found" });
        }
        const meeting = await Meeting.findById(meetingId);
        if (!meeting) return res.status(404).json({ message: "Room not found" });
        return res.status(200).json(meeting);
    } catch (err) {
        console.error("Get meeting error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteMeeting = async (req, res) => {
    try {
        const { meetingId } = req.params;
        if (!mongoose.isValidObjectId(meetingId)) {
            return res.status(404).json({ message: "Room not found" });
        }
        const deleted = await Meeting.findOneAndDelete({ _id: meetingId, userId: req.user._id });
        if (!deleted) return res.status(404).json({ message: "Room not found" });
        return res.status(200).json({ message: "Deleted" });
    } catch (err) {
        console.error("Delete meeting error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};