export const extractYoutubeId = (url) => {
    if (!url) return null;

    // covers: watch?v=, youtu.be/, shorts/
    const patterns = [
        /v=([^&]+)/, // watch?v=
        /youtu\.be\/([^?&]+)/, // youtu.be/
        /shorts\/([^?&]+)/ // shorts/
    ];

    for (const regex of patterns) {
        const match = url.match(regex);
        if (match && match[1]) return match[1];
    }

    return null;
};
