import api from "./api";

const bookingService = {
  bookingRoom: async (bookingData: any) => {
    try {
      const response = await api.post("booking/", bookingData);
      return response.data;
    } catch (error) {
      console.warn("Error booking room:", error);
      throw error;
    }
  },
  getAllMybookings: async () => {
    try {
      const response = await api.get("booking/my_bookings");
      return response.data;
    } catch (error) {
      console.warn("Error fetching bookings:", error);
      throw error;
    }
  },
  cancelBooking: async (bookingId: number) => {
    try {
      const response = await api.post("booking/cancel", null, {
        params: { booking_id: bookingId },
      });
      return response.data;
    } catch (error) {
      console.warn("Error deleting booking:", error);
      throw error;
    }
  },
  getAllHistoryBookings: async () => {
    try {
      const response = await api.get("booking/history");
      return response.data;
    } catch (error) {
      console.warn("Error fetching booking history:", error);
      throw error;
    }
  },
};

export default bookingService;
