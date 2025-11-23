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
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.85); opacity: 0.8; }
          50% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(0.85); opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-spin {
          animation: spin 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .logo-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6, #60a5fa);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .wave-bar {
          animation: wave 1.2s ease-in-out infinite;
        }
        .wave-bar:nth-child(1) { animation-delay: 0s; }
        .wave-bar:nth-child(2) { animation-delay: 0.1s; }
        .wave-bar:nth-child(3) { animation-delay: 0.2s; }
        .wave-bar:nth-child(4) { animation-delay: 0.3s; }
        .wave-bar:nth-child(5) { animation-delay: 0.4s; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

            <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
                <div className="max-w-2xl w-full text-center">
                    {/* Floating Book Icon */}
                    <div className="relative inline-block mb-8 animate-fade-in">

                        {/* Main icon container */}
                        <div className="relative animate-float">
                            <div className="relative w-64 h-64 mx-auto">
                                {/* Spinning outer ring */}
                                <div className="absolute inset-0 rounded-full border-4 border-gray-700/50"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 animate-spin"></div>

                                {/* Glowing inner circle */}
                                <div className="absolute inset-3 rounded-full bg-linear-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-sm animate-glow"></div>

                                {/* Book icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}