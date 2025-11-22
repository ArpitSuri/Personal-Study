// export default function Modal({ open, onClose, title, children }) {
//     if (!open) return null;
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-4">
//                 <div className="flex justify-between items-center mb-3">
//                     <h2 className="font-semibold text-lg">{title}</h2>
//                     <button onClick={onClose} className="text-sm">
//                         ✕
//                     </button>
//                 </div>
//                 {children}
//             </div>
//         </div>
//     );
// }

import { useEffect, useRef } from "react";

export default function Modal({ open, onClose, title, children }) {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && open) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [open, onClose]);

    // Handle click outside
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    if (!open) return null;

    return (
        <>
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .modal-overlay {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .modal-content {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .close-btn {
          transition: all 0.2s ease;
        }
        .close-btn:hover {
          transform: rotate(90deg);
          background-color: rgba(239, 68, 68, 0.2);
          color: #f87171;
        }
        .modal-glow {
          position: relative;
        }
        .modal-glow::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          border-radius: 1.1rem;
          z-index: -1;
          opacity: 0.4;
          filter: blur(12px);
        }
        .title-gradient {
          background: linear-gradient(135deg, #fff, #cbd5e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

            {/* Overlay */}
            <div
                ref={overlayRef}
                onClick={handleOverlayClick}
                className="modal-overlay fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
            >
                {/* Modal Container */}
                <div
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    className="modal-content modal-glow w-full max-w-md"
                >
                    <div className="bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h2 id="modal-title" className="font-semibold text-lg title-gradient">
                                    {title}
                                </h2>
                            </div>

                            <button
                                onClick={onClose}
                                className="close-btn p-2 rounded-lg text-gray-400 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                                aria-label="Close modal"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-5">
                            {children}
                        </div>

                        {/* Footer accent */}
                        <div className="h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
                    </div>
                </div>
            </div>
        </>
    );
}