// import { useState } from "react";

// const Icon = ({ children }) => (
//     <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//         {children}
//     </svg>
// );

// export const MailIcon = () => <Icon><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>;
// export const LockIcon = () => <Icon><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>;
// export const UserIcon = () => <Icon><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>;
// const EyeIcon = () => <Icon><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></Icon>;
// const EyeOffIcon = () => <Icon><path d="M3 3l18 18" /><path d="M10.6 6.1A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6A16.7 16.7 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 4.3-1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></Icon>;

// export default function AuthField({ label, icon, type = "text", ...props }) {
//     const [show, setShow] = useState(false);
//     const isPassword = type === "password";

//     return (
//         <label className="block">
//             <span className="mb-1.5 block text-sm font-medium text-gray-300">{label}</span>
//             <div className="relative">
//                 <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">{icon}</span>
//                 <input
//                     type={isPassword && show ? "text" : type}
//                     className="h-11 w-full rounded-xl border border-gray-800 bg-gray-900/60 pl-11 pr-11 text-sm text-white placeholder-gray-600 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-white/10"
//                     {...props}
//                 />
//                 {isPassword && (
//                     <button
//                         type="button"
//                         onClick={() => setShow((v) => !v)}
//                         aria-label={show ? "Hide password" : "Show password"}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
//                     >
//                         {show ? <EyeOffIcon /> : <EyeIcon />}
//                     </button>
//                 )}
//             </div>
//         </label>
//     );
// }


import { useState } from "react";

export default function AuthField({ label, type = "text", ...props }) {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";

    return (
        <label className="block">
            <span className="mb-1.5 block text-sm text-ink/80">{label}</span>
            <div className="relative">
                <input
                    type={isPassword && show ? "text" : type}
                    className="h-11 w-full rounded-md border border-ink/15 bg-surface px-3.5 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-accent"
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShow((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink/60 hover:text-ink"
                    >
                        {show ? "Hide" : "Show"}
                    </button>
                )}
            </div>
        </label>
    );
}