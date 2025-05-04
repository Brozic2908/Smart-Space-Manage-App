import api from "./api";

const checkService = {
  checkIn: async (bookingId: number) => {
    try {
      const response = await api.post("check/in", null, {
        params: { booking_id: bookingId },
      });
      return response.data;
    } catch (error) {
      console.warn("Error check in:", error);
      throw error;
    }
  },
  checkInWithQR: async (room_code: string) => {
    try {
      // The API endpoint is /check/in/qr/{room_code} where room_code is a path parameter
      const response = await api.post(`check/in/qr/${room_code}`);
      return response;
    } catch (error) {
      console.warn("Error check in with QR:", error);
      throw error;
    }
  },
  checkOut: async (bookingId: number) => {
    try {
      const response = await api.post("check/out", null, {
        params: { booking_id: bookingId },
      });
      return response.data;
    } catch (error) {
      console.warn("Error check out:", error);
      throw error;
    }
  },
};

export default checkService;
