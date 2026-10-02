import mongoose from "mongoose";

const calendarTaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

calendarTaskSchema.index({ userId: 1, date: 1 });

export const CalendarTask = mongoose.model("CalendarTask", calendarTaskSchema);
