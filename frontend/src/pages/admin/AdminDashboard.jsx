import { useState } from "react";
import Navbar from "../../components/Navbar";
import AdminOverview from "./AdminOverview";
import AdminUsers from "./AdminUsers";
import AdminActivity from "./AdminActivity";

const tabs = [["overview", "Overview"], ["users", "Users"], ["activity", "Activity"]];

export default function AdminDashboard() {
    const [tab, setTab] = useState("overview");

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-6xl p-6 pt-16 md:pt-6">
                <h1 className="text-2xl font-bold text-white">Admin</h1>
                <div className="mt-4 flex w-fit gap-1 rounded-xl border border-gray-800 bg-gray-950 p-1">
                    {tabs.map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setTab(key)}
                            className={`rounded-lg px-4 py-1.5 text-sm ${tab === key ? "bg-white font-medium text-black" : "text-gray-400 hover:text-white"}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <div className="mt-6">
                    {tab === "overview" && <AdminOverview />}
                    {tab === "users" && <AdminUsers />}
                    {tab === "activity" && <AdminActivity />}
                </div>
            </div>
        </>
    );
}