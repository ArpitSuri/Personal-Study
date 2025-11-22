import { Playlist } from "../model/playListModel.js";
import { Video } from "../model/videoModel.js";

export const createPlaylist = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });

        const playlist = await Playlist.create({
            userId: req.user._id,
            title,
            description: description || ""
        });

        return res.status(201).json(playlist);
    } catch (err) {
        console.error("Create playlist error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getMyPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ userId: req.user._id }).sort({
            createdAt: -1
        });
        return res.json(playlists);
    } catch (err) {
        console.error("Get playlists error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getPlaylistWithVideos = async (req, res) => {
    try {
        const playlist = await Playlist.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!playlist)
            return res.status(404).json({ message: "Playlist not found" });

        const videos = await Video.find({
            userId: req.user._id,
            playlistId: playlist._id
        }).sort({ createdAt: -1 });

        return res.json({ playlist, videos });
    } catch (err) {
        console.error("Get playlist error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const updatePlaylist = async (req, res) => {
    try {
        const { title, description } = req.body;

        const playlist = await Playlist.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { $set: { title, description } },
            { new: true }
        );

        if (!playlist)
            return res.status(404).json({ message: "Playlist not found" });

        return res.json(playlist);
    } catch (err) {
        console.error("Update playlist error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!playlist)
            return res.status(404).json({ message: "Playlist not found" });

        // Optional: delete videos belonging to this playlist only
        await Video.deleteMany({
            userId: req.user._id,
            playlistId: playlist._id
        });

        return res.json({ message: "Playlist deleted" });
    } catch (err) {
        console.error("Delete playlist error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
