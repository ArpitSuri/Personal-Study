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
        .modal-overlay {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .modal-content {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

            {/* Overlay */}
            <div
                ref={overlayRef}
                onClick={handleOverlayClick}
                className="modal-overlay fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50 p-4"
            >
                {/* Modal Container */}
                <div
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    className="modal-content w-full max-w-lg"
                >
                    <div className="bg-gray-950 text-white border border-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-colors">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-black">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-900 border border-gray-800 rounded-xl text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 id="modal-title" className="font-bold text-lg text-white">
                                    {title}
                                </h2>
                            </div>

                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-colors cursor-pointer"
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
                        <div className="h-1 bg-gray-800" />
                    </div>
                </div>
            </div>
        </>
    );
}