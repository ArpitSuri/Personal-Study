import { useState } from "react";
import ProgressRing from "./ProgressRing";
import TaskItem from "./TaskItem";

const filters = ["All", "Pending", "Done"];

export default function TaskPanel({
    selectedDate, isToday, tasks, loading, text, setText, adding, onAdd, onToggle, onDelete,
}) {
    const [filter, setFilter] = useState("All");

    const done = tasks.filter((t) => t.completed).length;
    const pct = tasks.length ? (done / tasks.length) * 100 : 0;

    const visible = tasks.filter((t) =>
        filter === "All" ? true : filter === "Done" ? t.completed : !t.completed
    );

    return (
        <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 flex flex-col lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)]">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-5">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-semibold text-white truncate">
                            {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
                        </h2>
                        {isToday && (
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">Today</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-400">
                        {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                </div>
                <ProgressRing value={pct} size={56}>
                    {tasks.length ? `${done}/${tasks.length}` : "0"}
                </ProgressRing>
            </div>

            {/* Add task */}
            <form onSubmit={onAdd} className="flex gap-2 mb-4">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={adding}
                    maxLength={200}
                    placeholder="What's your target for this day?"
                    className="flex-1 min-w-0 bg-gray-800/50 border border-gray-600 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                    type="submit"
                    disabled={!text.trim() || adding}
                    className="btn-glow group flex items-center gap-1.5 px-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl text-sm font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                </button>
            </form>

            {/* Filters */}
            {tasks.length > 0 && (
                <div className="flex gap-1 p-1 mb-4 bg-gray-800/60 border border-gray-700/50 rounded-xl self-start">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${filter === f ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            )}

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[120px]">
                {loading ? (
                    [1, 2, 3].map((i) => <div key={i} className="skeleton h-14 rounded-xl" />)
                ) : tasks.length === 0 ? (
                    <div className="py-8 text-center animate-fade-in">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-700/50 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-gray-400 mb-1">No targets for this day</p>
                        <p className="text-gray-500 text-sm">Add one above to get started</p>
                    </div>
                ) : visible.length === 0 ? (
                    <p className="py-6 text-center text-sm text-gray-500">Nothing in "{filter}"</p>
                ) : (
                    visible.map((t, i) => (
                        <TaskItem key={t._id} task={t} index={i} onToggle={onToggle} onDelete={onDelete} />
                    ))
                )}
            </div>

            {tasks.length > 0 && done === tasks.length && (
                <div className="mt-4 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm text-center animate-fade-in">
                    All targets completed. Nice work!
                </div>
            )}
        </div>
    );
}