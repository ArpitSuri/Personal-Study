import api from "./axios";

export const getProfileApi = () => api.get("/profile");
export const updateProfileApi = (data) => api.put("/profile", data);
