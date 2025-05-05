// services/displayRoomService.ts
import api from "./api";

const displayRoomService = {
  getAllDisplayRooms: async (
    booking_date: string,
    start_time: string,
    end_time: string
  ) => {
    try {
      const response = await api.get(
        `/room/?booking_date=${booking_date}&start_time=${start_time}&end_time=${end_time}`
      );
      return response.data;
    } catch (error) {
      console.warn("Error fetching display rooms:", error);
      throw error;
    }
  },
};

export default displayRoomService;
