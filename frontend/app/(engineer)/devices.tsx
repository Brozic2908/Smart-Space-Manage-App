import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Mock data for devices based on the provided database schema
const MOCK_DEVICES = [
  {
    id: 1,
    name: "Cảm biến nhiệt độ",
    type: "Sensor",
    status: "on",
    room_id: 1,
    roomName: "Phòng khách",
    battery: 75,
  },
  {
    id: 2,
    name: "Đèn thông minh",
    type: "Light",
    status: "off",
    room_id: 1,
    roomName: "Phòng khách",
    battery: 100,
  },
  {
    id: 3,
    name: "Máy lạnh",
    type: "AC",
    status: "on",
    room_id: 2,
    roomName: "Phòng ngủ",
    battery: 85,
  },
  {
    id: 4,
    name: "Cảm biến khói",
    type: "Sensor",
    status: "error",
    room_id: 3,
    roomName: "Nhà bếp",
    battery: 32,
  },
  {
    id: 5,
    name: "Khóa cửa thông minh",
    type: "Lock",
    status: "on",
    room_id: 4,
    roomName: "Cửa chính",
    battery: 56,
  },
  {
    id: 6,
    name: "Rèm cửa tự động",
    type: "Curtain",
    status: "off",
    room_id: 2,
    roomName: "Phòng ngủ",
    battery: 90,
  },
];

// Function to get icon based on device type
const getDeviceIcon = (type: string) => {
  switch (type) {
    case "Sensor":
      return <MaterialCommunityIcons name="tune" size={24} color="#4B5563" />;
    case "Light":
      return (
        <MaterialCommunityIcons
          name="lightbulb-outline"
          size={24}
          color="#4B5563"
        />
      );
    case "AC":
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
  const [devices, setDevices] = useState([]);
  const [roomFilter, setRoomFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <Image
        source={require("../../assets/images/bg.png")}
        className="absolute opacity-70"
        style={{ width: "100%" }}
        resizeMode="cover"
      />
      <View className="mt-24 pb-6">
        <Text className="text-center font-bold text-primary text-2xl">
          Quản lý thiết bị
        </Text>
      </View>
    </SafeAreaView>
  );
}
