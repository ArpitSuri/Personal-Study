import { useState, useEffect } from "react";

const motivationalQuotes = [
    "The expert in anything was once a beginner.",
    "Education is the passport to the future.",
    "Learning is a treasure that will follow its owner everywhere.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Study while others are sleeping; work while others are loafing.",
    "The capacity to learn is a gift; the ability to learn is a skill.",
    "Education is not preparation for life; education is life itself.",
    "An investment in knowledge pays the best interest.",
    "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "The more that you read, the more things you will know.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Focus on being productive instead of busy.",
    "Don't watch the clock; do what it does. Keep going.",
    "Dream big, start small, but most of all, start.",
    "Knowledge is power. Information is liberating.",
];

export default function LoadingState() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        setQuote(randomQuote);
    }, []);

    return (
        <>
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes honeycombPulse {
          0%, 100% { 
            fill: rgba(255, 255, 255, 0.05);
            stroke: rgba(255, 255, 255, 0.1);
          }
          50% { 
            fill: rgba(255, 255, 255, 0.15);
            stroke: rgba(255, 255, 255, 0.3);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .logo-gradient {
          background: linear-gradient(135deg, #ffffff, #a0a0a0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #ffffff, #888888, #ffffff);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .honeycomb-cell {
          animation: honeycombPulse 3s ease-in-out infinite;
        }
        .honeycomb-cell:nth-child(1) { animation-delay: 0s; }
        .honeycomb-cell:nth-child(2) { animation-delay: 0.2s; }
        .honeycomb-cell:nth-child(3) { animation-delay: 0.4s; }
        .honeycomb-cell:nth-child(4) { animation-delay: 0.6s; }
        .honeycomb-cell:nth-child(5) { animation-delay: 0.8s; }
        .honeycomb-cell:nth-child(6) { animation-delay: 1s; }
        .honeycomb-cell:nth-child(7) { animation-delay: 0.3s; }
        .honeycomb-cell:nth-child(8) { animation-delay: 0.5s; }
        .honeycomb-cell:nth-child(9) { animation-delay: 0.7s; }
        .honeycomb-cell:nth-child(10) { animation-delay: 0.9s; }
        .honeycomb-cell:nth-child(11) { animation-delay: 0.1s; }
        .honeycomb-cell:nth-child(12) { animation-delay: 1.1s; }
        .honeycomb-cell:nth-child(13) { animation-delay: 0.4s; }
        .honeycomb-cell:nth-child(14) { animation-delay: 0.6s; }
        .honeycomb-cell:nth-child(15) { animation-delay: 0.8s; }
        .honeycomb-cell:nth-child(16) { animation-delay: 1.2s; }
        .honeycomb-cell:nth-child(17) { animation-delay: 0.2s; }
        .honeycomb-cell:nth-child(18) { animation-delay: 1.4s; }
        .honeycomb-cell:nth-child(19) { animation-delay: 0.5s; }
        
        .stagger-1 { animation-delay: 0.2s; }
        .stagger-2 { animation-delay: 0.4s; }
        .stagger-3 { animation-delay: 0.6s; }
        .stagger-4 { animation-delay: 0.8s; }
      `}</style>

            <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
                {/* Honeycomb Pattern Background */}
                <div className="absolute inset-0 opacity-40">
                    <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="honeycomb" x="0" y="0" width="120" height="104" patternUnits="userSpaceOnUse">
                                {/* Honeycomb cells */}
                                <polygon className="honeycomb-cell" points="30,0 60,17.32 60,51.96 30,69.28 0,51.96 0,17.32" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <polygon className="honeycomb-cell" points="90,0 120,17.32 120,51.96 90,69.28 60,51.96 60,17.32" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <polygon className="honeycomb-cell" points="60,51.96 90,69.28 90,103.92 60,121.24 30,103.92 30,69.28" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#honeycomb)" />
                    </svg>
                </div>

                {/* Content */}
                <div className="max-w-2xl w-full text-center relative z-10">
                    {/* Honeycomb Icon */}
                    <div className="relative inline-block mb-8 animate-fade-in">
                        <div className="animate-float">
                            {/* Large central honeycomb structure */}
                            <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Center hexagon with book icon */}
                                <g transform="translate(100, 100)">
                                    <polygon className="honeycomb-cell" points="0,-35 30.31,-17.5 30.31,17.5 0,35 -30.31,17.5 -30.31,-17.5"
                                        fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2" filter="url(#glow)" />

                                    {/* Book icon in center */}
                                    <g transform="translate(-12, -12)">
                                        <path d="M12 2.253v13m0-13C10.832 1.477 9.246 1 7.5 1S4.168 1.477 3 2.253v13C4.168 14.477 5.754 14 7.5 14s3.332.477 4.5 1.253m0-13C13.168 1.477 14.754 1 16.5 1c1.747 0 3.332.477 4.5 1.253v13C19.832 14.477 18.247 14 16.5 14c-1.746 0-3.332.477-4.5 1.253"
                                            fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="scale(1.2)" />
                                    </g>
                                </g>

                                {/* Surrounding hexagons */}
                                <g transform="translate(100, 100)">
                                    <polygon className="honeycomb-cell" points="0,-70 30.31,-52.5 30.31,-17.5 0,0 -30.31,-17.5 -30.31,-52.5"
                                        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                                    <polygon className="honeycomb-cell" points="52.5,-35 82.81,-17.5 82.81,17.5 52.5,35 22.19,17.5 22.19,-17.5"
                                        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                                    <polygon className="honeycomb-cell" points="52.5,35 82.81,52.5 82.81,87.5 52.5,105 22.19,87.5 22.19,52.5"
                                        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                                    <polygon className="honeycomb-cell" points="0,70 30.31,87.5 30.31,122.5 0,140 -30.31,122.5 -30.31,87.5"
                                        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                                    <polygon className="honeycomb-cell" points="-52.5,35 -22.19,52.5 -22.19,87.5 -52.5,105 -82.81,87.5 -82.81,52.5"
                                        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                                    <polygon className="honeycomb-cell" points="-52.5,-35 -22.19,-17.5 -22.19,17.5 -52.5,35 -82.81,17.5 -82.81,-17.5"
                                        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* Brand Name */}
                    <div className="mb-6 animate-fade-in stagger-1">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                            Study Room
                        </h1>
                        <div className="flex justify-center">
                            <div className="w-32 h-0.5 bg-linear-to-r from-transparent via-white to-transparent"></div>
                        </div>
                    </div>

                    {/* Loading text */}
                    <div className="mb-8 animate-fade-in stagger-2">
                        <p className="text-lg font-medium shimmer-text">
                            Preparing your learning experience...
                        </p>
                    </div>

                    {/* Quote Box */}
                    <div className="animate-fade-in stagger-3">
                        <div className="relative group">
                            {/* Quote card */}
                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">

                                {/* Quote text */}
                                <blockquote className="text-gray-200 text-base sm:text-lg font-medium leading-relaxed mb-4">
                                    "{quote}"
                                </blockquote>

                                {/* Decorative line */}
                                <div className="flex justify-center">
                                    <div className="w-24 h-1 bg-linear-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Loading dots */}
                    <div className="mt-8 flex items-center justify-center gap-2 animate-fade-in stagger-4">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}