// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import { getMonthSummary } from "../../api/calendar";
// import Navbar from "../../components/Navbar";
// import TaskAnalyticsChart from "../../components/TaskAnalyticsChart";

// export default function Dashboard() {
//     const today = new Date();
//     const currentYear = today.getFullYear();
//     const currentMonth = today.getMonth() + 1;

//     const { data: monthSummaryRes, isLoading: summaryLoading } = useQuery({
//         queryKey: ["monthSummary", currentYear, currentMonth],
//         queryFn: () => getMonthSummary(currentYear, currentMonth).then((res) => res.data),
//     });

//     const summaryData = monthSummaryRes || [];

//     return (
//         <div className="min-h-screen bg-black text-white selection:bg-gray-800 selection:text-white">
//             <style>{`
//         @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
//       `}</style>

//             <Navbar />

//             <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 max-w-7xl mx-auto">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
//                     <div>
//                         <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Dashboard</h1>
//                         <p className="text-gray-400 mt-1 text-sm sm:text-base">
//                             Track your daily study targets and progress
//                         </p>
//                     </div>
//                     <Link
//                         to="/youtube"
//                         className="px-4 py-2.5 bg-white text-black hover:bg-gray-200 rounded-xl text-sm font-semibold transition-all"
//                     >
//                         Go to YouTube Videos
//                     </Link>
//                 </div>

//                 <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
//                     <TaskAnalyticsChart summaryData={summaryData} loading={summaryLoading} />
//                 </div>
//             </div>
//         </div>
//     );
// }``


// import { useState, useMemo } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import {
//     getMonthSummary,
//     getTasksByDate,
//     createTaskApi,
//     toggleTaskApi,
//     deleteTaskApi,
// } from "../../api/calendar";
// import Navbar from "../../components/Navbar";
// import TaskAnalyticsChart from "../../components/TaskAnalyticsChart";

// const fmt = (d) =>
//     `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// export default function Dashboard() {
//     const queryClient = useQueryClient();
//     const [newTaskText, setNewTaskText] = useState("");

//     const today = new Date();
//     const todayStr = fmt(today);
//     const currentYear = today.getFullYear();
//     const currentMonth = today.getMonth() + 1;

//     // Queries
//     const { data: monthSummaryRes, isLoading: summaryLoading } = useQuery({
//         queryKey: ["monthSummary", currentYear, currentMonth],
//         queryFn: () => getMonthSummary(currentYear, currentMonth).then((res) => res.data),
//     });

//     const { data: tasksRes, isLoading: tasksLoading } = useQuery({
//         queryKey: ["calendarTasks", todayStr],
//         queryFn: () => getTasksByDate(todayStr).then((res) => res.data),
//     });

//     const summaryData = monthSummaryRes || [];

//     // Oldest first, same as Calendar
//     const tasks = useMemo(
//         () =>
//             [...(tasksRes || [])].sort(
//                 (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
//             ),
//         [tasksRes]
//     );

//     const completedCount = tasks.filter((t) => t.completed).length;
//     const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

//     // Refresh the task list and the chart together
//     const refresh = () => {
//         queryClient.invalidateQueries({ queryKey: ["calendarTasks"] });
//         queryClient.invalidateQueries({ queryKey: ["monthSummary"] });
//     };

//     const createMut = useMutation({
//         mutationFn: createTaskApi,
//         onSuccess: () => {
//             setNewTaskText("");
//             refresh();
//         },
//         onError: (e) => toast.error(e.response?.data?.message || "Failed to add task"),
//     });

//     const toggleMut = useMutation({
//         mutationFn: toggleTaskApi,
//         onSuccess: refresh,
//         onError: () => toast.error("Failed to update task"),
//     });

//     const deleteMut = useMutation({
//         mutationFn: deleteTaskApi,
//         onSuccess: () => {
//             toast.success("Task deleted");
//             refresh();
//         },
//         onError: () => toast.error("Failed to delete task"),
//     });

//     const handleAdd = (e) => {
//         e.preventDefault();
//         if (!newTaskText.trim()) return;
//         createMut.mutate({ date: todayStr, text: newTaskText.trim() });
//     };

//     return (
//         <div className="min-h-screen bg-black text-white selection:bg-gray-800 selection:text-white">
//             <style>{`
//         @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
//         .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
//         .skeleton { background: linear-gradient(90deg, #111827 25%, #1f2937 50%, #111827 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
//       `}</style>

//             <Navbar />

//             <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
//                     <div>
//                         <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Dashboard</h1>
//                         <p className="text-gray-400 mt-1 text-sm sm:text-base">
//                             Track your daily study targets and progress
//                         </p>
//                     </div>
//                     <Link
//                         to="/youtube"
//                         className="px-4 py-2.5 bg-white text-black hover:bg-gray-200 rounded-xl text-sm font-semibold transition-all"
//                     >
//                         Go to YouTube Videos
//                     </Link>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//                     {/* Today's Targets */}
//                     <section
//                         className="lg:col-span-7 xl:col-span-8 bg-gray-950 border border-gray-800 rounded-2xl p-5 sm:p-6 animate-fade-in-up"
//                         style={{ animationDelay: "0.1s" }}
//                     >
//                         <div className="flex items-start justify-between gap-4 mb-4">
//                             <div>
//                                 <h2 className="text-xl sm:text-2xl font-bold">Today's Targets</h2>
//                                 <p className="text-gray-400 text-xs sm:text-sm mt-1">
//                                     {today.toLocaleDateString("en-US", {
//                                         weekday: "long",
//                                         day: "numeric",
//                                         month: "long",
//                                         year: "numeric",
//                                     })}
//                                 </p>
//                             </div>
//                             <span className="px-2.5 py-0.5 bg-gray-900 text-gray-400 border border-gray-800 text-xs font-semibold rounded-full whitespace-nowrap">
//                                 {completedCount}/{tasks.length} done
//                             </span>
//                         </div>

//                         {/* Progress bar */}
//                         <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden mb-5">
//                             <div
//                                 className="h-full bg-emerald-500 transition-all duration-500"
//                                 style={{ width: `${progress}%` }}
//                             />
//                         </div>

//                         {/* Add task */}
//                         <form onSubmit={handleAdd} className="flex gap-2 mb-5">
//                             <input
//                                 className="flex-1 bg-black border border-gray-800 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-all text-sm"
//                                 placeholder="Add a target for today..."
//                                 value={newTaskText}
//                                 onChange={(e) => setNewTaskText(e.target.value)}
//                             />
//                             <button
//                                 type="submit"
//                                 disabled={createMut.isPending || !newTaskText.trim()}
//                                 className="px-5 bg-white text-black hover:bg-gray-200 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
//                             >
//                                 {createMut.isPending ? "Adding..." : "Add"}
//                             </button>
//                         </form>

//                         {/* Task list */}
//                         {tasksLoading ? (
//                             <div className="space-y-2">
//                                 {[1, 2, 3].map((i) => (
//                                     <div key={i} className="skeleton h-12 rounded-xl" />
//                                 ))}
//                             </div>
//                         ) : tasks.length === 0 ? (
//                             <div className="text-center py-8">
//                                 <p className="text-white font-medium mb-1">No targets for today</p>
//                                 <p className="text-gray-400 text-xs">Add your first target above to get started</p>
//                             </div>
//                         ) : (
//                             <ul className="space-y-2">
//                                 {tasks.map((task) => (
//                                     <li
//                                         key={task._id}
//                                         className="group flex items-center gap-3 bg-black border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-3 transition-colors"
//                                     >
//                                         {/* Toggle complete */}
//                                         <button
//                                             onClick={() => toggleMut.mutate(task._id)}
//                                             aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
//                                             className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${task.completed
//                                                     ? "bg-emerald-500 border-emerald-500 text-black"
//                                                     : "border-gray-600 hover:border-gray-400"
//                                                 }`}
//                                         >
//                                             {task.completed && (
//                                                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                                                 </svg>
//                                             )}
//                                         </button>

//                                         <span
//                                             className={`flex-1 text-sm break-words ${task.completed ? "line-through text-gray-500" : "text-white"
//                                                 }`}
//                                         >
//                                             {task.text}
//                                         </span>

//                                         {/* Delete */}
//                                         <button
//                                             onClick={() => deleteMut.mutate(task._id)}
//                                             aria-label="Delete task"
//                                             title="Delete task"
//                                             className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/50 sm:opacity-0 group-hover:opacity-100 transition cursor-pointer"
//                                         >
//                                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                             </svg>
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </section>

//                     {/* Analytics */}
//                     <div
//                         className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20 animate-fade-in-up"
//                         style={{ animationDelay: "0.2s" }}
//                     >
//                         <TaskAnalyticsChart summaryData={summaryData} loading={summaryLoading} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
    getMonthSummary,
    getTasksByDate,
    createTaskApi,
    toggleTaskApi,
    deleteTaskApi,
} from "../../api/calendar";
import { getFocusMonthSummary } from "../../api/focus";
import Navbar from "../../components/Navbar";
import TaskAnalyticsChart from "../../components/TaskAnalyticsChart";
import StudyTimer from "../../components/StudyTimer";
import FocusChart from "../../components/FcousChart";

const fmt = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function Dashboard() {
    const queryClient = useQueryClient();
    const [newTaskText, setNewTaskText] = useState("");

    const today = new Date();
    const todayStr = fmt(today);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    // Queries
    const { data: monthSummaryRes, isLoading: summaryLoading } = useQuery({
        queryKey: ["monthSummary", currentYear, currentMonth],
        queryFn: () => getMonthSummary(currentYear, currentMonth).then((res) => res.data),
    });

    const { data: tasksRes, isLoading: tasksLoading } = useQuery({
        queryKey: ["calendarTasks", todayStr],
        queryFn: () => getTasksByDate(todayStr).then((res) => res.data),
    });

    const { data: focusSummaryRes, isLoading: focusLoading } = useQuery({
        queryKey: ["focusSummary", currentYear, currentMonth],
        queryFn: () => getFocusMonthSummary(currentYear, currentMonth).then((res) => res.data),
    });

    const summaryData = monthSummaryRes || [];
    const focusSummary = focusSummaryRes || [];

    // Oldest first, same as Calendar
    const tasks = useMemo(
        () =>
            [...(tasksRes || [])].sort(
                (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
            ),
        [tasksRes]
    );

    const completedCount = tasks.filter((t) => t.completed).length;
    const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

    // Refresh the task list and the chart together
    const refresh = () => {
        queryClient.invalidateQueries({ queryKey: ["calendarTasks"] });
        queryClient.invalidateQueries({ queryKey: ["monthSummary"] });
    };

    const createMut = useMutation({
        mutationFn: createTaskApi,
        onSuccess: () => {
            setNewTaskText("");
            refresh();
        },
        onError: (e) => toast.error(e.response?.data?.message || "Failed to add task"),
    });

    const toggleMut = useMutation({
        mutationFn: toggleTaskApi,
        onSuccess: refresh,
        onError: () => toast.error("Failed to update task"),
    });

    const deleteMut = useMutation({
        mutationFn: deleteTaskApi,
        onSuccess: () => {
            toast.success("Task deleted");
            refresh();
        },
        onError: () => toast.error("Failed to delete task"),
    });

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        createMut.mutate({ date: todayStr, text: newTaskText.trim() });
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-gray-800 selection:text-white">
            <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        .skeleton { background: linear-gradient(90deg, #111827 25%, #1f2937 50%, #111827 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
      `}</style>

            <Navbar />

            <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Dashboard</h1>
                        <p className="text-gray-400 mt-1 text-sm sm:text-base">
                            Track your daily study targets and progress
                        </p>
                    </div>
                    <Link
                        to="/youtube"
                        className="px-4 py-2.5 bg-white text-black hover:bg-gray-200 rounded-xl text-sm font-semibold transition-all"
                    >
                        Go to YouTube Videos
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left column: Study Timer + Today's Targets */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                        <StudyTimer />

                        <section
                            className="bg-gray-950 border border-gray-800 rounded-2xl p-5 sm:p-6 animate-fade-in-up"
                            style={{ animationDelay: "0.1s" }}
                        >
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold">Today's Targets</h2>
                                    <p className="text-gray-400 text-xs sm:text-sm mt-1">
                                        {today.toLocaleDateString("en-US", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                                <span className="px-2.5 py-0.5 bg-gray-900 text-gray-400 border border-gray-800 text-xs font-semibold rounded-full whitespace-nowrap">
                                    {completedCount}/{tasks.length} done
                                </span>
                            </div>

                            {/* Progress bar */}
                            <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden mb-5">
                                <div
                                    className="h-full bg-emerald-500 transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* Add task */}
                            <form onSubmit={handleAdd} className="flex gap-2 mb-5">
                                <input
                                    className="flex-1 bg-black border border-gray-800 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-all text-sm"
                                    placeholder="Add a target for today..."
                                    value={newTaskText}
                                    onChange={(e) => setNewTaskText(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    disabled={createMut.isPending || !newTaskText.trim()}
                                    className="px-5 bg-white text-black hover:bg-gray-200 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {createMut.isPending ? "Adding..." : "Add"}
                                </button>
                            </form>

                            {/* Task list */}
                            {tasksLoading ? (
                                <div className="space-y-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="skeleton h-12 rounded-xl" />
                                    ))}
                                </div>
                            ) : tasks.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-white font-medium mb-1">No targets for today</p>
                                    <p className="text-gray-400 text-xs">Add your first target above to get started</p>
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {tasks.map((task) => (
                                        <li
                                            key={task._id}
                                            className="group flex items-center gap-3 bg-black border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-3 transition-colors"
                                        >
                                            {/* Toggle complete */}
                                            <button
                                                onClick={() => toggleMut.mutate(task._id)}
                                                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                                                className={`w-5 h-5 shrink-0 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${task.completed
                                                        ? "bg-emerald-500 border-emerald-500 text-black"
                                                        : "border-gray-600 hover:border-gray-400"
                                                    }`}
                                            >
                                                {task.completed && (
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>

                                            <span
                                                className={`flex-1 text-sm break-words ${task.completed ? "line-through text-gray-500" : "text-white"
                                                    }`}
                                            >
                                                {task.text}
                                            </span>

                                            {/* Delete */}
                                            <button
                                                onClick={() => deleteMut.mutate(task._id)}
                                                aria-label="Delete task"
                                                title="Delete task"
                                                className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/50 sm:opacity-0 group-hover:opacity-100 transition cursor-pointer"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    </div>

                    {/* Right column: Task analytics + Focus chart */}
                    <div
                        className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20 space-y-8 animate-fade-in-up"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <TaskAnalyticsChart summaryData={summaryData} loading={summaryLoading} />
                        <FocusChart
                            summaryData={focusSummary}
                            loading={focusLoading}
                            year={currentYear}
                            month={currentMonth}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}