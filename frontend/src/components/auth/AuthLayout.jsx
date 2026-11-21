// const features = [
//     { title: "Playlists & videos", text: "Turn any YouTube playlist into a structured course." },
//     { title: "Planner & notes", text: "Plan each day and keep your notes in one place." },
//     { title: "Focus tracking", text: "Time your sessions and see your progress over time." },
// ];

// const Logo = () => (
//     <div className="flex items-center gap-3">
//         <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-700 bg-gray-900 text-white">
//             <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                 <path d="M12 6.2c-2.5-1.6-5.4-1.6-9-0.1v13c3.6-1.5 6.5-1.5 9 .1m0-13c2.5-1.6 5.4-1.6 9-.1v13c-3.6-1.5-6.5-1.5-9 .1m0-13v13" />
//             </svg>
//         </span>
//         <span className="text-lg font-bold tracking-tight text-white">Personal LMS</span>
//     </div>
// );

// export default function AuthLayout({ title, subtitle, children, footer }) {
//     return (
//         <div className="grid min-h-screen bg-black text-white lg:grid-cols-2">
//             {/* Brand panel (desktop only) */}
//             <aside className="relative hidden overflow-hidden border-r border-gray-800 bg-[#080808] p-12 lg:flex lg:flex-col lg:justify-between">
//                 <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(59,130,246,0.22),transparent_50%),radial-gradient(circle_at_85%_90%,rgba(168,85,247,0.16),transparent_45%)]" />
//                 <div className="relative"><Logo /></div>

//                 <div className="relative max-w-md">
//                     <h2 className="text-4xl font-bold leading-tight tracking-tight">
//                         Learn with focus.<br />Track every step.
//                     </h2>
//                     <p className="mt-4 text-gray-400">
//                         Your personal space to organise courses, plan your days and stay consistent.
//                     </p>
//                     <ul className="mt-10 space-y-5">
//                         {features.map((f) => (
//                             <li key={f.title} className="flex gap-4">
//                                 <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-gray-900 text-xs text-green-400">✓</span>
//                                 <div>
//                                     <p className="font-medium text-gray-100">{f.title}</p>
//                                     <p className="text-sm text-gray-500">{f.text}</p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 <p className="relative text-xs text-gray-600">© {new Date().getFullYear()} Personal LMS</p>
//             </aside>

//             {/* Form side */}
//             <main className="flex items-center justify-center px-6 py-12">
//                 <div className="w-full max-w-md">
//                     <div className="mb-8 lg:hidden"><Logo /></div>
//                     <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
//                     <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
//                     <div className="mt-8">{children}</div>
//                     <p className="mt-8 text-center text-sm text-gray-400">{footer}</p>
//                 </div>
//             </main>
//         </div>
//     );
// }

import { Link } from "react-router-dom";

export default function AuthLayout({ title, subtitle, children, footer }) {
    return (
        <div className="flex min-h-screen flex-col bg-canvas text-ink">
            <header className="px-6 py-6 sm:px-10">
                <Link to="/" className="font-serif text-xl font-semibold tracking-tight">
                    Study Room
                </Link>
            </header>

            <main className="flex flex-1 items-start justify-center px-6 pb-16 pt-6 sm:items-center sm:pt-0">
                <div className="w-full max-w-sm">
                    <h1 className="font-serif text-4xl tracking-tight">{title}</h1>
                    <p className="mt-2 text-sm text-ink/60">{subtitle}</p>
                    <div className="mt-8">{children}</div>
                    <p className="mt-8 text-sm text-ink/60">{footer}</p>
                </div>
            </main>
        </div>
    );
}