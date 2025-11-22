// // import { useParams } from "react-router-dom";
// // import { useQuery } from "@tanstack/react-query";
// // import { getVideoByIdApi } from "../../api/videos";
// // import Navbar from "../../components/Navbar";
// // import ReactPlayer from "react-player";


// // export default function VideoPlayer() {
// //     const { id } = useParams();

// //     const { data, isLoading } = useQuery({
// //         queryKey: ["video", id],
// //         queryFn: () => getVideoByIdApi(id).then((res) => res.data),
// //     });

// //     if (isLoading || !data) {
// //         return (
// //             <>
// //                 <Navbar />
// //                 <div className="p-6">Loading...</div>
// //             </>
// //         );
// //     }

// //     const video = data;
// //     const url = `https://www.youtube.com/watch?v=${video.youtubeId}`;
// //     console.log("Video URL:", url);

// //     return (
// //         <>
// //             <Navbar />
// //             <div className="p-6 max-w-4xl mx-auto">
// //                 <h1 className="text-xl font-bold mb-4">{video.title}</h1>
// //                 <div style={{ width: "100%", height: "420px", background: "#000" }}>
// //                     <ReactPlayer
// //                         url={url}
// //                         width="100%"
// //                         height="100%"
// //                         controls
// //                     />
// //                 </div>
// //                 {video.duration && (
// //                     <div className="text-sm text-gray-500 mb-2">
// //                         Duration: {video.duration}
// //                     </div>
// //                 )}
// //                 <div className="text-xs text-gray-400">
// //                     Saved on {new Date(video.createdAt).toLocaleString()}
// //                 </div>
// //             </div>
// //         </>
// //     );
// // }


// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getVideoByIdApi } from "../../api/videos";
// import Navbar from "../../components/Navbar";
// import YouTube from "react-youtube";

// export default function VideoPlayer() {
//     const { id } = useParams();

//     const { data, isLoading } = useQuery({
//         queryKey: ["video", id],
//         queryFn: () => getVideoByIdApi(id).then((res) => res.data),
//     });

//     if (isLoading || !data) {
//         return (
//             <>
//                 <Navbar />
//                 <div className="p-6">Loading...</div>
//             </>
//         );
//     }

//     const video = data;
//     console.log("Video ID:", video.youtubeId);

//     const opts = {
//         width: "100%",
//         height: "420",
//         playerVars: {
//             autoplay: 0,
//             controls: 1,
//             rel: 0,
//             modestbranding: 1,
//         },
//     };

//     return (
//         <>
//             <Navbar />
//             <div className="p-6 max-w-4xl mx-auto">
//                 <h1 className="text-xl font-bold mb-4">{video.title}</h1>

//                 <div className="mb-4">
//                     <YouTube videoId={video.youtubeId} opts={opts} />
//                 </div>

//                 {video.duration && (
//                     <div className="text-sm text-gray-500 mb-2">
//                         Duration: {video.duration}
//                     </div>
//                 )}

//                 <div className="text-xs text-gray-400">
//                     Saved on {new Date(video.createdAt).toLocaleString()}
//                 </div>
//             </div>
//         </>
//     );
// }


import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVideoByIdApi } from "../../api/videos";
import Navbar from "../../components/Navbar";
import YouTube from "react-youtube";

export default function VideoPlayer() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["video", id],
        queryFn: () => getVideoByIdApi(id).then((res) => res.data),
    });

    if (isLoading || !data) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
                <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
          .skeleton {
            background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          .pulse-icon {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
                <Navbar />
                <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl mx-auto">
                    <div className="skeleton h-5 w-32 rounded-lg mb-6" />
                    <div className="skeleton h-8 w-3/4 rounded-lg mb-6" />
                    <div className="relative skeleton aspect-video w-full rounded-2xl mb-6">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="pulse-icon p-4 bg-gray-700/50 rounded-full">
                                <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="skeleton h-4 w-24 rounded-lg" />
                        <div className="skeleton h-4 w-32 rounded-lg" />
                    </div>
                </div>
            </div>
        );
    }

    const video = data;

    const opts = {
        width: "100%",
        height: "100%",
        playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
        },
    };

    const formatDuration = (duration) => {
        if (!duration) return null;
        return duration;
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
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.4s ease-out forwards;
        }
        .video-container {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 1rem;
        }
        .glow-border {
          position: relative;
        }
        .glow-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          border-radius: 1.1rem;
          z-index: -1;
          opacity: 0.5;
          filter: blur(8px);
          background-size: 300% 300%;
          animation: gradient-shift 8s ease infinite;
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .info-card {
          transition: all 0.3s ease;
        }
        .info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>

            <Navbar />

            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
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
                    <span className="text-sm font-medium">Back</span>
                </button>

                {/* Video Title */}
                <div className="animate-fade-in-up mb-6">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
                        {video.title}
                    </h1>
                </div>

                {/* Video Player */}
                <div className="animate-scale-in mb-8" style={{ animationDelay: '0.1s' }}>
                    <div className="glow-border">
                        <div className="video-container bg-gray-800">
                            <YouTube videoId={video.youtubeId} opts={opts} />
                        </div>
                    </div>
                </div>

                {/* Video Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {/* Duration Card */}
                    {video.duration && (
                        <div className="info-card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                                    <p className="text-white font-medium">{formatDuration(video.duration)}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Saved Date Card */}
                    <div className="info-card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Saved on</p>
                                <p className="text-white font-medium">
                                    {new Date(video.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* YouTube Link Card */}
                    <a
                        href={`https://youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="info-card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors">
                                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Watch on</p>
                                <p className="text-white font-medium group-hover:text-red-400 transition-colors">YouTube</p>
                            </div>
                            <svg className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </a>
                </div>

                {/* Channel Info (if available) */}
                {video.channelTitle && (
                    <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="info-card bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 inline-flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Channel</p>
                                <p className="text-white font-medium">{video.channelTitle}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}