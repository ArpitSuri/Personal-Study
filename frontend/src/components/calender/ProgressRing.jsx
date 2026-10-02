import React from "react";

export default function ProgressRing({ value = 0, size = 56, stroke = 5, children }) {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const offset = c - (Math.min(value, 100) / 100) * c;
    const done = value >= 100;

    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-gray-200 dark:stroke-gray-700" />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={offset}
                    className={`transition-all duration-500 ${done ? "stroke-emerald-500" : "stroke-blue-500"}`}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
                {children ?? `${Math.round(value)}%`}
            </div>
        </div>
    );
}