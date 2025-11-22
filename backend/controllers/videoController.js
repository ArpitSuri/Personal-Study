import { Video } from "../model/videoModel.js";
import { Playlist } from "../model/playListModel.js";
import { extractYoutubeId } from "../utils/ExtractYoutubeId.js";
import { fetchYoutubeMeta } from "../utils/fetchMetaData.js";
import { parseDuration } from "../utils/parseDuration.js";

export const addVideo = async (req, res) => {
    try {
        const { url, youtubeId: rawId, playlistId } = req.body;

        // 1. Get YouTube ID
        const youtubeId = rawId || extractYoutubeId(url);
        if (!youtubeId)
            return res.status(400).json({ message: "Invalid YouTube URL or ID" });

        // 2. Check playlist if provided
        if (playlistId) {
            const playlist = await Playlist.findOne({
                _id: playlistId,
                userId: req.user._id
            });
            if (!playlist)
                return res.status(404).json({ message: "Playlist not found" });
        }

        // 3. Fetch metadata from YouTube API
        const meta = await fetchYoutubeMeta(youtubeId);

        if (!meta) {
            return res.status(400).json({
                message: "Cannot fetch video metadata. Check YouTube ID or API key."
            });
        }

        const duration = parseDuration(meta.duration);

        // 4. Save video
        const video = await Video.create({
            userId: req.user._id,
            playlistId: playlistId || null,
            youtubeId,
            title: meta.title,
            thumbnail: meta.thumbnail,
            duration
        });

        return res.status(201).json(video);

    } catch (err) {
        console.error("Add video error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


// Get videos: solo or by playlist
export const getVideos = async (req, res) => {
    try {
        const { playlistId, type } = req.query;
        const query = { userId: req.user._id };

        if (type === "solo") {
            query.playlistId = null;
        } else if (playlistId) {
            query.playlistId = playlistId;
        }

        const videos = await Video.find(query).sort({ createdAt: -1 });
        return res.json(videos);
    } catch (err) {
        console.error("Get videos error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!video) return res.status(404).json({ message: "Video not found" });
        return res.json(video);
    } catch (err) {
        console.error("Get video error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!video) return res.status(404).json({ message: "Video not found" });

        return res.json({ message: "Video deleted" });
    } catch (err) {
        console.error("Delete video error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
