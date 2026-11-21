import { isAdminUser } from "../utils/admin.js";

export const adminOnly = (req, res, next) =>
    isAdminUser(req.user) ? next() : res.status(403).json({ message: "Admin access required" });