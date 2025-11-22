import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        playlistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Playlist",
            default: null // null = solo video
        },
        youtubeId: { type: String, required: true },
        title: { type: String, required: true },
        thumbnail: { type: String, required: true },
        duration: { type: String, default: "" } // plain string like "12:34"
    },
    { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);
