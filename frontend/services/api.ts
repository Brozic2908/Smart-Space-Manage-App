import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.2.7:8000/";

// Config basic axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor cho request
api.interceptors.request.use(
  async (config) => {
    // Lấy token từ AsyncStorage và thêm vào header
    const token = await AsyncStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Xử lý lỗi response
    const originalRequest = error.config;

    // Nếu lỗi 401 (Unauthorized) và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token
      } catch (e) {
        // Xử lý khi refresh token thất bại
        console.error("Error refreshing token:", e);

        // Đăng xuất người dùng
        await AsyncStorage.removeItem("auth_token");

        // Redirect to login screen would happen in component
      }
    }

    return Promise.reject(error);
  }
);

export default api;
