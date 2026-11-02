import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const links = [
    { path: "/", label: "Dashboard", icon: <svg viewBox="0 0 24 24"><path d="M4 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm10 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6ZM4 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2Zm10 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2Z" /></svg> },
    { path: "/planner", label: "Planner", icon: <svg viewBox="0 0 24 24"><path d="M8 3v4m8-4v4M4 10h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Zm3 9h3m-3 4h6" /></svg> },
    { path: "/notes", label: "Notes", icon: <svg viewBox="0 0 24 24"><path d="M8 4h8l4 4v12H4V4h4Zm0 0v5h8V4M8 14h8m-8 4h6" /></svg> },
    { path: "/youtube", label: "YouTube Videos", icon: <svg viewBox="0 0 24 24"><path d="m10 9 5 3-5 3V9Zm11 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg> },
    { path: "/profile", label: "Profile", icon: <svg viewBox="0 0 24 24"><path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-11 14a7 7 0 0 1 14 0H5Z" /></svg> },
];

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(() => localStorage.getItem("sidebar-collapsed") === "true");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("sidebar-collapsed", collapsed);
        return () => document.body.classList.remove("sidebar-collapsed");
    }, [collapsed]);
    useEffect(() => setMobileOpen(false), [location.pathname]);

    const toggleCollapsed = () => setCollapsed((value) => {
        localStorage.setItem("sidebar-collapsed", String(!value));
        return !value;
    });
    const isActive = (path) => path === "/youtube"
        ? ["/youtube", "/playlist", "/video"].some((prefix) => location.pathname.startsWith(prefix))
        : path === "/planner" ? ["/planner", "/calendar"].includes(location.pathname) : location.pathname === path;
    const handleLogout = async () => {
        setLoggingOut(true);
        try { await logout(); navigate("/login"); }
        finally { setLoggingOut(false); }
    };

    return <>
        <style>{`
            body { padding-left: 260px; transition: padding-left .25s ease; }
            body.sidebar-collapsed { padding-left: 76px; }
            .app-sidebar { width: 260px; transition: width .25s ease, transform .25s ease; }
            body.sidebar-collapsed .app-sidebar { width: 76px; }
            .sidebar-icon svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
            @media (max-width: 767px) { body, body.sidebar-collapsed { padding-left: 0; } .app-sidebar { width: 260px !important; } }
        `}</style>
        {mobileOpen && <button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-[59] bg-black/70 md:hidden" />}
        <button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="fixed left-4 top-4 z-[58] rounded-xl border border-gray-800 bg-gray-950 p-2.5 text-gray-200 shadow-lg md:hidden">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <aside className={`app-sidebar fixed inset-y-0 left-0 z-[60] flex flex-col border-r border-gray-800 bg-[#080808] ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            <div className={`flex h-[72px] items-center border-b border-gray-800 ${collapsed ? "justify-center px-3" : "justify-between px-5"}`}>
                <Link to="/" title="Personal LMS" className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-700 bg-gray-900 text-white"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 6.2c-2.5-1.6-5.4-1.6-9-0.1v13c3.6-1.5 6.5-1.5 9 .1m0-13c2.5-1.6 5.4-1.6 9-.1v13c-3.6-1.5-6.5-1.5-9 .1m0-13v13" /></svg></span>
                    {!collapsed && <span className="truncate text-lg font-bold tracking-tight text-white">Personal LMS</span>}
                </Link>
                <button onClick={toggleCollapsed} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title={collapsed ? "Expand sidebar" : "Collapse sidebar"} className={`${collapsed ? "hidden" : "hidden md:flex"} h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-900 hover:text-white`}>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m14 18-6-6 6-6" /></svg>
                </button>
            </div>
            {collapsed && <button onClick={toggleCollapsed} aria-label="Expand sidebar" title="Expand sidebar" className="mx-auto mt-3 hidden h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-900 hover:text-white md:flex"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m10 18 6-6-6-6" /></svg></button>}
            <div className="px-4 pb-2 pt-6"><p className={`px-2 text-[10px] font-semibold uppercase tracking-[.18em] text-gray-600 ${collapsed ? "md:hidden" : ""}`}>Workspace</p></div>
            <nav aria-label="Main navigation" className="flex-1 space-y-1 px-3">
                {links.map((link) => <Link key={link.path} to={link.path} title={collapsed ? link.label : undefined} aria-current={isActive(link.path) ? "page" : undefined} className={`sidebar-icon flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${isActive(link.path) ? "border border-gray-700 bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-900/70 hover:text-white"} ${collapsed ? "md:justify-center md:px-0" : ""}`}>
                    {link.icon}<span className={collapsed ? "md:hidden" : ""}>{link.label}</span>
                </Link>)}
            </nav>
            {user && <div className={`border-t border-gray-800 p-3 ${collapsed ? "md:px-2" : ""}`}>
                <div className={`mb-2 flex items-center gap-3 rounded-xl px-2 py-2 ${collapsed ? "md:justify-center md:px-0" : ""}`}>
                    <img className="h-9 w-9 shrink-0 rounded-full border border-gray-700 bg-gray-900 object-cover" src={user.avatar || "https://api.dicebear.com/9.x/avataaars/svg?seed=Nolan"} alt="" />
                    <div className={collapsed ? "md:hidden" : "min-w-0"}><p className="truncate text-sm font-medium text-gray-200">{user.name || "User"}</p><p className="truncate text-xs text-gray-500">{user.email}</p></div>
                </div>
                <button onClick={handleLogout} disabled={loggingOut} title={collapsed ? "Log out" : undefined} className={`flex h-10 w-full items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10 disabled:opacity-50 ${collapsed ? "md:justify-center md:px-0" : ""}`}>
                    <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 17l5-5-5-5m5 5H3m9-9h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6" /></svg><span className={collapsed ? "md:hidden" : ""}>{loggingOut ? "Logging out…" : "Log out"}</span>
                </button>
            </div>}
        </aside>
    </>;
}
