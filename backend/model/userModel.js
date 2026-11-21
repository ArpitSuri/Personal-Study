import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String },
        googleId: { type: String, unique: true, sparse: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
        isBlocked: { type: Boolean, default: false },
        lastActiveAt: { type: Date, default: null },
        avatar: { type: String, default: "" },
        theme: { type: String, enum: ["light", "dark"], default: "light" }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
