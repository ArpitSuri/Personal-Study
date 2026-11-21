import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

export const auth = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(401).json({ message: "User not found" });
        if (user.isBlocked)
            return res.status(403).json({ message: "Your account has been suspended" });

        // "last active" for the dashboard, written at most once an hour per user
        if (!user.lastActiveAt || Date.now() - user.lastActiveAt.getTime() > 60 * 60 * 1000) {
            await User.updateOne({ _id: user._id }, { lastActiveAt: new Date() });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
