import mongoose from "mongoose";
import { User } from "../model/userModel.js";
import { Playlist } from "../model/playListModel.js";
import { Video } from "../model/videoModel.js";
import { Note } from "../model/noteModel.js";
import { CalendarTask } from "../model/calendarTaskModel.js";
import { FocusSession } from "../model/focusSessionModel.js";
import { AuditLog } from "../model/auditLogModel.js";
import { isAdminUser } from "../utils/admin.js";

const DAY = 24 * 60 * 60 * 1000;
const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const handle = (fn) => async (req, res) => {
    try { await fn(req, res); }
    catch (err) {
        console.error("Admin error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const logAction = (req, action, targetEmail) =>
    AuditLog.create({ adminId: req.user._id, adminEmail: req.user.email, action, targetEmail });

// the user an admin acts on; you can't target yourself
const loadTarget = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) { res.status(404).json({ message: "User not found" }); return null; }
    if (String(userId) === String(req.user._id)) { res.status(400).json({ message: "You can't do this to your own account" }); return null; }
    const user = await User.findById(userId);
    if (!user) { res.status(404).json({ message: "User not found" }); return null; }
    return user;
};

export const getStats = handle(async (req, res) => {
    const weekAgo = new Date(Date.now() - 7 * DAY);
    const dayAgo = new Date(Date.now() - DAY);
    const since = new Date(Date.now() - 13 * DAY);
    since.setUTCHours(0, 0, 0, 0);

    const [total, blocked, new7d, active24h, active7d, playlists, videos, notes, tasks, focusAgg, signupAgg, recentUsers, topFocus] =
        await Promise.all([
            User.countDocuments(),
            User.countDocuments({ isBlocked: true }),
            User.countDocuments({ createdAt: { $gte: weekAgo } }),
            User.countDocuments({ lastActiveAt: { $gte: dayAgo } }),
            User.countDocuments({ lastActiveAt: { $gte: weekAgo } }),
            Playlist.countDocuments(),
            Video.countDocuments(),
            Note.countDocuments(),
            CalendarTask.countDocuments(),
            FocusSession.aggregate([{ $group: { _id: null, seconds: { $sum: "$durationSeconds" } } }]),
            User.aggregate([
                { $match: { createdAt: { $gte: since } } },
                { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
            ]),
            User.find().sort({ createdAt: -1 }).limit(5).select("name email avatar createdAt"),
            FocusSession.aggregate([
                { $group: { _id: "$userId", seconds: { $sum: "$durationSeconds" } } },
                { $sort: { seconds: -1 } },
                { $limit: 5 },
                { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
                { $unwind: "$user" },
                { $project: { _id: 0, name: "$user.name", email: "$user.email", hours: { $round: [{ $divide: ["$seconds", 3600] }, 1] } } },
            ]),
        ]);

    const byDay = Object.fromEntries(signupAgg.map((s) => [s._id, s.count]));
    const signups = Array.from({ length: 14 }, (_, i) => {
        const date = new Date(since.getTime() + i * DAY).toISOString().slice(0, 10);
        return { date, count: byDay[date] || 0 };
    });

    res.json({
        users: { total, blocked, new7d, active24h, active7d },
        content: { playlists, videos, notes, tasks },
        focusHours: Math.round(((focusAgg[0]?.seconds || 0) / 3600) * 10) / 10,
        signups,
        recentUsers,
        topFocus,
    });
});

export const listUsers = handle(async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 50);
    const search = String(req.query.search || "").trim();

    const filter = {};
    if (search) {
        const rx = new RegExp(escapeRegex(search), "i");
        filter.$or = [{ name: rx }, { email: rx }];
    }
    if (req.query.status === "suspended") filter.isBlocked = true;

    const [users, total] = await Promise.all([
        User.find(filter).select("-password").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
        User.countDocuments(filter),
    ]);

    res.json({
        users: users.map((u) => ({ ...u, isAdmin: isAdminUser(u) })),
        total,
        page,
        pages: Math.max(Math.ceil(total / limit), 1),
    });
});

export const setBlocked = handle(async (req, res) => {
    const user = await loadTarget(req, res);
    if (!user) return;
    const blocked = Boolean(req.body.blocked);
    if (blocked && isAdminUser(user))
        return res.status(400).json({ message: "Remove admin access before suspending this user" });

    user.isBlocked = blocked;
    await user.save();
    await logAction(req, blocked ? "user.suspend" : "user.reactivate", user.email);
    res.json({ message: blocked ? "User suspended" : "User reactivated" });
});

export const setRole = handle(async (req, res) => {
    const user = await loadTarget(req, res);
    if (!user) return;
    const { role } = req.body;
    if (!["user", "admin"].includes(role))
        return res.status(400).json({ message: "Invalid role" });
    if (role === "user" && isAdminUser({ email: user.email }))
        return res.status(400).json({ message: "This user is listed in ADMIN_EMAILS" });
    if (role === "admin" && user.isBlocked)
        return res.status(400).json({ message: "Reactivate this user before making them admin" });

    user.role = role;
    await user.save();
    await logAction(req, role === "admin" ? "user.make_admin" : "user.remove_admin", user.email);
    res.json({ message: "Role updated" });
});

export const deleteUser = handle(async (req, res) => {
    const user = await loadTarget(req, res);
    if (!user) return;
    if (isAdminUser(user))
        return res.status(400).json({ message: "Remove admin access before deleting this user" });

    const { _id: userId, email } = user;
    await Promise.all([
        Playlist.deleteMany({ userId }),
        Video.deleteMany({ userId }),
        Note.deleteMany({ userId }),
        CalendarTask.deleteMany({ userId }),
        FocusSession.deleteMany({ userId }),
    ]);
    await user.deleteOne();
    await logAction(req, "user.delete", email);
    res.json({ message: "User and all their data deleted" });
});

export const listLogs = handle(async (req, res) => {
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100).lean();
    res.json(logs);
});