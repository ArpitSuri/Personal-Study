import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VideoCard({ video }) {
    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleClick = () => {
        navigate(`/video/${video._id}`);
    };

    const formatDuration = (duration) => {
        if (!duration) return null;
        const parts = duration.split(":");
        if (parts.length !== 2) return duration;

        const extendedMinutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);

        const hours = Math.floor(extendedMinutes / 60);
        const minutes = extendedMinutes % 60;

        return [
            String(hours).padStart(2, "0"),
            String(minutes).padStart(2, "0"),
            String(seconds).padStart(2, "0"),
        ].join(":");
    };

    return (
        <>
            <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
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
        .skeleton-img {
          background: linear-gradient(90deg, #111827 25%, #1f2937 50%, #111827 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .video-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .video-card:hover {
          transform: translateY(-4px);
          border-color: #374151;
        }
        .video-card:hover .thumbnail-overlay {
          opacity: 1;
        }
        .video-card:hover .play-button {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        .video-card:hover .thumbnail-img {
          transform: scale(1.05);
        }
        .thumbnail-container {
          position: relative;
          overflow: hidden;
        }
        .thumbnail-img {
          transition: transform 0.4s ease;
        }
        .thumbnail-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .duration-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          color: white;
        }
        .image-fade-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>

            <div
                onClick={handleClick}
                className="video-card cursor-pointer bg-gray-950 border border-gray-800/80 rounded-2xl overflow-hidden group shadow-lg"
            >
                {/* Thumbnail Container */}
                <div className="thumbnail-container aspect-video bg-black">
                    {!imageLoaded && !imageError && (
                        <div className="skeleton-img absolute inset-0 w-full h-full" />
                    )}

                    {imageError && (
                        <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
                            <div className="text-center">
                                <svg className="w-10 h-10 text-gray-700 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs text-gray-500">No thumbnail</span>
                            </div>
                        </div>
                    )}

                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                        className={`thumbnail-img w-full h-full object-cover ${imageLoaded ? 'image-fade-in' : 'opacity-0'}`}
                    />

                    <div className="thumbnail-overlay" />

                    <div className="play-button">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl">
                            <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>

                    {video.duration && (
                        <div className="duration-badge">
                            {formatDuration(video.duration)}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-gray-300 transition-colors">
                        {video.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-2">
                        {video.channelTitle && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="truncate max-w-[120px]">{video.channelTitle}</span>
                            </div>
                        )}

                        {video.createdAt && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>
                                    {new Date(video.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}