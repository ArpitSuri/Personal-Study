import api from "./axios";

export const getTasksByDate = (date) => api.get(`/calendar/${date}`);
export const getMonthSummary = (year, month) => api.get(`/calendar/month/${year}/${month}`);
export const createTaskApi = (data) => api.post("/calendar", data);
export const toggleTaskApi = (taskId) => api.patch(`/calendar/${taskId}/toggle`);
export const deleteTaskApi = (taskId) => api.delete(`/calendar/${taskId}`);
