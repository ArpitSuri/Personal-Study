import mongoose from "mongoose";
import crypto from "crypto";

const meetingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    roomName: {
        type: String,
        unique: true,
        default: () => `pstudy-${crypto.randomBytes(12).toString("hex")}`,
    },
    scheduledAt: { type: Date, default: null },
}, { timestamps: true });

meetingSchema.index({ userId: 1, createdAt: -1 });

export const Meeting = mongoose.model("Meeting", meetingSchema);