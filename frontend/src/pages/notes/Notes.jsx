import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { createNote, deleteNote, getNotes, updateNote } from "../../api/notes";

const dateLabel = (date) => new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

export default function Notes() {
    const client = useQueryClient();
    const { data: notes = [], isLoading } = useQuery({ queryKey: ["notes"], queryFn: () => getNotes().then((res) => res.data) });
    const [selectedId, setSelectedId] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const selected = notes.find((note) => note._id === selectedId);

    useEffect(() => {
        if (!selected) {
            if (!selectedId && notes.length) setSelectedId(notes[0]._id);
            return;
        }
        setTitle(selected.title);
        setContent(selected.content);
    }, [selectedId, selected?._id]);

    const refresh = () => client.invalidateQueries({ queryKey: ["notes"] });
    const create = useMutation({
        mutationFn: () => createNote({ title: "Untitled note", content: "" }),
        onSuccess: (res) => { refresh(); setSelectedId(res.data._id); },
        onError: () => toast.error("Could not create note"),
    });
    const save = useMutation({
        mutationFn: () => updateNote(selectedId, { title, content }),
        onSuccess: refresh,
        onError: (e) => toast.error(e.response?.data?.message || "Could not save note"),
    });
    const remove = useMutation({
        mutationFn: () => deleteNote(selectedId),
        onSuccess: () => { toast.success("Note deleted"); setSelectedId(null); refresh(); },
        onError: () => toast.error("Could not delete note"),
    });

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                    <div><p className="text-sm text-violet-300 font-medium mb-2">PERSONAL WORKSPACE</p><h1 className="text-3xl sm:text-4xl font-bold">Notes</h1><p className="text-gray-400 mt-2">A quiet space for ideas, class notes, and reminders.</p></div>
                    <button onClick={() => create.mutate()} disabled={create.isPending} className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 disabled:opacity-50">+ New note</button>
                </div>
                <div className="grid min-h-[68vh] grid-cols-1 overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 md:grid-cols-[280px_1fr]">
                    <aside className="border-b border-gray-800 md:border-b-0 md:border-r">
                        <div className="border-b border-gray-800 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Your notes <span className="ml-1 text-gray-400">{notes.length}</span></div>
                        {isLoading ? <p className="p-5 text-sm text-gray-500">Loading notes…</p> : notes.length === 0 ? <div className="p-5 text-sm text-gray-500">No notes yet. Create one to get started.</div> : (
                            <ul className="max-h-[60vh] space-y-1 overflow-y-auto p-2 md:max-h-[calc(68vh-48px)]">{notes.map((note) => <li key={note._id}><button onClick={() => setSelectedId(note._id)} className={`w-full rounded-xl px-3 py-3 text-left transition ${selectedId === note._id ? "bg-gray-800" : "hover:bg-gray-900"}`}><span className="block truncate text-sm font-medium text-gray-100">{note.title || "Untitled note"}</span><span className="mt-1 block truncate text-xs text-gray-500">{note.content || "No additional text"}</span><span className="mt-2 block text-[11px] text-gray-600">Edited {dateLabel(note.updatedAt)}</span></button></li>)}</ul>
                        )}
                    </aside>
                    <section className="flex min-h-[56vh] flex-col">
                        {selected ? <>
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 px-4 py-3 sm:px-6"><span className="text-xs text-gray-500">Last edited {dateLabel(selected.updatedAt)}</span><div className="flex gap-2"><button onClick={() => remove.mutate()} disabled={remove.isPending} className="rounded-lg border border-gray-800 px-3 py-2 text-xs text-gray-400 hover:border-red-900 hover:text-red-300">Delete</button><button onClick={() => save.mutate()} disabled={save.isPending || (title === selected.title && content === selected.content)} className="rounded-lg bg-violet-400 px-4 py-2 text-xs font-bold text-black hover:bg-violet-300 disabled:cursor-not-allowed disabled:opacity-50">{save.isPending ? "Saving…" : "Save note"}</button></div></div>
                            <input value={title} maxLength={160} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" className="bg-transparent px-5 pt-6 text-2xl font-semibold text-white outline-none placeholder:text-gray-600 sm:px-8" />
                            <textarea value={content} maxLength={50000} onChange={(e) => setContent(e.target.value)} placeholder="Start writing…" className="min-h-[45vh] flex-1 resize-none bg-transparent px-5 py-5 text-sm leading-7 text-gray-300 outline-none placeholder:text-gray-600 sm:px-8" />
                        </> : <div className="flex flex-1 flex-col items-center justify-center p-8 text-center"><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-800 bg-black text-2xl">✎</div><h2 className="font-semibold">Your ideas, in one place</h2><p className="mt-2 max-w-sm text-sm text-gray-500">Create a note to capture what you want to remember.</p><button onClick={() => create.mutate()} className="mt-5 rounded-xl border border-gray-700 px-4 py-2 text-sm text-gray-200 hover:bg-gray-900">Create your first note</button></div>}
                    </section>
                </div>
            </main>
        </div>
    );
}
