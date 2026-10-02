import React from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({
    year,
    monthName,
    days,
    selectedDateStr,
    todayStr,
    summaryData,
    loading,
    onSelect,
}) {
    return (
        <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl transition-colors">
            {/* Calendar Header / Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-gray-800 bg-black">
                <div className="flex items-baseline gap-3">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {monthName}
                    </h2>
                    <span className="text-xl sm:text-2xl font-semibold text-gray-400">
                        {year}
                    </span>
                </div>
                <div className="text-xs text-gray-400 mt-1 sm:mt-0 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Click any day cell to manage targets
                </div>
            </div>

            {/* Weekday Labels Header Row */}
            <div className="grid grid-cols-7 border-b border-gray-800 bg-gray-900/60">
                {weekDays.map((d, i) => (
                    <div
                        key={d}
                        className={`text-center text-xs sm:text-sm font-bold py-3 border-r last:border-r-0 border-gray-800 ${
                            i === 0 || i === 6
                                ? "text-amber-400"
                                : "text-gray-300"
                        }`}
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* Rectangular Date Grid Cells (Google Calendar Style) */}
            <div className={`grid grid-cols-7 border-l border-t border-gray-800 transition-opacity ${loading ? "opacity-60" : "opacity-100"}`}>
                {days.map((day) => {
                    const s = summaryData[day.dateStr];
                    const total = s?.total || 0;
                    const completed = s?.completed || 0;
                    const allDone = total > 0 && completed === total;
                    const isToday = day.dateStr === todayStr;
                    const isSelected = day.dateStr === selectedDateStr;
                    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

                    return (
                        <div
                            key={day.dateStr}
                            onClick={() => onSelect(day.date)}
                            className={`
                                group relative min-h-[95px] sm:min-h-[120px] lg:min-h-[135px] p-2 sm:p-2.5 border-r border-b border-gray-800 flex flex-col justify-between cursor-pointer transition-all duration-150
                                ${!day.isCurrentMonth ? "bg-black/60 text-gray-600" : "bg-gray-950 text-gray-200"}
                                ${isSelected ? "ring-2 ring-white bg-gray-900 z-10" : "hover:bg-gray-900/80"}
                            `}
                        >
                            {/* Top row in date cell */}
                            <div className="flex items-center justify-between mb-1">
                                {/* Quick Add hover icon */}
                                <span className="w-5 h-5 rounded-full bg-gray-800 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </span>

                                {/* Date number */}
                                <span
                                    className={`
                                        text-xs sm:text-sm font-semibold transition-all
                                        ${isToday
                                            ? "w-6 h-6 sm:w-7 sm:h-7 bg-white text-black rounded-full flex items-center justify-center font-extrabold shadow-md"
                                            : day.isCurrentMonth
                                                ? "text-white"
                                                : "text-gray-600"
                                        }
                                    `}
                                >
                                    {day.date.getDate()}
                                </span>
                            </div>

                            {/* Middle content / Task previews */}
                            <div className="flex-1 flex flex-col justify-center space-y-1 my-1">
                                {total > 0 ? (
                                    <div className="space-y-1">
                                        {/* Status Pill */}
                                        <div
                                            className={`
                                                inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md w-full justify-between border
                                                ${allDone
                                                    ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/80"
                                                    : "bg-amber-950/60 text-amber-300 border-amber-800/80"
                                                }
                                            `}
                                        >
                                            <span className="truncate">{allDone ? "✓ Done" : "Target"}</span>
                                            <span className="shrink-0">{completed}/{total}</span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${allDone ? "bg-emerald-400" : "bg-amber-400"}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="hidden group-hover:block text-[10px] text-gray-500 text-center italic">
                                        + Add target
                                    </div>
                                )}
                            </div>

                            {/* Bottom row: Today label */}
                            {isToday && (
                                <div className="text-[9px] font-bold uppercase tracking-wider text-white text-right">
                                    Today
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}