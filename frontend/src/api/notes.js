import api from "./axios";

export const getNotes = () => api.get("/notes");
export const createNote = (note) => api.post("/notes", note);
export const updateNote = (id, changes) => api.patch(`/notes/${id}`, changes);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
