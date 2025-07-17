import { create } from "zustand";

export const useScheduledStore = create((set,get) => ({
    slots: [],
    fetchSchedule: async (axiosInstance, date) => {
        try{
            const response = await axiosInstance.get(`/schedule?date=${date}`);
            set({slots: response?.data?.data})
        }catch(err){
            console.error("Failed to fetch schedule", err)
        }
    },
    saveSchedule: async (axiosInstance, schedule, date) => {
        try{
            const requestObj = {
                "date": date,
                "schedule": schedule
            }
            await axiosInstance.post(`/schedule/upsert`, requestObj);
        }catch(err){
            console.error("Failed to save schedule", err)
        }
        
    }
}))