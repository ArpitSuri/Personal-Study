// import { useEffect } from "react";
// import { TUTORIAL_VIDEO_ID } from "../config/tutorial";

// export default function TutorialModal({ open, onClose }) {
//     useEffect(() => {
//         if (!open) return;
//         const onKey = (e) => e.key === "Escape" && onClose();
//         document.addEventListener("keydown", onKey);
//         const previous = document.body.style.overflow;
//         document.body.style.overflow = "hidden";
//         return () => {
//             document.removeEventListener("keydown", onKey);
//             document.body.style.overflow = previous;
//         };
//     }, [open, onClose]);

//     if (!open || !TUTORIAL_VIDEO_ID) return null;

//     return (
//         <div
//             className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
//             onClick={onClose}
//             role="dialog"
//             aria-modal="true"
//             aria-label="How to use Study Room"
//         >
//             <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
//                 <div className="mb-3 flex items-center justify-between">
//                     <h2 className="text-lg font-semibold text-white">How to use Study Room</h2>
//                     <button
//                         onClick={onClose}
//                         aria-label="Close"
//                         className="rounded-lg border border-gray-700 px-3 py-1 text-sm text-gray-300 hover:bg-gray-900"
//                     >
//                         Close
//                     </button>
//                 </div>
//                 <div className="aspect-video overflow-hidden rounded-xl border border-gray-800 bg-black">
//                     <iframe
//                         className="h-full w-full"
//                         src={`https://www.youtube-nocookie.com/embed/${TUTORIAL_VIDEO_ID}?rel=0&modestbranding=1`}
//                         title="Study Room tutorial"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         referrerPolicy="strict-origin-when-cross-origin"
//                         allowFullScreen
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useEffect } from "react";
import { TUTORIAL_VIDEO_ID } from "../config/tutorial";

export default function TutorialModal({ open, onClose }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previous;
        };
    }, [open, onClose]);

    if (!open || !TUTORIAL_VIDEO_ID) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas/90 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="How to use Study Room"
        >
            <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-serif text-xl">How to use Study Room</h2>
                    <button onClick={onClose} className="rounded-md border border-ink/20 px-3 py-1 text-sm hover:bg-ink/5">
                        Close
                    </button>
                </div>
                <div className="aspect-video overflow-hidden rounded-md border border-ink/10 bg-black">
                    <iframe
                        className="h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${TUTORIAL_VIDEO_ID}?rel=0&modestbranding=1`}
                        title="Study Room tutorial"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}