import React from "react";
import { create } from "zustand";

export const useTaskStore = create((set, get) => ({
    tasks: [],
    fetchTasks: async (axiosInstance, date) => {
        try {
            const res = await axiosInstance.get(`/task/all/day?date=${date}`);
            set({ tasks: res.data?.data });
        } catch (err) {
            console.error("Failed to fetch tasks", err);
        }
    },

    addTask: async (axiosInstance, request) => {
        const newTask = request;
        try {
            const response = await axiosInstance.post("/task/create", newTask);
            set((state) => ({
                tasks: [...state.tasks, response.data?.data],
            }));
        } catch (err) {
            console.error("Failed to add task", err);
        }


    },

    deleteTask: async (axiosInstance, id) => {
        set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id),
        }));

        try {
            await axiosInstance.delete(`/task/delete/${id}`);
        } catch (err) {
            console.error("Failed to delete task", err);
        }
    },

    updateTask: async (axiosInstance, request) => {
        const updatedTask = request;
        const taskId = request.id;
        try {
            const response = await axiosInstance.patch("/task/update/", updatedTask);
            console.log(response.data)
            set((state) => ({
                tasks: state.tasks.map(task =>
                    task.id === taskId ? response.data : task
                )
            }));

        } catch (err) {
            console.error("Failed to update task", err);
        }
    },

    fetchTaskById: async (axiosInstance, id) => {
        try {
            const response = await axiosInstance.get(`task/${id}`);
            return response.data?.data;
        } catch (err) {
            console.error("Failed to fetch task", err);
        }
    },
}));
