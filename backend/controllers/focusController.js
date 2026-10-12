import mongoose from "mongoose";
import { FocusSession } from "../model/focusSessionModel.js";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const createSession = async (req, res) => {
    try {
        const { name, date, startedAt, endedAt, durationSeconds } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({ message: "Session name is required" });
        }
        if (!DATE_RE.test(date || "")) {
            return res.status(400).json({ message: "Valid date (YYYY-MM-DD) is required" });
        }
        const seconds = Math.floor(Number(durationSeconds));
        if (!Number.isFinite(seconds) || seconds < 1 || seconds > 86400) {
            return res.status(400).json({ message: "Invalid session duration" });
        }

        const session = await FocusSession.create({
            userId: req.user._id,
            name: name.trim(),
            date,
            startedAt: new Date(startedAt),
            endedAt: new Date(endedAt),
            durationSeconds: seconds,
        });

        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getSessionsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!DATE_RE.test(date || "")) {
            return res.status(400).json({ message: "Valid date (YYYY-MM-DD) is required" });
        }
        const sessions = await FocusSession.find({ userId: req.user._id, date }).sort({ startedAt: 1 });
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMonthFocusSummary = async (req, res) => {
    try {
        const year = Number(req.params.year);
        const month = Number(req.params.month);
        if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
            return res.status(400).json({ message: "Invalid year or month" });
        }

        const prefix = `${year}-${String(month).padStart(2, "0")}-`;

        const summary = await FocusSession.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(String(req.user._id)),
                    date: { $regex: `^${prefix}` },
                },
            },
            {
                $group: {
                    _id: "$date",
                    totalSeconds: { $sum: "$durationSeconds" },
                    sessions: { $sum: 1 },
                },
            },
            { $project: { _id: 0, date: "$_id", totalSeconds: 1, sessions: 1 } },
            { $sort: { date: 1 } },
        ]);

        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteSession = async (req, res) => {
    try {
        const deleted = await FocusSession.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!deleted) return res.status(404).json({ message: "Session not found" });
        res.json({ message: "Session deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};