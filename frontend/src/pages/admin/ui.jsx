const tones = {
    gray: "border-gray-700 text-gray-300",
    green: "border-green-500/30 bg-green-500/10 text-green-300",
    red: "border-red-500/30 bg-red-500/10 text-red-300",
    blue: "border-blue-500/30 bg-blue-500/10 text-blue-300",
};

export const Badge = ({ tone = "gray", children }) => (
    <span className={`rounded-full border px-2 py-0.5 text-xs ${tones[tone]}`}>{children}</span>
);

export const btnNeutral = "rounded-lg border border-gray-700 px-2.5 py-1 text-xs text-gray-300 transition hover:bg-gray-800";
export const btnDanger = "rounded-lg border border-red-500/30 px-2.5 py-1 text-xs text-red-300 transition hover:bg-red-500/10";

export const timeAgo = (date) => {
    if (!date) return "Never";
    const s = Math.floor((Date.now() - new Date(date)) / 1000);
    if (s < 60) return "Just now";
    for (const [label, size] of [["d", 86400], ["h", 3600], ["m", 60]])
        if (s >= size) return `${Math.floor(s / size)}${label} ago`;
};