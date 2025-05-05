// services/roomAdminService.ts
import api from "./api";

const roomAdminService = {
  getAllRooms: async () => {
    try {
      const response = await api.get("admin/room");
      return response.data;
    } catch (error) {
      console.warn("Error fetching display rooms:", error);
      throw error;
    }
  },
  createRoom: async (roomData: any) => {
    try {
      const response = await api.post("admin/room/create", roomData);
      return response.data;
    } catch (error) {
      console.warn("Error fetching create room:", error);
      throw error;
    }
  },
  deleteRoom: async (room_id: string | number) => {
    try {
      const response = await api.delete(`admin/room/${room_id}`);
      return response.data;
    } catch (error) {
      console.warn("Error fetching delete room:", error);
      throw error;
    }
  },
  getAllBooked: async () => {
    try {
      const response = await api.get("admin/booking");
      return response.data;
    } catch (error) {
      console.warn("Error fetching all booked room:", error);
      throw error;
    }
  },
};
export default roomAdminService;
