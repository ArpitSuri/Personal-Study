import api from "./axios"; // use the same axios instance your calendar.js imports

export const createFocusSessionApi = (data) => api.post("/focus", data);
export const getFocusSessionsByDate = (date) => api.get("/focus", { params: { date } });
export const getFocusMonthSummary = (year, month) => api.get(`/focus/summary/${year}/${month}`);
export const deleteFocusSessionApi = (id) => api.delete(`/focus/${id}`);