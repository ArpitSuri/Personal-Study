import { useQuery } from "@tanstack/react-query";
import { getAdminLogs } from "../../api/admin";

const labels = {
    "user.suspend": "Suspended user",
    "user.reactivate": "Reactivated user",
    "user.make_admin": "Made admin",
    "user.remove_admin": "Removed admin",
    "user.delete": "Deleted user",
};

export default function AdminActivity() {
    const { data: logs = [], isLoading } = useQuery({
        queryKey: ["admin-logs"],
        queryFn: () => getAdminLogs().then((r) => r.data),
    });

    return (
        <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-950">
            <table className="w-full min-w-[640px] text-left">
                <thead className="text-xs uppercase text-gray-500">
                    <tr>
                        <th className="px-4 py-3">When</th>
                        <th className="px-4 py-3">Admin</th>
                        <th className="px-4 py-3">Action</th>
                        <th className="px-4 py-3">Target</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <tr><td colSpan={4} className="px-4 py-6 text-sm text-gray-500">Loading…</td></tr>}
                    {!isLoading && logs.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-sm text-gray-500">No admin actions yet</td></tr>}
                    {logs.map((l) => (
                        <tr key={l._id} className="border-t border-gray-800">
                            <td className="px-4 py-3 text-sm text-gray-400">{new Date(l.createdAt).toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{l.adminEmail}</td>
                            <td className="px-4 py-3 text-sm text-white">{labels[l.action] || l.action}</td>
                            <td className="px-4 py-3 text-sm text-gray-400">{l.targetEmail}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}