import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        adminEmail: { type: String, required: true },
        action: { type: String, required: true },
        targetEmail: { type: String, default: "" },
    },
    { timestamps: true }
);

auditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);