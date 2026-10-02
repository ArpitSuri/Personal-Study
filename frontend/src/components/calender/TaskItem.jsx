import React from "react";

export default function TaskItem({ task, index, onToggle, onDelete }) {
    return (
        <div
            style={{ animationDelay: `${index * 0.05}s` }}
            className={`group flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                task.completed
                    ? "bg-black/40 border-gray-900 opacity-60"
                    : "bg-black border-gray-800 hover:border-gray-700"
            }`}
        >
            <div className="flex items-center gap-3 min-w-0">
                <button
                    type="button"
                    onClick={() => onToggle(task._id)}
                    aria-label={task.completed ? "Mark as pending" : "Mark as done"}
                    className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                        task.completed
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-gray-600 text-transparent hover:border-gray-400"
                    }`}
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </button>
                <span className={`text-sm break-words transition-colors ${task.completed ? "line-through text-gray-500" : "text-white font-medium"}`}>
                    {task.text}
                </span>
            </div>

            <button
                type="button"
                onClick={() => onDelete(task._id)}
                aria-label="Delete task"
                className="p-1.5 rounded-lg shrink-0 text-gray-400 hover:text-red-400 hover:bg-gray-900 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition cursor-pointer"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}