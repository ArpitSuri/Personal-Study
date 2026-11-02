import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routers/authRouter.js";
import playlistRoutes from "./routers/playlistRouter.js";
import videoRoutes from "./routers/videoRouter.js";
import profileRoutes from "./routers/profileRouter.js";
import calendarRoutes from "./routers/calendarRouter.js";
import focusRoutes from "./routers/focusRouter.js";
import noteRoutes from "./routers/noteRouter.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/notes", noteRoutes);
app.get("/", (req, res) => {
    res.send("LMS backend running");
});

// start
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
