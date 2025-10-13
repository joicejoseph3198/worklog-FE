import { create } from "zustand";

export const useOverviewStore = create((set, get) => ({
    taskDates: [],
    scheduleDates: [],
    noteDates: [],
    loading: false,
    error: null,

    fetchOverview: async (axiosInstance, month, year) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get(`/task/overview?month=${month}&year=${year}`);
            const data = response.data?.data || {};
            set({ 
                taskDates: data.task || [],
                scheduleDates: data.schedule || [],
                noteDates: data.notes || [],
                loading: false 
            });
        } catch (err) {
            console.error("Failed to fetch task overview", err);
            set({ 
                error: err.message,
                loading: false 
            });
        }
    },

    clearOverview: () => {
        set({ taskDates: [], scheduleDates: [], noteDates: [], loading: false, error: null });
    }
}));
