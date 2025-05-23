import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import qs from "qs";

// User interface defines
export interface User {
  id: string;
  email: string;
  role: "student" | "lecturer" | "admin" | "it" | "technician";
}

// Register request interface
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

// AuthService is a service that handles authentication-related API calls
const authService = {
  // login method sends a POST request to the /auth/login endpoint with the provided credentials
  login: async (email: string, password: string) => {
    try {
      const data = qs.stringify({ username: email, password });
      const response = await api.post("login", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Save the auth token to AsyncStorage
      if (response.data?.access_token) {
        await AsyncStorage.setItem("auth_token", response.data.access_token);
        await AsyncStorage.setItem("role", response.data.role);
      }

      return response.data;
    } catch (err: any) {
      console.warn("Login error:", err.response?.data || err.message);
      throw new Error("Login failed. Please check your credentials.");
    }
  },

  register: async (userData: RegisterRequest): Promise<any> => {
    try {
      const response = await api.post("/signup", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || "student", // Default to student if no role provided
      });

      return response.data;
    } catch (err: any) {
      console.warn("Register error:", err.response?.data || err.message);
      throw err;
    }
  },

  logout: async () => {
    try {
      // remove the token from asyncStorage
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("role");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem("auth_token");
    return !!token;
  },
};

export default authService;
