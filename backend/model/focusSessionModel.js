import mongoose from "mongoose";

const focusSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        // Local calendar day the session started, "YYYY-MM-DD" (same format as CalendarTask)
        date: {
            type: String,
            required: true,
        },
        startedAt: { type: Date, required: true },
        endedAt: { type: Date, required: true },
        // Focused time only (paused time excluded)
        durationSeconds: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { timestamps: true }
);

focusSessionSchema.index({ userId: 1, date: 1 });

export const FocusSession = mongoose.model("FocusSession", focusSessionSchema);