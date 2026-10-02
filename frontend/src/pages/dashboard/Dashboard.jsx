import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyPlaylists, createPlaylistApi, deletePlaylistApi } from "../../api/playlists";
import { getVideosApi, addVideoApi, deleteVideoApi } from "../../api/videos";
import { getMonthSummary } from "../../api/calendar";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import VideoCard from "../../components/VideoCard";
import TaskAnalyticsChart from "../../components/TaskAnalyticsChart";
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

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    // Queries
    const { data: playlistsRes, isLoading: playlistsLoading } = useQuery({
        queryKey: ["playlists"],
        queryFn: () => getMyPlaylists().then((res) => res.data),
    });

    const { data: soloVideosRes, isLoading: videosLoading } = useQuery({
        queryKey: ["soloVideos"],
        queryFn: () => getVideosApi({ type: "solo" }).then((res) => res.data),
    });

    const { data: monthSummaryRes, isLoading: summaryLoading } = useQuery({
        queryKey: ["monthSummary", currentYear, currentMonth],
        queryFn: () => getMonthSummary(currentYear, currentMonth).then((res) => res.data),
    });

    const playlists = playlistsRes || [];
    const soloVideos = soloVideosRes || [];
    const summaryData = monthSummaryRes || [];

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

    const deletePlaylistMutation = useMutation({
        mutationFn: (id) => deletePlaylistApi(id),
        onSuccess: () => {
            toast.success("Playlist deleted");
            queryClient.invalidateQueries(["playlists"]);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to delete playlist");
        },
    });

    const deleteVideoMutation = useMutation({
        mutationFn: (id) => deleteVideoApi(id),
        onSuccess: () => {
            toast.success("Video deleted");
            queryClient.invalidateQueries(["soloVideos"]);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to delete video");
        },
    });

    return (
        <div className="min-h-screen bg-black text-white selection:bg-gray-800 selection:text-white">
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
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          border-color: #4b5563;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05);
        }
        .skeleton {
          background: linear-gradient(90deg, #111827 25%, #1f2937 50%, #111827 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

            <Navbar />

            <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Dashboard
                        </h1>
                        <p className="text-gray-400 mt-1 text-sm sm:text-base">
                            Manage playlists, solo videos, and daily study targets
                        </p>
                    </div>

                    <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setVideoModalOpen(true)}
                            className="group flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 hover:border-gray-700 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                        >
                            <svg className="w-4 h-4 text-emerald-400 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Save Solo Video
                        </button>
                        <button
                            onClick={() => setPlaylistModalOpen(true)}
                            className="group flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black hover:bg-gray-200 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                        >
                            <svg className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Playlist
                        </button>
                    </div>
                </div>

                {/* Main 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Playlists & Solo Videos */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-10">
                        {/* Playlists Section */}
                        <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white">Playlists</h2>
                                <span className="px-2.5 py-0.5 bg-gray-900 text-gray-400 border border-gray-800 text-xs font-semibold rounded-full">
                                    {playlists.length}
                                </span>
                            </div>

                            {playlistsLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="skeleton h-32 rounded-2xl" />
                                    ))}
                                </div>
                            ) : playlists.length === 0 ? (
                                <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 text-center animate-fade-in">
                                    <div className="w-14 h-14 mx-auto mb-3 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-gray-500">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <p className="text-white font-medium mb-1">No playlists created</p>
                                    <p className="text-gray-400 text-xs">Create your first playlist to group lectures together</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {playlists.map((pl, idx) => (
                                        <div
                                            key={pl._id}
                                            className={`relative card-hover group bg-gray-950 border border-gray-800/80 rounded-2xl p-5 animate-fade-in-up stagger-${Math.min(idx + 1, 4)}`}
                                        >
                                            {/* Delete button */}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    deletePlaylistMutation.mutate(pl._id);
                                                }}
                                                className="absolute top-3 right-3 p-2 rounded-lg bg-gray-900 hover:bg-red-950/60 text-gray-400 hover:text-red-400 border border-gray-800 transition cursor-pointer"
                                                title="Delete playlist"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>

                                            <Link to={`/playlist/${pl._id}`} className="block cursor-pointer">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-white group-hover:border-gray-700 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <h3 className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">
                                                    {pl.title}
                                                </h3>
                                                <p className="text-xs text-gray-400 line-clamp-2">
                                                    {pl.description || "No description"}
                                                </p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Solo Videos Section */}
                        <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-white">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-white">Solo Videos</h2>
                                <span className="px-2.5 py-0.5 bg-gray-900 text-gray-400 border border-gray-800 text-xs font-semibold rounded-full">
                                    {soloVideos.length}
                                </span>
                            </div>

                            {videosLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="skeleton h-48 rounded-2xl" />
                                    ))}
                                </div>
                            ) : soloVideos.length === 0 ? (
                                <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 text-center animate-fade-in">
                                    <div className="w-14 h-14 mx-auto mb-3 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center text-gray-500">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-white font-medium mb-1">No solo videos saved</p>
                                    <p className="text-gray-400 text-xs">Save YouTube video links for quick study sessions</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {soloVideos.map((video, idx) => (
                                        <div
                                            key={video._id}
                                            className={`relative card-hover animate-fade-in-up stagger-${Math.min(idx + 1, 4)}`}
                                        >
                                            {/* Delete button */}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    deleteVideoMutation.mutate(video._id);
                                                }}
                                                className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-gray-900/90 hover:bg-red-950/80 text-gray-400 hover:text-red-400 border border-gray-800 transition cursor-pointer"
                                                title="Delete video"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>

                                            <VideoCard video={video} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Task Analytics Graph Panel */}
                    <div className="lg:col-span-5 xl:col-span-4 sticky top-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <TaskAnalyticsChart summaryData={summaryData} loading={summaryLoading} />
                    </div>
                </div>
            </div>

            {/* Create Playlist Modal */}
            <Modal
                open={playlistModalOpen}
                onClose={() => setPlaylistModalOpen(false)}
                title="Create Playlist"
            >
                <form className="space-y-4" onSubmit={handleCreatePlaylist}>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                            Title
                        </label>
                        <input
                            className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-all text-sm"
                            placeholder="Enter playlist title..."
                            value={playlistForm.title}
                            onChange={(e) =>
                                setPlaylistForm({ ...playlistForm, title: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                            Description
                        </label>
                        <textarea
                            className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-all text-sm resize-none"
                            placeholder="Add a description (optional)..."
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
                    <button className="w-full bg-white hover:bg-gray-200 text-black font-bold p-3 rounded-xl text-sm transition-all cursor-pointer">
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
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                            YouTube URL
                        </label>
                        <input
                            className="w-full bg-black border border-gray-800 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-all text-sm"
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
                    <button className="w-full bg-white hover:bg-gray-200 text-black font-bold p-3 rounded-xl text-sm transition-all cursor-pointer">
                        Save Video
                    </button>
                </form>
            </Modal>
        </div>
    );
}