import { useMemo } from "react";

const W = 600;
const H = 240;
const PAD = { l: 44, r: 16, t: 16, b: 28 };
const pad2 = (n) => String(n).padStart(2, "0");

const formatShort = (sec) => {
    if (sec < 60) return `${sec}s`;
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export default function FocusChart({ summaryData = [], loading, year, month }) {
    // month is 1-based
    const { points, yMax, monthTotal, bestDay } = useMemo(() => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const byDate = {};
        summaryData.forEach((i) => (byDate[i.date] = i.totalSeconds));

        const pts = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const seconds = byDate[`${year}-${pad2(month)}-${pad2(day)}`] || 0;
            return { day, seconds, minutes: seconds / 60 };
        });

        const maxMin = Math.max(...pts.map((p) => p.minutes), 30);
        return {
            points: pts,
            yMax: Math.ceil(maxMin / 30) * 30,
            monthTotal: pts.reduce((s, p) => s + p.seconds, 0),
            bestDay: pts.reduce((b, p) => (p.seconds > b.seconds ? p : b), pts[0]),
        };
    }, [summaryData, year, month]);

    const innerW = W - PAD.l - PAD.r;
    const innerH = H - PAD.t - PAD.b;
    const x = (day) => PAD.l + ((day - 1) / Math.max(points.length - 1, 1)) * innerW;
    const y = (min) => PAD.t + innerH - (min / yMax) * innerH;

    const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.day)},${y(p.minutes)}`).join(" ");
    const areaPath = `${linePath} L${x(points.length)},${y(0)} L${x(1)},${y(0)} Z`;
    const ticks = [0, 1, 2, 3, 4].map((i) => (yMax / 4) * i);
    const monthLabel = new Date(year, month - 1, 1).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-xl font-bold">Focus Time</h2>
                    <p className="text-gray-400 text-xs mt-1">{monthLabel}, minutes per day</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-emerald-400">{formatShort(monthTotal)}</p>
                    <p className="text-[11px] text-gray-500">total this month</p>
                </div>
            </div>

            {loading ? (
                <div className="skeleton h-48 rounded-xl" />
            ) : (
                <>
                    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Daily focus time line chart">
                        {/* Grid + y labels */}
                        {ticks.map((t) => (
                            <g key={t}>
                                <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="#1f2937" strokeWidth="1" />
                                <text x={PAD.l - 8} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#6b7280">
                                    {Math.round(t)}m
                                </text>
                            </g>
                        ))}

                        {/* X labels */}
                        {points
                            .filter((p) => p.day === 1 || p.day % 5 === 0)
                            .map((p) => (
                                <text key={p.day} x={x(p.day)} y={H - 8} textAnchor="middle" fontSize="10" fill="#6b7280">
                                    {p.day}
                                </text>
                            ))}

                        <defs>
                            <linearGradient id="focusFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d={areaPath} fill="url(#focusFill)" />
                        <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

                        {/* Points (with hover tooltips) */}
                        {points.map((p) => (
                            <g key={p.day}>
                                {p.seconds > 0 && <circle cx={x(p.day)} cy={y(p.minutes)} r="3.5" fill="#10b981" />}
                                <circle cx={x(p.day)} cy={y(p.minutes)} r="10" fill="transparent">
                                    <title>{`${monthLabel.split(" ")[0]} ${p.day}: ${formatShort(p.seconds)}`}</title>
                                </circle>
                            </g>
                        ))}
                    </svg>

                    {monthTotal > 0 && (
                        <p className="text-xs text-gray-500 mt-2">
                            Best day: {monthLabel.split(" ")[0]} {bestDay.day} ({formatShort(bestDay.seconds)})
                        </p>
                    )}
                </>
            )}
        </div>
    );
}