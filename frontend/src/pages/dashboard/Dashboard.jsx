// import { useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getMyPlaylists, createPlaylistApi } from "../../api/playlists";
// import { getVideosApi, addVideoApi } from "../../api/videos";
// import Navbar from "../../components/Navbar";
// import Modal from "../../components/Modal";
// import VideoCard from "../../components/VideoCard";
// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";

// export default function Dashboard() {
//     const queryClient = useQueryClient();
//     const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
//     const [videoModalOpen, setVideoModalOpen] = useState(false);

//     const [playlistForm, setPlaylistForm] = useState({
//         title: "",
//         description: "",
//     });

//     const [videoForm, setVideoForm] = useState({
//         url: "",
//     });

//     const { data: playlistsRes } = useQuery({
//         queryKey: ["playlists"],
//         queryFn: () => getMyPlaylists().then((res) => res.data),
//     });

//     const { data: soloVideosRes } = useQuery({
//         queryKey: ["soloVideos"],
//         queryFn: () => getVideosApi({ type: "solo" }).then((res) => res.data),
//     });

//     const playlists = playlistsRes || [];
//     const soloVideos = soloVideosRes || [];

//     const handleCreatePlaylist = async (e) => {
//         e.preventDefault();
//         try {
//             await createPlaylistApi(playlistForm);
//             toast.success("Playlist created");
//             setPlaylistModalOpen(false);
//             setPlaylistForm({ title: "", description: "" });
//             queryClient.invalidateQueries(["playlists"]);
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Failed to create playlist");
//         }
//     };

//     const handleAddSoloVideo = async (e) => {
//         e.preventDefault();
//         try {
//             await addVideoApi({ url: videoForm.url });
//             toast.success("Video saved");
//             setVideoModalOpen(false);
//             setVideoForm({ url: "" });
//             queryClient.invalidateQueries(["soloVideos"]);
//         } catch (err) {
//             toast.error(err.response?.data?.message || "Failed to add video");
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="p-6 max-w-5xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold">Dashboard</h1>
//                     <div className="flex gap-2">
//                         <button
//                             onClick={() => setVideoModalOpen(true)}
//                             className="px-3 py-1 bg-green-600 text-white rounded text-sm"
//                         >
//                             + Save Solo Video
//                         </button>
//                         <button
//                             onClick={() => setPlaylistModalOpen(true)}
//                             className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
//                         >
//                             + New Playlist
//                         </button>
//                     </div>
//                 </div>

//                 {/* Playlists */}
//                 <section className="mb-8">
//                     <h2 className="text-xl font-semibold mb-3">Playlists</h2>
//                     {playlists.length === 0 ? (
//                         <p className="text-sm text-gray-500">
//                             No playlists yet. Create one to organize your lectures.
//                         </p>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             {playlists.map((pl) => (
//                                 <Link
//                                     key={pl._id}
//                                     to={`/playlist/${pl._id}`}
//                                     className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-md"
//                                 >
//                                     <div className="font-semibold mb-1">{pl.title}</div>
//                                     <div className="text-xs text-gray-500">
//                                         {pl.description || "No description"}
//                                     </div>
//                                 </Link>
//                             ))}
//                         </div>
//                     )}
//                 </section>

//                 {/* Solo Videos */}
//                 <section>
//                     <h2 className="text-xl font-semibold mb-3">Solo Videos</h2>
//                     {soloVideos.length === 0 ? (
//                         <p className="text-sm text-gray-500">
//                             No solo videos saved. Save a YouTube link to start.
//                         </p>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             {soloVideos.map((video) => (
//                                 <VideoCard key={video._id} video={video} />
//                             ))}
//                         </div>
//                     )}
//                 </section>
//             </div>

//             {/* Create Playlist Modal */}
//             <Modal
//                 open={playlistModalOpen}
//                 onClose={() => setPlaylistModalOpen(false)}
//                 title="Create Playlist"
//             >
//                 <form className="space-y-3" onSubmit={handleCreatePlaylist}>
//                     <input
//                         className="w-full border rounded p-2 dark:bg-gray-700"
//                         placeholder="Title"
//                         value={playlistForm.title}
//                         onChange={(e) =>
//                             setPlaylistForm({ ...playlistForm, title: e.target.value })
//                         }
//                     />
//                     <textarea
//                         className="w-full border rounded p-2 dark:bg-gray-700"
//                         placeholder="Description (optional)"
//                         value={playlistForm.description}
//                         onChange={(e) =>
//                             setPlaylistForm({
//                                 ...playlistForm,
//                                 description: e.target.value,
//                             })
//                         }
//                     />
//                     <button className="w-full bg-blue-600 text-white p-2 rounded">
//                         Create
//                     </button>
//                 </form>
//             </Modal>

//             {/* Add Solo Video Modal */}
//             <Modal
//                 open={videoModalOpen}
//                 onClose={() => setVideoModalOpen(false)}
//                 title="Save Solo Video"
//             >
//                 <form className="space-y-3" onSubmit={handleAddSoloVideo}>
//                     <input
//                         className="w-full border rounded p-2 dark:bg-gray-700"
//                         placeholder="YouTube URL"
//                         value={videoForm.url}
//                         onChange={(e) =>
//                             setVideoForm({
//                                 ...videoForm,
//                                 url: e.target.value,
//                             })
//                         }
//                     />
//                     <button className="w-full bg-green-600 text-white p-2 rounded">
//                         Save
//                     </button>
//                 </form>
//             </Modal>
//         </>
//     );
// }


import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyPlaylists, createPlaylistApi } from "../../api/playlists";
import { getVideosApi, addVideoApi } from "../../api/videos";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import VideoCard from "../../components/VideoCard";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Dashboard() {
    const queryClient = useQueryClient();
    const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
    const [videoModalOpen, setVideoModalOpen] = useState(false);

    const [playlistForm, setPlaylistForm] = useState({
        title: "",
        description: "",
    });

    const [videoForm, setVideoForm] = useState({
        url: "",
    });

    const { data: playlistsRes, isLoading: playlistsLoading } = useQuery({
        queryKey: ["playlists"],
        queryFn: () => getMyPlaylists().then((res) => res.data),
    });

    const { data: soloVideosRes, isLoading: videosLoading } = useQuery({
        queryKey: ["soloVideos"],
        queryFn: () => getVideosApi({ type: "solo" }).then((res) => res.data),
    });

    const playlists = playlistsRes || [];
    const soloVideos = soloVideosRes || [];

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        try {
            await createPlaylistApi(playlistForm);
            toast.success("Playlist created");
            setPlaylistModalOpen(false);
            setPlaylistForm({ title: "", description: "" });
            queryClient.invalidateQueries(["playlists"]);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create playlist");
        }
    };

    const handleAddSoloVideo = async (e) => {
        e.preventDefault();
        try {
            await addVideoApi({ url: videoForm.url });
            toast.success("Video saved");
            setVideoModalOpen(false);
            setVideoForm({ url: "" });
            queryClient.invalidateQueries(["soloVideos"]);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add video");
        }
    };

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
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        .animate-slide-in {
          animation: slideIn 0.4s ease-out forwards;
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .btn-glow:hover {
          animation: pulse-glow 1.5s infinite;
        }
        .skeleton {
          background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
      `}</style>

            <Navbar />

            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                            Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1 text-sm sm:text-base">
                            Manage your playlists and videos
                        </p>
                    </div>

                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setVideoModalOpen(true)}
                            className="btn-glow group flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-emerald-500/20"
                        >
                            <svg className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Save Solo Video
                        </button>
                        <button
                            onClick={() => setPlaylistModalOpen(true)}
                            className="btn-glow group flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/20"
                        >
                            <svg className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Playlist
                        </button>
                    </div>
                </div>

                {/* Playlists Section */}
                <section className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-white">Playlists</h2>
                        <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
                            {playlists.length}
                        </span>
                    </div>

                    {playlistsLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="skeleton h-32 rounded-2xl" />
                            ))}
                        </div>
                    ) : playlists.length === 0 ? (
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center animate-fade-in">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-700/50 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-gray-400 mb-2">No playlists yet</p>
                            <p className="text-gray-500 text-sm">Create one to organize your lectures</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {playlists.map((pl, idx) => (
                                <Link
                                    key={pl._id}
                                    to={`/playlist/${pl._id}`}
                                    className={`card-hover group bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 opacity-0 animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                            </svg>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">
                                        {pl.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 line-clamp-2">
                                        {pl.description || "No description"}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Solo Videos Section */}
                <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-white">Solo Videos</h2>
                        <span className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded-full">
                            {soloVideos.length}
                        </span>
                    </div>

                    {videosLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="skeleton h-48 rounded-2xl" />
                            ))}
                        </div>
                    ) : soloVideos.length === 0 ? (
                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center animate-fade-in">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-700/50 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-400 mb-2">No solo videos saved</p>
                            <p className="text-gray-500 text-sm">Save a YouTube link to start</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {soloVideos.map((video, idx) => (
                                <div
                                    key={video._id}
                                    className={`card-hover opacity-0 animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}
                                >
                                    <VideoCard video={video} />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Create Playlist Modal */}
            <Modal
                open={playlistModalOpen}
                onClose={() => setPlaylistModalOpen(false)}
                title="Create Playlist"
            >
                <form className="space-y-4" onSubmit={handleCreatePlaylist}>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Title
                        </label>
                        <input
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter playlist title"
                            value={playlistForm.title}
                            onChange={(e) =>
                                setPlaylistForm({ ...playlistForm, title: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Description
                        </label>
                        <textarea
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            placeholder="Add a description (optional)"
                            rows={3}
                            value={playlistForm.description}
                            onChange={(e) =>
                                setPlaylistForm({
                                    ...playlistForm,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                    <button className="w-full bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white p-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                        Create Playlist
                    </button>
                </form>
            </Modal>

            {/* Add Solo Video Modal */}
            <Modal
                open={videoModalOpen}
                onClose={() => setVideoModalOpen(false)}
                title="Save Solo Video"
            >
                <form className="space-y-4" onSubmit={handleAddSoloVideo}>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            YouTube URL
                        </label>
                        <input
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                            placeholder="https://youtube.com/watch?v=..."
                            value={videoForm.url}
                            onChange={(e) =>
                                setVideoForm({
                                    ...videoForm,
                                    url: e.target.value,
                                })
                            }
                        />
                    </div>
                    <button className="w-full bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white p-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40">
                        Save Video
                    </button>
                </form>
            </Modal>
        </div>
    );
}