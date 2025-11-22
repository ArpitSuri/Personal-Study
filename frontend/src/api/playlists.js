import api from "./axios";

export const getMyPlaylists = () => api.get("/playlists");
export const createPlaylistApi = (data) => api.post("/playlists", data);
export const getPlaylistWithVideosApi = (id) => api.get(`/playlists/${id}`);
export const updatePlaylistApi = (id, data) =>
    api.put(`/playlists/${id}`, data);
export const deletePlaylistApi = (id) => api.delete(`/playlists/${id}`);
