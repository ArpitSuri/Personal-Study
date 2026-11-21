import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getAdminUsers, setUserBlocked, setUserRole, deleteAdminUser } from "../../api/admin";
import { Badge, btnNeutral, btnDanger, timeAgo } from "./ui";

export default function AdminUsers() {
    const client = useQueryClient();
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);

    useEffect(() => {
        const t = setTimeout(() => { setQuery(search); setPage(1); }, 350);
        return () => clearTimeout(t);
    }, [search]);

    const { data, isLoading } = useQuery({
        queryKey: ["admin-users", query, status, page],
        queryFn: () => getAdminUsers({ search: query, status, page }).then((r) => r.data),
        placeholderData: (prev) => prev,
    });

    const run = async (action, message) => {
        try {
            await action();
            toast.success(message);
            client.invalidateQueries({ queryKey: ["admin-users"] });
            client.invalidateQueries({ queryKey: ["admin-stats"] });
            client.invalidateQueries({ queryKey: ["admin-logs"] });
        } catch (err) {
            toast.error(err.response?.data?.message || "Action failed");
        }
    };

    const remove = (u) => {
        if (window.confirm(`Delete ${u.email} and ALL their data? This cannot be undone.`))
            run(() => deleteAdminUser(u._id), "User deleted");
    };

    return (
        <div>
            <div className="mb-4 flex flex-wrap gap-3">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or email"
                    className="h-10 w-full max-w-sm rounded-xl border border-gray-800 bg-gray-900/60 px-4 text-sm text-white outline-none focus:border-gray-500"
                />
                <select
                    value={status}
                    onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                    className="h-10 rounded-xl border border-gray-800 bg-gray-900/60 px-3 text-sm text-white outline-none"
                >
                    <option value="all">All users</option>
                    <option value="suspended">Suspended only</option>
                </select>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-950">
                <table className="w-full min-w-[760px] text-left">
                    <thead className="text-xs uppercase text-gray-500">
                        <tr>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Joined</th>
                            <th className="px-4 py-3">Last active</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && <tr><td colSpan={6} className="px-4 py-6 text-sm text-gray-500">Loading…</td></tr>}
                        {data?.users.length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-sm text-gray-500">No users found</td></tr>}
                        {data?.users.map((u) => (
                            <tr key={u._id} className="border-t border-gray-800">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        {u.avatar
                                            ? <img src={u.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                                            : <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xs uppercase text-gray-300">{u.name?.[0]}</span>}
                                        <div className="min-w-0">
                                            <p className="truncate text-sm text-white">{u.name}</p>
                                            <p className="truncate text-xs text-gray-500">{u.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{u.isAdmin ? <Badge tone="blue">Admin</Badge> : <Badge>User</Badge>}</td>
                                <td className="px-4 py-3">{u.isBlocked ? <Badge tone="red">Suspended</Badge> : <Badge tone="green">Active</Badge>}</td>
                                <td className="px-4 py-3 text-sm text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-3 text-sm text-gray-400">{timeAgo(u.lastActiveAt)}</td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <button className={btnNeutral} onClick={() => run(() => setUserBlocked(u._id, !u.isBlocked), u.isBlocked ? "User reactivated" : "User suspended")}>
                                            {u.isBlocked ? "Reactivate" : "Suspend"}
                                        </button>
                                        <button className={btnNeutral} onClick={() => run(() => setUserRole(u._id, u.role === "admin" ? "user" : "admin"), "Role updated")}>
                                            {u.role === "admin" ? "Remove admin" : "Make admin"}
                                        </button>
                                        <button className={btnDanger} onClick={() => remove(u)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data && (
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>{data.total} users</span>
                    <div className="flex items-center gap-2">
                        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className={`${btnNeutral} disabled:opacity-40`}>Previous</button>
                        <span>Page {data.page} of {data.pages}</span>
                        <button disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)} className={`${btnNeutral} disabled:opacity-40`}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
}