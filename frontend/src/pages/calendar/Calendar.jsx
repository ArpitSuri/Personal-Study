import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import CalendarGrid from "../../components/calender/CalendarGrid";
import TaskModal from "../../components/calender/TaskModal";
import StatCard from "../../components/calender/StatCard";
import {
    getTasksByDate,
    getMonthSummary,
    createTaskApi,
    toggleTaskApi,
    deleteTaskApi,
} from "../../api/calendar";

const fmt = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const Icon = ({ d }) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
);

export default function Calendar() {
    const queryClient = useQueryClient();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [newTaskText, setNewTaskText] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const selectedDateStr = fmt(selectedDate);
    const todayStr = fmt(new Date());

    // Queries
    const { data: monthRes, isLoading: summaryLoading } = useQuery({
        queryKey: ["monthSummary", year, month + 1],
        queryFn: () => getMonthSummary(year, month + 1).then((r) => r.data),
    });

    const { data: tasksRes, isLoading: tasksLoading } = useQuery({
        queryKey: ["calendarTasks", selectedDateStr],
        queryFn: () => getTasksByDate(selectedDateStr).then((r) => r.data),
    });

    const summaryData = useMemo(() => {
        const map = {};
        if (Array.isArray(monthRes)) {
            monthRes.forEach((i) => (map[i.date] = { total: i.totalTasks, completed: i.completedTasks }));
        }
        return map;
    }, [monthRes]);

    // Chronological / Oldest First sorting
    const tasks = useMemo(
        () => [...(tasksRes || [])].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)),
        [tasksRes]
    );

    // Month stats calculation
    const stats = useMemo(() => {
        const items = Object.values(summaryData);
        const total = items.reduce((s, i) => s + i.total, 0);
        const completed = items.reduce((s, i) => s + i.completed, 0);
        return {
            total,
            completed,
            rate: total ? Math.round((completed / total) * 100) : 0,
            activeDays: items.filter((i) => i.total > 0).length,
        };
    }, [summaryData]);

    // Query Invalidation
    const refresh = () => {
        queryClient.invalidateQueries({ queryKey: ["calendarTasks"] });
        queryClient.invalidateQueries({ queryKey: ["monthSummary"] });
    };

    const createMut = useMutation({
        mutationFn: createTaskApi,
        onSuccess: () => { setNewTaskText(""); refresh(); },
        onError: (e) => toast.error(e.response?.data?.message || "Failed to add task"),
    });

    const toggleMut = useMutation({
        mutationFn: toggleTaskApi,
        onSuccess: refresh,
        onError: () => toast.error("Failed to update task"),
    });

    const deleteMut = useMutation({
        mutationFn: deleteTaskApi,
        onSuccess: () => { toast.success("Task deleted"); refresh(); },
        onError: () => toast.error("Failed to delete task"),
    });

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        createMut.mutate({ date: selectedDateStr, text: newTaskText.trim() });
    };

    // Navigation
    const goTo = (y, m) => setCurrentDate(new Date(y, m, 1));
    const goToToday = () => {
        const t = new Date();
        setCurrentDate(t);
        setSelectedDate(t);
    };

    const handleSelect = (date) => {
        setSelectedDate(date);
        if (date.getMonth() !== month) goTo(date.getFullYear(), date.getMonth());
        setNewTaskText("");
        setModalOpen(true);
    };

    // Standard 6-week Sunday-first grid for rectangular Google Calendar layout
    const days = useMemo(() => {
        const out = [];
        const date1 = new Date(year, month, 1);
        const firstDayOfWeek = date1.getDay(); // 0 = Sunday
        const prevMonthDays = firstDayOfWeek;
        const totalCells = 42; // 6 rows * 7 columns

        for (let i = 0; i < totalCells; i++) {
            const d = new Date(year, month, 1 - prevMonthDays + i);
            out.push({
                date: d,
                dateStr: fmt(d),
                isCurrentMonth: d.getMonth() === month,
            });
        }
        return out;
    }, [year, month]);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-gray-800 selection:text-white">
            <style>{`
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                .animate-fade-in-up { animation: fadeInUp .5s ease-out forwards; }
                .animate-fade-in { animation: fadeIn .3s ease-out forwards; }
                .skeleton { background: linear-gradient(90deg,#111827 25%,#1f2937 50%,#111827 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
            `}</style>

            <Navbar />

            <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Learning Calendar
                        </h1>
                        <p className="text-gray-400 mt-1 text-sm sm:text-base">
                            Track and accomplish your daily targets in Google Calendar style
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={goToToday}
                            className="px-4 py-2.5 bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                        >
                            Today
                        </button>
                        <div className="flex bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                            <button
                                onClick={() => goTo(year, month - 1)}
                                aria-label="Previous month"
                                className="p-2.5 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                                <Icon d="M15 19l-7-7 7-7" />
                            </button>
                            <button
                                onClick={() => goTo(year, month + 1)}
                                aria-label="Next month"
                                className="p-2.5 text-gray-300 hover:text-white border-l border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                                <Icon d="M9 5l7 7-7 7" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    <StatCard label="Monthly Targets" value={stats.total} tone="blue" icon={<Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />} />
                    <StatCard label="Completed" value={stats.completed} tone="emerald" icon={<Icon d="M5 13l4 4L19 7" />} />
                    <StatCard label="Completion Rate" value={`${stats.rate}%`} tone="purple" icon={<Icon d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />} />
                    <StatCard label="Active Days" value={stats.activeDays} tone="amber" icon={<Icon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />} />
                </div>

                {/* Rectangular Google Calendar Grid */}
                <div className="w-full animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                    <CalendarGrid
                        year={year}
                        monthName={monthNames[month]}
                        days={days}
                        selectedDateStr={selectedDateStr}
                        todayStr={todayStr}
                        summaryData={summaryData}
                        loading={summaryLoading}
                        onSelect={handleSelect}
                    />
                </div>
            </div>

            {/* Day Targets Modal */}
            <TaskModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                selectedDate={selectedDate}
                isToday={selectedDateStr === todayStr}
                tasks={tasks}
                loading={tasksLoading}
                text={newTaskText}
                setText={setNewTaskText}
                adding={createMut.isPending}
                onAdd={handleAdd}
                onToggle={(id) => toggleMut.mutate(id)}
                onDelete={(id) => deleteMut.mutate(id)}
            />
        </div>
    );
}