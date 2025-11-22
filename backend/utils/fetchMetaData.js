import axios from "axios";

export const fetchYoutubeMeta = async (youtubeId) => {
    try {
        const API_KEY = process.env.YOUTUBE_API_KEY;

        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${youtubeId}&key=${API_KEY}`;

        const { data } = await axios.get(url);

        if (!data.items || data.items.length === 0) return null;

        const item = data.items[0];

        return {
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            duration: item.contentDetails.duration // ISO 8601 → later parsed
        };
    } catch (err) {
        console.error("YouTube API Error:", err.message);
        return null;
    }
};
