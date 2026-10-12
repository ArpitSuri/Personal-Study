import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
    createFocusSessionApi,
    getFocusSessionsByDate,
    deleteFocusSessionApi,
} from "../api/focus";

const STORAGE_KEY = "studyTimer";
const IDLE = { status: "idle", name: "", startedAt: null, segmentStart: null, accumulatedMs: 0 };

const pad = (n) => String(n).padStart(2, "0");
const fmtDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const formatClock = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const formatShort = (sec) => {
    if (sec < 60) return `${sec}s`;
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const loadTimer = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? { ...IDLE, ...JSON.parse(raw) } : IDLE;
    } catch {
        return IDLE;
    }
};

export default function StudyTimer() {
    const queryClient = useQueryClient();
    const [timer, setTimer] = useState(loadTimer);
    const [nameInput, setNameInput] = useState("");
    const [now, setNow] = useState(Date.now());

    const todayStr = fmtDate(new Date());

    // Persist so a refresh doesn't lose a running/paused session
    useEffect(() => {
        try {
            if (timer.status === "idle") localStorage.removeItem(STORAGE_KEY);
            else localStorage.setItem(STORAGE_KEY, JSON.stringify(timer));
        } catch {
            /* ignore storage errors */
        }
    }, [timer]);

    // Tick only while running; elapsed time comes from timestamps, not tick counts
    useEffect(() => {
        if (timer.status !== "running") return;
        const id = setInterval(() => setNow(Date.now()), 500);
        return () => clearInterval(id);
    }, [timer.status]);

    const elapsedMs = Math.max(
        0,
        timer.accumulatedMs + (timer.status === "running" ? now - timer.segmentStart : 0)
    );
    const elapsedSeconds = Math.floor(elapsedMs / 1000);

    const { data: sessionsRes, isLoading: sessionsLoading } = useQuery({
        queryKey: ["focusSessions", todayStr],
        queryFn: () => getFocusSessionsByDate(todayStr).then((r) => r.data),
    });
    const sessions = sessionsRes || [];
    const todayTotal = sessions.reduce((s, x) => s + x.durationSeconds, 0);

    const refresh = () => {
        queryClient.invalidateQueries({ queryKey: ["focusSessions"] });
        queryClient.invalidateQueries({ queryKey: ["focusSummary"] });
    };

    const saveMut = useMutation({
        mutationFn: createFocusSessionApi,
        onSuccess: () => {
            toast.success("Focus session saved");
            setTimer(IDLE);
            setNameInput("");
            refresh();
        },
        onError: (e) =>
            toast.error(e.response?.data?.message || "Failed to save session. Press Stop to retry."),
    });

    const deleteMut = useMutation({
        mutationFn: deleteFocusSessionApi,
        onSuccess: () => {
            toast.success("Session deleted");
            refresh();
        },
        onError: () => toast.error("Failed to delete session"),
    });

    const handleStart = (e) => {
        e.preventDefault();
        if (!nameInput.trim()) return;
        const t = Date.now();
        setNow(t);
        setTimer({
            status: "running",
            name: nameInput.trim(),
            startedAt: t,
            segmentStart: t,
            accumulatedMs: 0,
        });
    };

    const handlePause = () => {
        const t = Date.now();
        setTimer((p) => ({
            ...p,
            status: "paused",
            accumulatedMs: p.accumulatedMs + (t - p.segmentStart),
            segmentStart: null,
        }));
    };

    const handleResume = () => {
        const t = Date.now();
        setNow(t);
        setTimer((p) => ({ ...p, status: "running", segmentStart: t }));
    };

    const handleStop = () => {
        const t = Date.now();
        const totalMs =
            timer.accumulatedMs + (timer.status === "running" ? t - timer.segmentStart : 0);
        const durationSeconds = Math.round(totalMs / 1000);

        if (durationSeconds < 1) {
            setTimer(IDLE);
            return;
        }

        // Freeze the timer first so a failed save can be retried without losing time
        setTimer((p) => ({ ...p, status: "paused", accumulatedMs: totalMs, segmentStart: null }));

        saveMut.mutate({
            name: timer.name,
            date: fmtDate(new Date(timer.startedAt)),
            startedAt: new Date(timer.startedAt).toISOString(),
            endedAt: new Date(t).toISOString(),
            durationSeconds,
        });
    };

    const handleDiscard = () => {
        if (window.confirm("Discard this session without saving?")) {
            setTimer(IDLE);
            setNameInput("");
        }
    };

    const isIdle = timer.status === "idle";
    const isRunning = timer.status === "running";

    return (
        <section className="bg-gray-950 border border-gray-800 rounded-2xl p-5 sm:p-6 animate-fade-in-up">
            <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold">Study Timer</h2>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">
                        Name your session, start focusing, stop to save
                    </p>
                </div>
                <span className="px-2.5 py-0.5 bg-gray-900 text-gray-400 border border-gray-800 text-xs font-semibold rounded-full whitespace-nowrap">
                    Today: {formatShort(todayTotal)}
                </span>
            </div>

            {isIdle ? (
                <form onSubmit={handleStart} className="flex flex-col sm:flex-row gap-2">
                    <input
                        className="flex-1 bg-black border border-gray-800 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-all text-sm"
                        placeholder="Session name (e.g. React hooks revision)"
                        value={nameInput}
                        maxLength={100}
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!nameInput.trim()}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Start
                    </button>
                </form>
            ) : (
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span
                            className={`w-2 h-2 rounded-full ${isRunning ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                                }`}
                        />
                        <p className="text-sm text-gray-300 font-medium truncate max-w-xs">
                            {timer.name}
                        </p>
                        <span className="text-xs text-gray-500">
                            {isRunning ? "Running" : "Paused"}
                        </span>
                    </div>

                    <div className="text-5xl sm:text-6xl font-mono font-bold tracking-tight tabular-nums mb-5">
                        {formatClock(elapsedSeconds)}
                    </div>

                    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                        {isRunning ? (
                            <button
                                onClick={handlePause}
                                className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                            >
                                Pause
                            </button>
                        ) : (
                            <button
                                onClick={handleResume}
                                disabled={saveMut.isPending}
                                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-sm font-bold transition-all disabled:opacity-50 cursor-pointer"
                            >
                                Resume
                            </button>
                        )}
                        <button
                            onClick={handleStop}
                            disabled={saveMut.isPending}
                            className="px-5 py-2.5 bg-white hover:bg-gray-200 text-black rounded-xl text-sm font-bold transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {saveMut.isPending ? "Saving..." : "Stop & Save"}
                        </button>
                        <button
                            onClick={handleDiscard}
                            disabled={saveMut.isPending}
                            className="px-4 py-2.5 text-gray-500 hover:text-red-400 text-sm font-medium transition-colors cursor-pointer"
                        >
                            Discard
                        </button>
                    </div>
                </div>
            )}

            {/* Today's sessions */}
            <div className="mt-6 pt-5 border-t border-gray-900">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                    Today's Sessions
                </h3>
                {sessionsLoading ? (
                    <div className="skeleton h-10 rounded-xl" />
                ) : sessions.length === 0 ? (
                    <p className="text-gray-500 text-xs">No sessions saved yet today</p>
                ) : (
                    <ul className="space-y-2">
                        {sessions.map((s) => (
                            <li
                                key={s._id}
                                className="group flex items-center gap-3 bg-black border border-gray-800 rounded-xl px-4 py-2.5"
                            >
                                <span className="flex-1 text-sm text-white truncate">{s.name}</span>
                                <span className="text-xs text-emerald-400 font-semibold whitespace-nowrap">
                                    {formatShort(s.durationSeconds)}
                                </span>
                                <button
                                    onClick={() => deleteMut.mutate(s._id)}
                                    aria-label="Delete session"
                                    title="Delete session"
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
            </div>
        </section>
    );
}