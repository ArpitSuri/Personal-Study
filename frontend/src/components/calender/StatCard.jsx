import React from "react";

const tones = {
    blue: "bg-gray-900 text-blue-400 border-gray-800",
    emerald: "bg-gray-900 text-emerald-400 border-gray-800",
    amber: "bg-gray-900 text-amber-400 border-gray-800",
    purple: "bg-gray-900 text-purple-400 border-gray-800",
};

export default function StatCard({ label, value, icon, tone = "blue" }) {
    return (
        <div className="flex items-center gap-3 bg-gray-950 border border-gray-800 rounded-2xl p-4 transition-colors">
            <div className={`p-2.5 rounded-xl border ${tones[tone]}`}>{icon}</div>
            <div className="min-w-0">
                <div className="text-xl font-bold text-white leading-tight">{value}</div>
                <div className="text-xs text-gray-400 truncate font-medium">{label}</div>
            </div>
        </div>
    );
}