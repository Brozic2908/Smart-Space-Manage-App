// services/itService.ts
import api from "./api";

const itService = {
  getAllDisplayUser: async () => {
    try {
      const response = await api.get("it/users");
      return response.data;
    } catch (error) {
      console.warn("Error fetching display user:", error);
      throw error;
    }
  },
  changeRole: async (user_id: string | number, role: string) => {
    try {
      const response = await api.patch(`it/users/${user_id}?role=${role}`);
      return response.data;
    } catch (error) {
      console.warn("Error changing role:", error);
      throw error;
    }
  },
  deleteUser: async (user_id: string | number) => {
    try {
      const response = await api.delete(`it/users/${user_id}`);
      return response.data;
    } catch (error) {
      console.warn("Error deleting role:", error);
      throw error;
    }
  },
};

export default itService;
