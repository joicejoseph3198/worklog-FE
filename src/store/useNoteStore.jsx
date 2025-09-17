import { create } from "zustand";

export const useNoteStore = create((set, get) => ({
    note: {},
    fetchNote: async (axiosInstance, date) => {
        try {
            const res = await axiosInstance.get(`/note/fetch?date=${date}`);
            const fetchedNote = res?.data
            const updatedNote = {
                'id': fetchedNote.id,
                'body': fetchedNote.body
            }
            set({ note: updatedNote });
        } catch (err) {
            console.error("Failed to fetch note", err);
            // Clear the note state when there's an error (no note exists for this date)
            set({ note: { id: null, body: "" } });
        }
    },
    upsertNote: async (axiosInstance, body, date) => {
        try {
            const res = await axiosInstance.post("/note/upsert", {
                body,
                date,
            });

            // Update local store after API call succeeds
            const updatedNote = {
                id: res.data.id,
                body: res.data.body,
            };
            set({ note: updatedNote });
        } catch (err) {
            console.error("Failed to upsert note", err);
        }
    }
}))