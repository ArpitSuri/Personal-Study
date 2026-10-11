import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlaylistWithVideosApi } from "../../api/playlists";
import { addVideoApi, deleteVideoApi } from "../../api/videos";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import VideoCard from "../../components/VideoCard";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function PlaylistDetails() {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [videoForm, setVideoForm] = useState({ url: "" });
    const [deletingId, setDeletingId] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: ["playlist", id],
        queryFn: () => getPlaylistWithVideosApi(id).then((res) => res.data),
    });

    const handleAddVideo = async (e) => {
        e.preventDefault();
        try {
            await addVideoApi({ url: videoForm.url, playlistId: id });
            toast.success("Video added to playlist");
            setVideoModalOpen(false);
            setVideoForm({ url: "" });
            queryClient.invalidateQueries(["playlist", id]);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add video");
        }
    };

    const handleDeleteVideo = async (videoId) => {
        setDeletingId(videoId);
        try {
            await deleteVideoApi(videoId);
            toast.success("Video removed");
            queryClient.invalidateQueries(["playlist", id]);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete video");
        } finally {
            setDeletingId(null);
        }
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
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .skeleton {
            background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          .animate-pulse-slow {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
                <Navbar />
                <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div className="space-y-2">
                            <div className="skeleton h-8 w-48 rounded-lg" />
                            <div className="skeleton h-4 w-72 rounded-lg" />
                        </div>
                        <div className="skeleton h-10 w-32 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="skeleton h-48 rounded-2xl" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const { playlist, videos } = data;

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
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.5); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
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
        .delete-btn {
          transition: all 0.2s ease;
        }
        .delete-btn:hover {
          transform: scale(1.1);
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.1s; }
        .stagger-3 { animation-delay: 0.15s; }
        .stagger-4 { animation-delay: 0.2s; }
        .stagger-5 { animation-delay: 0.25s; }
        .stagger-6 { animation-delay: 0.3s; }
        .stagger-7 { animation-delay: 0.35s; }
        .stagger-8 { animation-delay: 0.4s; }
      `}</style>

            <Navbar />

            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/youtube"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group animate-fade-in"
                >
                    <svg
                        className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium">Back to YouTube Videos</span>
                </Link>

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/20">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                                {playlist.title}
                            </h1>
                            <p className="text-gray-400 mt-1 text-sm sm:text-base max-w-xl">
                                {playlist.description || "No description"}
                            </p>
                            <div className="flex items-center gap-3 mt-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {videos.length} {videos.length === 1 ? 'video' : 'videos'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setVideoModalOpen(true)}
                        className="btn-glow group flex items-center justify-center gap-2 px-5 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg shadow-emerald-500/20"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Video
                    </button>
                </div>

                {/* Videos Grid */}
                {videos.length === 0 ? (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12 text-center animate-scale-in">
                        <div className="w-20 h-20 mx-auto mb-5 bg-linear-to-br from-gray-700/50 to-gray-800/50 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-300 text-lg font-medium mb-2">No videos yet</p>
                        <p className="text-gray-500 text-sm mb-6">Add your first video to this playlist</p>
                        <button
                            onClick={() => setVideoModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add First Video
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {videos.map((video, idx) => (
                            <div
                                key={video._id}
                                className={`relative group card-hover opacity-0 animate-fade-in-up stagger-${Math.min(idx + 1, 8)}`}
                            >
                                <VideoCard video={video} />

                                {/* Delete Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleDeleteVideo(video._id);
                                    }}
                                    disabled={deletingId === video._id}
                                    className="delete-btn absolute top-3 right-3 p-2 bg-red-500/90 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Remove from playlist"
                                >
                                    {deletingId === video._id ? (
                                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Video Modal */}
            <Modal
                open={videoModalOpen}
                onClose={() => setVideoModalOpen(false)}
                title="Add Video to Playlist"
            >
                <form className="space-y-4" onSubmit={handleAddVideo}>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            YouTube URL
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <input
                                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl p-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
                        <p className="mt-2 text-xs text-gray-500">
                            Paste a YouTube video URL to add it to this playlist
                        </p>
                    </div>
                    <button className="w-full bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white p-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add to Playlist
                    </button>
                </form>
            </Modal>
        </div>
    );
}