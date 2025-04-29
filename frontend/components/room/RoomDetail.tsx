// components/room/RoomDetails.tsx
import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Room } from "@/constants/rooms";
import { Ionicons } from "@expo/vector-icons";

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
        <Text className="text-lg text-gray-500">Room not found</Text>
      </View>
    );
  }

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <View className="flex-row items-center mb-4">
        <View className="w-14 h-14 bg-blue-100 rounded-md justify-center">
          <Ionicons name="business-outline" size={26} color={"#0050B3"} />
        </View>
        <View className="ml-3">
          <Text className="text-xl font-bold">{room.id}</Text>
          <Text className="text-gray-500">{room.type}</Text>
        </View>
      </View>

      <View className="flex-row flex-wrap">
        <View className="w-1/2 mb-2">
          <Text className="text-gray-500">Tòa nhà</Text>
          <Text className="font-medium">{room.building || "N/A"}</Text>
        </View>
        <View className="w-1/2 mb-2">
          <Text className="text-gray-500">Tầng</Text>
          <Text className="font-medium">{room.floor || "N/A"}</Text>
        </View>
        <View className="w-1/2 mb-2">
          <Text className="text-gray-500">Sức chứa</Text>
          <Text className="font-medium">{room.capacity || "N/A"} người</Text>
        </View>
        <View className="w-1/2 mb-2">
          <Text className="text-gray-500">Trạng thái</Text>
          <Text
            className={`font-medium ${
              room.available ? "text-green-500" : "text-red-500"
            }`}
          >
            {room.available ? "Có sẵn" : "Đã sử dụng"}
          </Text>
        </View>
      </View>
    </View>
  );
}
