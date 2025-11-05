import { create } from 'zustand';

export const useBragDocStore = create((set, get) => ({
  // State
  selectedMonth: new Date(),
  bragData: {},

  // Actions
  setMonth: (date) => {
    set({ selectedMonth: date })
  },
  setAnswer: (id, value) => {
    set((state) => ({
      bragData: {
        ...state.bragData,
        [id]: value,
      },
    }))
  },

  saveDocument: async (axiosInstance) => {
    try {
      const { selectedMonth, bragData } = get();
      const payload = {
        month: selectedMonth.getMonth() + 1,
        year: selectedMonth.getFullYear(),
        document: bragData,
      };
      await axiosInstance.post('/brag-doc/upsert', payload);
    } catch (err) {
      console.error('Failed to save brag document', err);
    }
  },

  fetchDocument: async (axiosInstance, date) => {
    try {
      const targetDate = date ?? get().selectedMonth;
      const month = targetDate.getMonth() + 1;
      const year = targetDate.getFullYear();
      const res = await axiosInstance.get(`/brag-doc/fetch?month=${month}&year=${year}`);
      const doc = res?.data?.data?.document ?? {};
      set({ bragData: doc });
    } catch (err) {
      console.error('Failed to fetch brag document', err);
      set({ bragData: {} });
    }
  },
}))


