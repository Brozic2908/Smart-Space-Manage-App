// services/reportService.ts
import api from "./api";

const reportService = {
  getReport: async (month: string | number, year: string | number) => {
    try {
      const response = await api.get(
        `admin/export?month=${month}&year=${year}`
      );
      return response.data;
    } catch (error) {
      console.warn("Error fetching display report:", error);
      throw error;
    }
  },
};
export default reportService;
