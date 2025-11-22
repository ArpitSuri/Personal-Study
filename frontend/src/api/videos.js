import api from "./axios";

export const addVideoApi = (data) => api.post("/videos", data);

export const getVideosApi = (params) =>
    api.get("/videos", {
        params,
    });

export const getVideoByIdApi = (id) => api.get(`/videos/${id}`);

export const deleteVideoApi = (id) => api.delete(`/videos/${id}`);
