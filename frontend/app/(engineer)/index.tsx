import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { deviceService } from "@/services";

// Mock data for devices based on the provided database schema
interface Device {
  id: number;
  name: string;
  type: string;
  status: string;
  room_id: number;
}

const MOCK_DEVICES: Device[] = [
  {
    id: 1,
    name: "Cảm biến nhiệt độ",
    type: "Sensor",
    status: "on",
    room_id: 1,
  },
  {
    id: 2,
    name: "Đèn thông minh",
    type: "Light",
    status: "off",
    room_id: 1,
  },
  {
    id: 3,
    name: "Máy lạnh",
    type: "AC",
    status: "on",
    room_id: 2,
  },
  {
    id: 4,
    name: "Cảm biến khói",
    type: "Sensor",
    status: "error",
    room_id: 3,
  },
  {
    id: 5,
    name: "Khóa cửa thông minh",
    type: "Lock",
    status: "on",
    room_id: 4,
  },
  {
    id: 6,
    name: "Rèm cửa tự động",
    type: "Curtain",
    status: "off",
    room_id: 2,
  },
];

// Function to get icon based on device type
const getDeviceIcon = (type: string) => {
  switch (type) {
    case "Sensor":
      return <MaterialCommunityIcons name="tune" size={24} color="#4B5563" />;
    case "light":
      return (
        <MaterialCommunityIcons
          name="lightbulb-outline"
          size={24}
          color="#4B5563"
        />
      );
    case "air_conditioner":
      return (
        <MaterialCommunityIcons
          name="air-conditioner"
          size={24}
          color="#4B5563"
        />
      );
    case "Lock":
      return (
        <MaterialCommunityIcons name="lock-outline" size={24} color="#4B5563" />
      );
    case "Curtain":
      return (
        <MaterialCommunityIcons name="curtains" size={24} color="#4B5563" />
      );
    default:
      return (
        <MaterialCommunityIcons name="devices" size={24} color="#4B5563" />
      );
  }
};

// Function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "on":
      return "bg-green-500";
    case "off":
      return "bg-gray-400";
    case "error":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};

// Function to get status text
const getStatusText = (status: string) => {
  switch (status) {
    case "on":
      return "Hoạt động";
    case "off":
      return "Tắt";
    case "error":
      return "Lỗi";
    default:
      return "Không xác định";
  }
};

export default function devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [roomFilter, setRoomFilter] = useState<number | "all">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Load devices
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setError(null);
    setLoading(true);
    try {
      const devicesData = await deviceService.getAllDevices();
      setDevices(devicesData);
    } catch (err) {
      console.error("Error loading devices:", err);
      setError("Failed to load devices");
    } finally {
      setLoading(false);
    }
  };

  // Filter devices based on selected filters
  const filteredDevices = devices.filter((device) => {
    const matchStatus =
      statusFilter === "all" || device.status === statusFilter;
    return matchStatus;
  });

  // Handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      await loadData();
    } catch (err) {
      console.error("Error refreshing devices:", err);
      setError("Không thể làm mới dữ liệu. Vui lòng thử lại.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <Image
        source={require("../../assets/images/bg.png")}
        className="absolute opacity-70"
        style={{ width: "100%" }}
        resizeMode="cover"
      />
      <View className="mt-20 pb-6">
        <Text className="text-center font-bold text-primary text-2xl">
          Quản lý thiết bị
        </Text>
      </View>

      <View className="px-4 shadow-sm mb-2">
        {/* Status filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => setStatusFilter("all")}
            className={`mr-2 px-3 py-1 rounded-full ${
              statusFilter === "all" ? "bg-blue-500" : "bg-white"
            }`}
          >
            <Text
              className={`${
                statusFilter === "all" ? "text-white" : "text-gray-800"
              }`}
            >
              Tất cả trạng thái
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setStatusFilter("on")}
            className={`mr-2 px-3 py-1 rounded-full ${
              statusFilter === "on" ? "bg-blue-500" : "bg-white"
            }`}
          >
            <Text
              className={`${
                statusFilter === "on" ? "text-white" : "text-gray-800"
              }`}
            >
              Hoạt động
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setStatusFilter("off")}
            className={`mr-2 px-3 py-1 rounded-full ${
              statusFilter === "off" ? "bg-blue-500" : "bg-white"
            }`}
          >
            <Text
              className={`${
                statusFilter === "off" ? "text-white" : "text-gray-800"
              }`}
            >
              Tắt
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setStatusFilter("error")}
            className={`mr-2 px-3 py-1 rounded-full ${
              statusFilter === "error" ? "bg-blue-500" : "bg-white"
            }`}
          >
            <Text
              className={`${
                statusFilter === "error" ? "text-white" : "text-gray-800"
              }`}
            >
              Lỗi
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View className="flex-row ml-4 mb-1">
        <Text className="text-lg font-bold">
          Danh sách thiết bị ({filteredDevices.length})
        </Text>
      </View>

      {/* Devices List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color="#2563eb" />
          <Text className="text-gray-600 mt-2">Đang tải thiết bị...</Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="p-4">
            {/* Danh sách thiết bị */}
            {loading ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size={"large"} color="#2563eb" />
                <Text className="text-gray-600 mt-2">Đang tải thiết bị...</Text>
              </View>
            ) : error ? (
              <View className="flex-1 justify-center items-center p-4">
                <MaterialCommunityIcons
                  name="alert-circle-outline"
                  size={48}
                  color="#EF4444"
                />
                <Text className="text-red-500 mt-2 text-center">{error}</Text>
                <TouchableOpacity
                  className="mt-4 bg-blue-500 px-4 py-2 rounded-full"
                  onPress={onRefresh}
                >
                  <Text className="text-white">Thử lại</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {filteredDevices.length === 0 ? (
                  <View className="bg-white rounded-lg p-4 items-center justify-center h-40">
                    <MaterialCommunityIcons
                      name="power-off"
                      size={48}
                      color="#9CA3AF"
                    />
                    <Text className="text-gray-500 mt-2">
                      Không tìm thấy thiết bị nào
                    </Text>
                  </View>
                ) : (
                  filteredDevices.map((device) => (
                    <View
                      key={device.id}
                      className="bg-white rounded-lg mb-3 shadow-sm overflow-hidden"
                    >
                      <View className="flex-row items-center p-4">
                        <View className="mr-3 px-3 bg-blue-100 py-3 rounded-full">
                          {getDeviceIcon(device.type)}
                        </View>
                        <View className="flex-1">
                          <View className="flex-row items-center justify-between">
                            <View className="">
                              <Text className="font-bold text-lg">
                                {device.name}
                              </Text>
                              <View className="">
                                <Text className="text-gray-500 mb-1">
                                  {device.type}
                                </Text>
                                <View className="flex-row items-center">
                                  <Text
                                    className={`
                              ${
                                device.status === "on"
                                  ? "text-green-600"
                                  : device.status === "off"
                                  ? "text-gray-600"
                                  : "text-red-600"
                              }
                            `}
                                  >
                                    {getStatusText(device.status)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View>
                              <View
                                className={`rounded-full h-3 w-3 me-3 ${getStatusColor(
                                  device.status
                                )}`}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
                )}
              </>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
