// import { useContext, useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { getProfileApi, updateProfileApi } from "../../api/profile";
// import { AuthContext } from "../../context/AuthContext";
// import { toast } from "react-hot-toast";

// export default function Profile() {
//     const { setUser } = useContext(AuthContext);
//     const [form, setForm] = useState({ name: "", avatar: "", theme: "light" });

//     const { data, isLoading } = useQuery({
//         queryKey: ["profile"],
//         queryFn: () => getProfileApi().then((res) => res.data),
//     });

//     const mutation = useMutation({
//         mutationFn: updateProfileApi,
//         onSuccess: (res) => {
//             setUser(res.data);
//             const theme = res.data.theme;
//             const root = document.documentElement;
//             if (theme === "dark") root.classList.add("dark");
//             else root.classList.remove("dark");
//             toast.success("Profile updated");
//         },
//         onError: (err) => {
//             toast.error(err.response?.data?.message || "Update failed");
//         },
//     });

//     useEffect(() => {
//         if (data) {
//             setForm({
//                 name: data.name || "",
//                 avatar: data.avatar || "",
//                 theme: data.theme || "light",
//             });
//         }
//     }, [data]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         mutation.mutate(form);
//     };

//     if (isLoading || !data) {
//         return (
//             <>
//                 <Navbar />
//                 <div className="p-6">Loading...</div>
//             </>
//         );
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="p-6 max-w-xl mx-auto">
//                 <h1 className="text-2xl font-bold mb-4">Profile</h1>
//                 <form className="space-y-4" onSubmit={handleSubmit}>
//                     <div>
//                         <label className="block text-sm mb-1">Name</label>
//                         <input
//                             className="w-full border rounded p-2 dark:bg-gray-700"
//                             value={form.name}
//                             onChange={(e) =>
//                                 setForm({
//                                     ...form,
//                                     name: e.target.value,
//                                 })
//                             }
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm mb-1">Avatar URL</label>
//                         <input
//                             className="w-full border rounded p-2 dark:bg-gray-700"
//                             value={form.avatar}
//                             onChange={(e) =>
//                                 setForm({
//                                     ...form,
//                                     avatar: e.target.value,
//                                 })
//                             }
//                         />
//                         {form.avatar && (
//                             <img
//                                 src={form.avatar}
//                                 alt="avatar"
//                                 className="w-16 h-16 rounded-full mt-2 object-cover"
//                             />
//                         )}
//                     </div>

//                     <div>
//                         <label className="block text-sm mb-1">Theme</label>
//                         <div className="flex items-center gap-4">
//                             <label className="flex items-center gap-1 text-sm">
//                                 <input
//                                     type="radio"
//                                     name="theme"
//                                     value="light"
//                                     checked={form.theme === "light"}
//                                     onChange={(e) =>
//                                         setForm({
//                                             ...form,
//                                             theme: e.target.value,
//                                         })
//                                     }
//                                 />
//                                 Light
//                             </label>
//                             <label className="flex items-center gap-1 text-sm">
//                                 <input
//                                     type="radio"
//                                     name="theme"
//                                     value="dark"
//                                     checked={form.theme === "dark"}
//                                     onChange={(e) =>
//                                         setForm({
//                                             ...form,
//                                             theme: e.target.value,
//                                         })
//                                     }
//                                 />
//                                 Dark
//                             </label>
//                         </div>
//                     </div>

//                     <button className="px-4 py-2 bg-blue-600 text-white rounded">
//                         Save
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// }


import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProfileApi, updateProfileApi } from "../../api/profile";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Profile() {
    const { setUser } = useContext(AuthContext);
    const [form, setForm] = useState({ name: "", avatar: "", theme: "dark" });
    const [avatarLoaded, setAvatarLoaded] = useState(false);
    const [avatarError, setAvatarError] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfileApi().then((res) => res.data),
    });

    const mutation = useMutation({
        mutationFn: updateProfileApi,
        onSuccess: (res) => {
            setUser(res.data);
            const theme = res.data.theme;
            const root = document.documentElement;
            if (theme === "dark") root.classList.add("dark");
            else root.classList.remove("dark");
            toast.success("Profile updated");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Update failed");
        },
    });

    useEffect(() => {
        if (data) {
            setForm({
                name: data.name || "",
                avatar: data.avatar || "",
                theme: data.theme || "dark",
            });
        }
    }, [data]);

    useEffect(() => {
        setAvatarLoaded(false);
        setAvatarError(false);
    }, [form.avatar]);

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    if (isLoading || !data) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
                <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          .skeleton {
            background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
        `}</style>
                <Navbar />
                <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
                    <div className="skeleton h-10 w-32 rounded-xl mb-8" />
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="skeleton w-20 h-20 rounded-full" />
                            <div className="space-y-2">
                                <div className="skeleton h-5 w-32 rounded-lg" />
                                <div className="skeleton h-4 w-48 rounded-lg" />
                            </div>
                        </div>
                        <div className="skeleton h-12 w-full rounded-xl" />
                        <div className="skeleton h-12 w-full rounded-xl" />
                        <div className="skeleton h-20 w-full rounded-xl" />
                        <div className="skeleton h-12 w-32 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }
        .input-field {
          transition: all 0.2s ease;
        }
        .input-field:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        .btn-glow:hover {
          animation: pulse-glow 1.5s infinite;
        }
        .theme-card {
          transition: all 0.3s ease;
        }
        .theme-card:hover {
          transform: translateY(-2px);
        }
        .theme-card.selected {
          border-color: #3b82f6;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        .avatar-skeleton {
          background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

            <Navbar />

            <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
                    <div className="p-2.5 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/20">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Profile</h1>
                        <p className="text-sm text-gray-400">Manage your account settings</p>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden animate-fade-in-up stagger-1">
                    {/* Avatar Section */}
                    <div className="p-6 border-b border-gray-700/50 bg-linear-to-r from-blue-500/5 to-purple-500/5">
                        <div className="flex flex-col sm:flex-row items-center gap-5">
                            {/* Avatar Preview */}
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-linear-to-br from-blue-500 to-purple-500 p-0.5">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                                        {form.avatar && !avatarError ? (
                                            <>
                                                {!avatarLoaded && (
                                                    <div className="absolute inset-0 avatar-skeleton rounded-full" />
                                                )}
                                                <img
                                                    src={form.avatar}
                                                    alt="avatar"
                                                    onLoad={() => setAvatarLoaded(true)}
                                                    onError={() => setAvatarError(true)}
                                                    className={`w-full h-full object-cover transition-opacity ${avatarLoaded ? 'opacity-100' : 'opacity-0'}`}
                                                />
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white bg-linear-to-br from-blue-500 to-purple-500">
                                                {form.name?.charAt(0).toUpperCase() || data.email?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="text-center sm:text-left">
                                <h2 className="text-xl font-semibold text-white">
                                    {form.name || 'Your Name'}
                                </h2>
                                <p className="text-sm text-gray-400 mt-0.5">{data.email}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Member since {new Date(data.createdAt || Date.now()).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div className="animate-fade-in stagger-1">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Display Name
                            </label>
                            <input
                                className="input-field w-full bg-gray-800/50 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>

                        {/* Avatar URL Field */}
                        <div className="animate-fade-in stagger-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Avatar URL
                            </label>
                            <input
                                className="input-field w-full bg-gray-800/50 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                                placeholder="https://example.com/avatar.jpg"
                                value={form.avatar}
                                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                Enter a URL to an image for your profile picture
                            </p>
                        </div>


                        {/* Submit Button */}
                        <div className="pt-4 animate-fade-in stagger-4">
                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="btn-glow w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {mutation.isPending ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Bottom accent */}
                    <div className="h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
                </div>
            </div>
        </div>
    );
}