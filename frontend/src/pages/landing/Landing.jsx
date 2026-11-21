// import { useState } from "react";
// import { Link } from "react-router-dom";
// import TutorialModal from "../../components/TutorialModal";
// import { TUTORIAL_VIDEO_ID } from "../../config/tutorial";

// const Icon = ({ children }) => (
//     <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         {children}
//     </svg>
// );

// const features = [
//     {
//         title: "YouTube, organised",
//         text: "Save videos and playlists and turn them into your own courses.",
//         icon: <Icon><circle cx="12" cy="12" r="9" /><path d="m10 9 5 3-5 3V9Z" /></Icon>,
//     },
//     {
//         title: "Daily planner",
//         text: "Plan each day on a calendar and tick tasks off as you go.",
//         icon: <Icon><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /></Icon>,
//     },
//     {
//         title: "Notes",
//         text: "Keep your study notes next to the material you're learning from.",
//         icon: <Icon><path d="M8 4h8l4 4v12H4V4h4Z" /><path d="M8 14h8M8 18h6" /></Icon>,
//     },
//     {
//         title: "Focus timer",
//         text: "Time your study sessions and look back at how much you focused.",
//         icon: <Icon><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2M9 3h6" /></Icon>,
//     },
//     {
//         title: "One dashboard",
//         text: "See your learning in one place instead of juggling five apps.",
//         icon: <Icon><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></Icon>,
//     },
//     {
//         title: "Quick sign-in",
//         text: "Continue with Google or use email and password. No setup needed.",
//         icon: <Icon><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>,
//     },
// ];

// const steps = [
//     { n: "1", title: "Create your account", text: "Sign up with Google or email in a few seconds." },
//     { n: "2", title: "Add what you're learning", text: "Save YouTube videos and playlists as your courses." },
//     { n: "3", title: "Plan, note and focus", text: "Schedule your days, take notes and run focus sessions." },
// ];

// const Logo = () => (
//     <div className="flex items-center gap-3">
//         <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-700 bg-gray-900 text-white">
//             <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//                 <path d="M12 6.2c-2.5-1.6-5.4-1.6-9-0.1v13c3.6-1.5 6.5-1.5 9 .1m0-13c2.5-1.6 5.4-1.6 9-.1v13c-3.6-1.5-6.5-1.5-9 .1m0-13v13" />
//             </svg>
//         </span>
//         <span className="text-lg font-bold tracking-tight text-white">Study Room</span>
//     </div>
// );

// const Preview = () => (
//     <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-gray-800 bg-[#0a0a0a] p-4 text-left shadow-2xl shadow-blue-500/10">
//         <div className="mb-4 flex gap-1.5">
//             <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
//             <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
//             <span className="h-2.5 w-2.5 rounded-full bg-gray-700" />
//         </div>
//         <div className="grid gap-4 md:grid-cols-5">
//             <div className="rounded-xl border border-gray-800 bg-gray-950 p-5 md:col-span-3">
//                 <p className="text-sm font-medium text-gray-300">Today's plan</p>
//                 <ul className="mt-4 space-y-3 text-sm">
//                     {[["Watch video 3 of the course", true], ["Write notes on the chapter", true], ["Practice problems", false]].map(([text, done]) => (
//                         <li key={text} className="flex items-center gap-3">
//                             <span className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${done ? "border-green-500/40 bg-green-500/15 text-green-400" : "border-gray-700 text-transparent"}`}>✓</span>
//                             <span className={done ? "text-gray-500 line-through" : "text-gray-200"}>{text}</span>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="flex flex-col items-center justify-center rounded-xl border border-gray-800 bg-gray-950 p-5 md:col-span-2">
//                 <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-gray-800 border-t-blue-500">
//                     <span className="text-xl font-semibold text-white">25:00</span>
//                 </div>
//                 <p className="mt-3 text-sm text-gray-400">Focus session</p>
//             </div>
//         </div>
//     </div>
// );

// export default function Landing() {
//     const [showTutorial, setShowTutorial] = useState(false);

//     return (
//         <div className="min-h-screen bg-black text-white">
//             <header className="sticky top-0 z-50 border-b border-gray-900 bg-black/70 backdrop-blur">
//                 <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
//                     <Logo />
//                     <nav className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
//                         <a href="#features" className="hover:text-white">Features</a>
//                         <a href="#how" className="hover:text-white">How it works</a>
//                         {TUTORIAL_VIDEO_ID && (
//                             <button onClick={() => setShowTutorial(true)} className="hover:text-white">Tutorial</button>
//                         )}
//                     </nav>
//                     <div className="flex items-center gap-2">
//                         <Link to="/login" className="rounded-xl px-4 py-2 text-sm text-gray-300 hover:text-white">Log in</Link>
//                         <Link to="/signup" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200">Get started</Link>
//                     </div>
//                 </div>
//             </header>

//             {/* Hero */}
//             <section className="relative overflow-hidden">
//                 <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.22),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.14),transparent_45%)]" />
//                 <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 text-center md:pt-28">
//                     <span className="rounded-full border border-gray-800 bg-gray-900/60 px-4 py-1.5 text-xs text-gray-400">
//                         Built for focused learners
//                     </span>
//                     <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
//                         Your personal space to learn, plan and focus
//                     </h1>
//                     <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
//                         Turn YouTube videos into courses, plan your days, keep notes and time your
//                         focus sessions, all in one place.
//                     </p>
//                     <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
//                         <Link to="/signup" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-gray-200">
//                             Get started
//                         </Link>
//                         <Link to="/login" className="rounded-xl border border-gray-700 px-6 py-3 text-sm text-gray-200 hover:bg-gray-900">
//                             Log in
//                         </Link>
//                         {TUTORIAL_VIDEO_ID && (
//                             <button onClick={() => setShowTutorial(true)} className="rounded-xl border border-gray-700 px-6 py-3 text-sm text-gray-200 hover:bg-gray-900">
//                                 ▶ Watch tutorial
//                             </button>
//                         )}
//                     </div>
//                     <Preview />
//                 </div>
//             </section>

//             {/* Features */}
//             <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
//                 <h2 className="text-center text-3xl font-bold tracking-tight">Everything you need to study well</h2>
//                 <p className="mx-auto mt-3 max-w-xl text-center text-gray-400">
//                     Simple tools that work together, so you spend your time learning instead of organising.
//                 </p>
//                 <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                     {features.map((f) => (
//                         <div key={f.title} className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:border-gray-700">
//                             <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800 bg-gray-900 text-blue-400">
//                                 {f.icon}
//                             </span>
//                             <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
//                             <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{f.text}</p>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* How it works */}
//             <section id="how" className="scroll-mt-20 border-y border-gray-900 bg-[#050505]">
//                 <div className="mx-auto max-w-6xl px-6 py-20">
//                     <h2 className="text-center text-3xl font-bold tracking-tight">Get started in minutes</h2>
//                     <div className="mt-12 grid gap-8 md:grid-cols-3">
//                         {steps.map((s) => (
//                             <div key={s.n} className="text-center">
//                                 <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 bg-gray-900 font-semibold text-white">
//                                     {s.n}
//                                 </span>
//                                 <h3 className="mt-4 font-semibold text-white">{s.title}</h3>
//                                 <p className="mt-1.5 text-sm text-gray-400">{s.text}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Final call to action */}
//             <section className="mx-auto max-w-6xl px-6 py-20">
//                 <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-950 px-6 py-14 text-center">
//                     <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.25),transparent_60%)]" />
//                     <h2 className="relative text-3xl font-bold tracking-tight">Ready to study with focus?</h2>
//                     <p className="relative mx-auto mt-3 max-w-md text-gray-400">
//                         Create your account and set up your first course today.
//                     </p>
//                     <Link to="/signup" className="relative mt-7 inline-block rounded-xl bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-gray-200">
//                         Get started
//                     </Link>
//                 </div>
//             </section>

//             <footer className="border-t border-gray-900">
//                 <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-gray-600">
//                     <Logo />
//                     <p>© {new Date().getFullYear()} Study Room</p>
//                     <div className="flex gap-5">
//                         <Link to="/login" className="hover:text-gray-300">Log in</Link>
//                         <Link to="/signup" className="hover:text-gray-300">Sign up</Link>
//                     </div>
//                 </div>
//             </footer>

//             <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
//         </div>
//     );
// }

import { useState } from "react";
import { Link } from "react-router-dom";
import TutorialModal from "../../components/TutorialModal";
import { TUTORIAL_VIDEO_ID } from "../../config/tutorial";

const inside = [
    ["Videos", "Save single YouTube videos or whole playlists and watch them in one place."],
    ["Planner", "Plan each day on a calendar and tick tasks off as you finish them."],
    ["Notes", "Write notes in the same app, next to what you are studying."],
    ["Focus timer", "Start a timer for a study session and see how much time you focused."],
];

const steps = [
    ["Create an account", "Sign up with Google, or with an email and password."],
    ["Add what you are learning", "Save the videos and playlists you want to study from."],
    ["Plan, write and focus", "Schedule your days, take notes and run focus sessions."],
];

const exampleDay = [
    ["Watch lecture 4", true],
    ["Write notes on chapter 3", true],
    ["Solve practice problems", false],
    ["Focus session, 25 minutes", false],
];

export default function Landing() {
    const [showTutorial, setShowTutorial] = useState(false);

    return (
        <div className="min-h-screen bg-canvas text-ink">
            <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
                <span className="font-serif text-xl font-semibold tracking-tight">Study Room</span>
                <nav className="flex items-center gap-6 text-sm">
                    {TUTORIAL_VIDEO_ID && (
                        <button onClick={() => setShowTutorial(true)} className="hidden text-ink/70 hover:text-ink sm:block">
                            Tutorial
                        </button>
                    )}
                    <Link to="/login" className="text-ink/70 hover:text-ink">Log in</Link>
                    <Link to="/signup" className="rounded-md bg-accent px-4 py-2 font-semibold text-canvas hover:bg-accent-400">
                        Create account
                    </Link>
                </nav>
            </header>

            <main>
                <section className="mx-auto grid max-w-6xl gap-14 px-6 pb-24 pt-16 lg:grid-cols-12 lg:pt-24">
                    <div className="lg:col-span-7">
                        <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
                            One quiet place to study.
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
                            Save YouTube lectures as courses, plan each day, keep your notes beside them
                            and time your focus. Nothing else in the way.
                        </p>
                        <div className="mt-9 flex flex-wrap items-center gap-3">
                            <Link to="/signup" className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-canvas hover:bg-accent-400">
                                Create account
                            </Link>
                            <Link to="/login" className="rounded-md border border-ink/20 px-6 py-3 text-sm hover:bg-ink/5">
                                Log in
                            </Link>
                            {TUTORIAL_VIDEO_ID && (
                                <button onClick={() => setShowTutorial(true)} className="px-3 py-3 text-sm text-ink/70 underline-offset-4 hover:text-ink hover:underline">
                                    Watch the tutorial
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="rounded-md bg-surface p-6">
                            <p className="font-serif text-xl">An example day</p>
                            <ul className="mt-5 divide-y divide-ink/10">
                                {exampleDay.map(([text, done]) => (
                                    <li key={text} className="flex items-center gap-3 py-3 text-sm">
                                        <span className={`h-3 w-3 shrink-0 rounded-sm border ${done ? "border-accent bg-accent" : "border-ink/40"}`} />
                                        <span className={done ? "text-ink/50 line-through" : ""}>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="border-t border-ink/10">
                    <div className="mx-auto max-w-6xl px-6 py-20">
                        <h2 className="font-serif text-3xl tracking-tight">What is inside</h2>
                        <dl className="mt-10">
                            {inside.map(([name, text]) => (
                                <div key={name} className="grid gap-2 border-t border-ink/10 py-6 md:grid-cols-12 md:gap-8">
                                    <dt className="font-serif text-xl md:col-span-4">{name}</dt>
                                    <dd className="max-w-xl text-ink/70 md:col-span-8">{text}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                <section className="border-t border-ink/10 bg-surface">
                    <div className="mx-auto max-w-6xl px-6 py-20">
                        <h2 className="font-serif text-3xl tracking-tight">Start in three steps</h2>
                        <ol className="mt-10 grid gap-10 md:grid-cols-3">
                            {steps.map(([title, text], i) => (
                                <li key={title}>
                                    <span className="font-serif text-3xl text-accent">{i + 1}</span>
                                    <h3 className="mt-3 font-semibold">{title}</h3>
                                    <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-ink/70">{text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <section className="mx-auto max-w-6xl px-6 py-24">
                    <h2 className="max-w-lg font-serif text-4xl leading-tight tracking-tight">Ready when you are.</h2>
                    <Link to="/signup" className="mt-8 inline-block rounded-md bg-accent px-6 py-3 text-sm font-semibold text-canvas hover:bg-accent-400">
                        Create account
                    </Link>
                </section>
            </main>

            <footer className="border-t border-ink/10">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink/60">
                    <span className="font-serif text-base text-ink">Study Room</span>
                    <div className="flex gap-6">
                        <Link to="/login" className="hover:text-ink">Log in</Link>
                        <Link to="/signup" className="hover:text-ink">Create account</Link>
                    </div>
                </div>
            </footer>

            <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
        </div>
    );
}