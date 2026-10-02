import React, { useMemo } from "react";
import { Link } from "react-router-dom";

export default function TaskAnalyticsChart({ summaryData = [], loading = false }) {
    // Process analytics data
    const analytics = useMemo(() => {
        if (!Array.isArray(summaryData) || summaryData.length === 0) {
            return {
                totalAssigned: 0,
                totalCompleted: 0,
                pendingTasks: 0,
                rate: 0,
                activeDays: 0,
                chartDays: [],
                maxTaskCount: 1,
            };
        }

        let totalAssigned = 0;
        let totalCompleted = 0;
        let activeDays = 0;

        summaryData.forEach((item) => {
            const tot = item.totalTasks || 0;
            const comp = item.completedTasks || 0;
            totalAssigned += tot;
            totalCompleted += comp;
            if (tot > 0) activeDays++;
        });

        const pendingTasks = Math.max(0, totalAssigned - totalCompleted);
        const rate = totalAssigned > 0 ? Math.round((totalCompleted / totalAssigned) * 100) : 0;

        // Take last 8 active or recent days
        const sorted = [...summaryData].sort((a, b) => a.date.localeCompare(b.date));
        const chartDays = sorted.slice(-8).map((d) => {
            const dateObj = new Date(d.date + "T00:00:00");
            const label = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            return {
                dateStr: d.date,
                label,
                assigned: d.totalTasks || 0,
                completed: d.completedTasks || 0,
            };
        });

        const maxTaskCount = Math.max(1, ...chartDays.map((d) => d.assigned));

        return {
            totalAssigned,
            totalCompleted,
            pendingTasks,
            rate,
            activeDays,
            chartDays,
            maxTaskCount,
        };
    }, [summaryData]);

    const { totalAssigned, totalCompleted, pendingTasks, rate, activeDays, chartDays, maxTaskCount } = analytics;

    // SVG Donut calculation
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (rate / 100) * circumference;

    return (
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-900 border border-gray-800 text-white rounded-xl">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="font-bold text-white text-lg">Task Analytics</h2>
                        <p className="text-xs text-gray-400">Assigned vs Completed targets</p>
                    </div>
                </div>

                <Link
                    to="/calendar"
                    className="text-xs font-semibold text-gray-300 hover:text-white hover:underline flex items-center gap-1 cursor-pointer"
                >
                    Calendar <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>

            {loading ? (
                <div className="space-y-4">
                    <div className="skeleton h-24 rounded-xl" />
                    <div className="skeleton h-44 rounded-xl" />
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Ring Chart & Breakdown Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-black p-4 rounded-xl border border-gray-800">
                        {/* Donut Progress Ring */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        fill="none"
                                        strokeWidth="9"
                                        className="stroke-gray-800"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        fill="none"
                                        strokeWidth="9"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        className="stroke-emerald-400 transition-all duration-700 ease-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-xl font-extrabold text-white leading-none">
                                        {rate}%
                                    </span>
                                    <span className="text-[10px] text-gray-400 mt-0.5">Completed</span>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown Numbers */}
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center pb-1.5 border-b border-gray-800">
                                <span className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                                    Total Assigned
                                </span>
                                <span className="font-bold text-white">{totalAssigned}</span>
                            </div>

                            <div className="flex justify-between items-center pb-1.5 border-b border-gray-800">
                                <span className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                    Completed
                                </span>
                                <span className="font-bold text-emerald-400">{totalCompleted}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-xs font-medium flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                                    Pending
                                </span>
                                <span className="font-bold text-amber-400">{pendingTasks}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bar Graph Section */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                Daily Progress
                            </h3>
                            <div className="flex items-center gap-3 text-[11px] text-gray-400">
                                <span className="flex items-center gap-1">
                                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/60" /> Assigned
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /> Done
                                </span>
                            </div>
                        </div>

                        {chartDays.length === 0 ? (
                            <div className="py-8 text-center text-xs text-gray-500 border border-dashed border-gray-800 rounded-xl">
                                No task data recorded for this month yet.
                            </div>
                        ) : (
                            <div className="h-44 flex items-end justify-between gap-2 pt-4 px-1 pb-6 border-b border-gray-800">
                                {chartDays.map((day, idx) => {
                                    const assignedHeight = Math.max(12, Math.round((day.assigned / maxTaskCount) * 100));
                                    const completedHeight = Math.max(0, Math.round((day.completed / maxTaskCount) * 100));

                                    return (
                                        <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer">
                                            {/* Tooltip on hover */}
                                            <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gray-800 border border-gray-700 text-white text-[10px] font-semibold py-1 px-2 rounded-md shadow-lg whitespace-nowrap z-20">
                                                {day.label}: {day.completed}/{day.assigned} done
                                            </div>

                                            {/* Bar columns */}
                                            <div className="w-full max-w-[28px] flex items-end justify-center gap-0.5 h-full">
                                                {/* Assigned Bar */}
                                                <div
                                                    className="w-1/2 bg-blue-500/40 rounded-t-sm transition-all duration-300 group-hover:bg-blue-400"
                                                    style={{ height: `${assignedHeight}%` }}
                                                />
                                                {/* Completed Bar */}
                                                <div
                                                    className="w-1/2 bg-emerald-400 rounded-t-sm transition-all duration-300 group-hover:bg-emerald-300"
                                                    style={{ height: `${completedHeight}%` }}
                                                />
                                            </div>

                                            {/* Date label */}
                                            <span className="text-[10px] font-medium text-gray-400 mt-2 truncate w-full text-center">
                                                {day.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <Link
                        to="/calendar"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-gray-200 text-black rounded-xl text-sm font-bold transition-all cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Manage Daily Targets
                    </Link>
                </div>
            )}
        </div>
    );
}
