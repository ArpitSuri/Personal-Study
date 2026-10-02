import mongoose from "mongoose";
import { CalendarTask } from "../model/calendarTaskModel.js";

export const getTasksByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const tasks = await CalendarTask.find({
            userId: req.user._id,
            date
        }).sort({ order: 1, createdAt: 1 });

        return res.status(200).json(tasks);
    } catch (err) {
        console.error("Get tasks by date error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getMonthSummary = async (req, res) => {
    try {
        const { year, month } = req.params;
        const paddedMonth = month.padStart(2, "0");
        const monthPrefix = `${year}-${paddedMonth}`;

        const summary = await CalendarTask.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user._id),
                    date: { $regex: `^${monthPrefix}` }
                }
            },
            {
                $group: {
                    _id: "$date",
                    totalTasks: { $sum: 1 },
                    completedTasks: {
                        $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    totalTasks: 1,
                    completedTasks: 1
                }
            }
        ]);

        return res.status(200).json(summary);
    } catch (err) {
        console.error("Get month summary error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const createTask = async (req, res) => {
    try {
        const { date, text } = req.body;
        if (!date || !text) {
            return res.status(400).json({ message: "Date and text are required" });
        }

        const task = await CalendarTask.create({
            userId: req.user._id,
            date,
            text
        });

        return res.status(201).json(task);
    } catch (err) {
        console.error("Create task error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const toggleTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        
        const task = await CalendarTask.findOne({
            _id: taskId,
            userId: req.user._id
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.completed = !task.completed;
        await task.save();

        return res.status(200).json(task);
    } catch (err) {
        console.error("Toggle task error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const deleted = await CalendarTask.findOneAndDelete({
            _id: taskId,
            userId: req.user._id
        });

        if (!deleted) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ message: "Task deleted" });
    } catch (err) {
        console.error("Delete task error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
