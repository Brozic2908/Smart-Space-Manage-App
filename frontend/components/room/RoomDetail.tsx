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
    <View className="p-4">
      <View className="flex-row justify-between p-2">
        <Text className="text-2xl font-bold">{room.id}</Text>
        <Text className="text-gray-600 text-xl font-medium">{room.type}</Text>
      </View>
      <View className="flex-row items-center mb-4">
        <View className="w-full h-52 bg-gray-100 rounded-lg justify-center items-center">
          <Ionicons name="business-outline" size={100} color={"#0050B3"} />
        </View>
      </View>

      <View className="flex-row flex-wrap p-2">
        <View className="w-1/2 mb-2">
          <Text className="text-gray-500">Tòa nhà</Text>
          <Text className="font-medium text-lg">{room.building || "N/A"}</Text>
        </View>
        <View className="w-1/2 mb-2">
          <Text className="text-gray-500">Tầng</Text>
          <Text className="font-medium text-lg">{room.floor || "N/A"}</Text>
        </View>
        <View className="w-1/2 mb-2">
          <Text className="text-gray-500">Sức chứa</Text>
          <Text className="font-medium text-lg">
            {room.capacity || "N/A"} người
          </Text>
        </View>
        <View className="w-1/2 mb-2">
          <Text className="text-gray-500">Trạng thái</Text>
          <Text
            className={`font-medium text-lg ${
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
