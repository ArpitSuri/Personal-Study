export const parseDuration = (iso) => {
    // Example: PT1H2M30S
    let hours = 0, minutes = 0, seconds = 0;

    const match = iso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    if (!match) return "";

    if (match[1]) hours = parseInt(match[1]);
    if (match[2]) minutes = parseInt(match[2]);
    if (match[3]) seconds = parseInt(match[3]);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");

    return `${mm}:${ss}`;
};
