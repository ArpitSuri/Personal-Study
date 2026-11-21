import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "../../api/admin";
import { timeAgo } from "./ui";

const Stat = ({ label, value, sub }) => (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </div>
);

export default function AdminOverview() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: () => getAdminStats().then((r) => r.data),
        refetchInterval: 60000,
    });

    if (isLoading) return <p className="text-gray-500">Loading…</p>;
    if (isError) return <p className="text-red-400">Could not load stats</p>;

    const { users, content, focusHours, signups, recentUsers, topFocus } = data;
    const max = Math.max(1, ...signups.map((s) => s.count));

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <Stat label="Total users" value={users.total} sub={`+${users.new7d} this week`} />
                <Stat label="Active (24h)" value={users.active24h} sub={`${users.active7d} in 7 days`} />
                <Stat label="Suspended" value={users.blocked} />
                <Stat label="Focus hours" value={focusHours} sub="all users combined" />
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <Stat label="Playlists" value={content.playlists} />
                <Stat label="Videos" value={content.videos} />
                <Stat label="Notes" value={content.notes} />
                <Stat label="Planner tasks" value={content.tasks} />
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5 lg:col-span-2">
                    <p className="mb-4 text-sm font-medium text-gray-300">Signups, last 14 days</p>
                    <div className="flex h-40 items-end gap-2">
                        {signups.map((s) => (
                            <div key={s.date} className="flex flex-1 flex-col items-center gap-1" title={`${s.date}: ${s.count}`}>
                                <span className="text-[10px] text-gray-500">{s.count || ""}</span>
                                <div className="w-full rounded-t bg-blue-500/70" style={{ height: `${Math.max((s.count / max) * 100, 2)}%` }} />
                                <span className="text-[10px] text-gray-600">{s.date.slice(8)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
                    <p className="mb-4 text-sm font-medium text-gray-300">Newest users</p>
                    <ul className="space-y-3">
                        {recentUsers.map((u) => (
                            <li key={u._id} className="flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="truncate text-sm text-white">{u.name}</p>
                                    <p className="truncate text-xs text-gray-500">{u.email}</p>
                                </div>
                                <span className="shrink-0 text-xs text-gray-600">{timeAgo(u.createdAt)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
                <p className="mb-4 text-sm font-medium text-gray-300">Top focus time</p>
                {topFocus.length === 0 && <p className="text-sm text-gray-500">No focus sessions yet</p>}
                <ul className="space-y-3">
                    {topFocus.map((u, i) => (
                        <li key={u.email} className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="w-5 text-sm text-gray-600">{i + 1}</span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm text-white">{u.name}</p>
                                    <p className="truncate text-xs text-gray-500">{u.email}</p>
                                </div>
                            </div>
                            <span className="shrink-0 text-sm text-gray-300">{u.hours} h</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}