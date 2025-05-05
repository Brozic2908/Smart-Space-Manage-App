// services/deviceService.ts
import api from "./api";

// Định nghĩa kiểu dữ liệu cho thiết bị
export interface Device {
  id: number;
  name: string;
  type: string;
  status: string;
  room_id: number;
}

const deviceService = {
  getAllDevices: async (): Promise<Device[]> => {
    try {
      const response = await api.get("technician/device");
      return response.data;
    } catch (error) {
      console.warn("Error fetching devices:", error);
      throw error;
    }
  },
};

export default deviceService;
