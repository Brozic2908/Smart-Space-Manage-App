// components/room/RoomDetail.tsx
import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

// Cập nhật lại interface Room để phù hợp với dữ liệu mới
interface Room {
  id: string; // room_code
  type: string; // room_type
  status: string;
  location: string;
}

type RoomDetailProps = {
  room: Room | null;
  loading: boolean;
};

export default function RoomDetail({ room, loading }: RoomDetailProps) {
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={"#2563eb"} />
      </View>
    );
  }

  if (!room) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">Không tìm thấy phòng</Text>
      </View>
    );
  }

  // Map room types to proper display names
  const getDisplayType = (type: string) => {
    const typeMap: Record<string, string> = {
      individual: "Phòng cá nhân",
      group: "Phòng nhóm",
      mentoring: "Phòng hướng dẫn",
    };

    return typeMap[type.toLowerCase()] || type;
  };

  return (
    <View className="p-4">
      <View className="flex-row justify-between p-2">
        <Text className="text-2xl font-bold">{room.id}</Text>
        <Text className="text-gray-600 text-xl font-medium">
          {getDisplayType(room.type)}
        </Text>
      </View>
      <View className="flex-row items-center mb-4">
        <View className="w-full h-52 bg-gray-100 rounded-lg justify-center items-center">
          <Ionicons name="business-outline" size={100} color={"#0050B3"} />
        </View>
      </View>

      <View className="flex-row flex-wrap p-2">
        <View className="w-1/2 mb-2">
          <Text className="text-gray-500">Vị trí</Text>
          <Text className="font-medium text-lg">{room.location || "N/A"}</Text>
        </View>
        <View className="w-1/2 mb-2">
          <Text className="text-gray-500">Trạng thái</Text>
          <Text
            className={`font-medium text-lg ${
              room.status === "available"
                ? "text-green-500"
                : room.status === "in_use"
                ? "text-red-500"
                : "text-yellow-600"
            }`}
          >
            {room.status === "available"
              ? "Có sẵn"
              : room.status === "in_use"
              ? "Đang sử dụng"
              : "Đang bảo trì"}
          </Text>
        </View>
      </View>
    </View>
  );
}
