import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { createMeeting, deleteMeeting, getMeetings } from "../../api/meetings";

export default function Meetings() {
    const client = useQueryClient();
    const [title, setTitle] = useState("");
    const { data: meetings = [], isLoading } = useQuery({
        queryKey: ["meetings"],
        queryFn: () => getMeetings().then((res) => res.data),
    });
    const refresh = () => client.invalidateQueries({ queryKey: ["meetings"] });

    const create = useMutation({
        mutationFn: () => createMeeting({ title }),
        onSuccess: () => { setTitle(""); refresh(); toast.success("Room created"); },
        onError: (e) => toast.error(e.response?.data?.message || "Could not create room"),
    });
    const remove = useMutation({
        mutationFn: deleteMeeting,
        onSuccess: refresh,
        onError: () => toast.error("Could not delete room"),
    });

    const copyLink = (id) => {
        navigator.clipboard.writeText(`${window.location.origin}/meetings/${id}`);
        toast.success("Link copied");
    };

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-3xl p-6">
                <h1 className="mb-4 text-2xl font-bold text-white">Study Rooms</h1>
                <form
                    onSubmit={(e) => { e.preventDefault(); if (title.trim()) create.mutate(); }}
                    className="mb-6 flex gap-2"
                >
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Room title (e.g. DSA group study)"
                        maxLength={120}
                        className="flex-1 rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-gray-200"
                    />
                    <button className="rounded-xl bg-white px-4 py-2 font-medium text-black" disabled={create.isPending}>
                        Create
                    </button>
                </form>

                {isLoading && <p className="text-gray-500">Loading…</p>}
                <ul className="space-y-2">
                    {meetings.map((m) => (
                        <li key={m._id} className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-950 p-4">
                            <span className="text-gray-200">{m.title}</span>
                            <div className="flex gap-2 text-sm">
                                <Link to={`/meetings/${m._id}`} className="rounded-lg bg-green-600 px-3 py-1 text-white">Join</Link>
                                <button onClick={() => copyLink(m._id)} className="rounded-lg border border-gray-700 px-3 py-1 text-gray-300">Copy link</button>
                                <button onClick={() => remove.mutate(m._id)} className="rounded-lg border border-red-500/30 px-3 py-1 text-red-300">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}