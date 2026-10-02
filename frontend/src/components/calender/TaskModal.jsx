import { useState } from "react";
import Modal from "../Modal";
import ProgressRing from "./ProgressRing";
import TaskItem from "./TaskItem";

const filters = ["All", "Pending", "Done"];

export default function TaskModal({
    open,
    onClose,
    selectedDate,
    isToday,
    tasks,
    loading,
    text,
    setText,
    adding,
    onAdd,
    onToggle,
    onDelete,
}) {
    const [filter, setFilter] = useState("All");

    const done = tasks.filter((t) => t.completed).length;
    const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
    const visible = tasks.filter((t) =>
        filter === "All" ? true : filter === "Done" ? t.completed : !t.completed
    );

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        >
            <div className="space-y-4">
                {/* Summary Box */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-black border border-gray-800">
                    <ProgressRing value={pct} size={52}>
                        <span className="text-xs font-bold text-white">
                            {tasks.length ? `${done}/${tasks.length}` : "0"}
                        </span>
                    </ProgressRing>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">
                            {tasks.length === 0
                                ? "No targets planned yet"
                                : done === tasks.length
                                    ? "All targets completed 🎉"
                                    : `${tasks.length - done} target${tasks.length - done > 1 ? "s" : ""} remaining`}
                        </p>
                        <p className="text-xs text-gray-400">
                            {isToday ? "Today's learning targets" : "Targets for this date"}
                        </p>
                    </div>
                </div>

                {/* Add Input */}
                <form onSubmit={onAdd} className="flex gap-2">
                    <input
                        autoFocus
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={adding}
                        maxLength={200}
                        placeholder="Add a new target (e.g. Learn React Hooks)..."
                        className="flex-1 min-w-0 bg-black border border-gray-800 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!text.trim() || adding}
                        className="px-5 bg-white hover:bg-gray-200 text-black rounded-xl text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                        Add
                    </button>
                </form>

                {/* Filters */}
                {tasks.length > 0 && (
                    <div className="flex gap-1 p-1 bg-black border border-gray-800 rounded-xl w-fit">
                        {filters.map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                                    filter === f
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                )}

                {/* List */}
                <div className="max-h-[42vh] overflow-y-auto space-y-2 pr-1">
                    {loading ? (
                        [1, 2, 3].map((i) => <div key={i} className="skeleton h-14 rounded-xl" />)
                    ) : tasks.length === 0 ? (
                        <div className="py-8 text-center text-sm text-gray-400">
                            <p className="font-medium">No targets set for this date.</p>
                            <p className="text-xs text-gray-500 mt-1">Add your first target above!</p>
                        </div>
                    ) : visible.length === 0 ? (
                        <p className="py-6 text-center text-sm text-gray-400">No targets found matching "{filter}"</p>
                    ) : (
                        visible.map((t, i) => (
                            <TaskItem key={t._id} task={t} index={i} onToggle={onToggle} onDelete={onDelete} />
                        ))
                    )}
                </div>
            </div>
        </Modal>
    );
}