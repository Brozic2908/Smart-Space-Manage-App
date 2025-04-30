// components/ui/RoomCard.tsx
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type RoomCardProps = {
  id: string;
  type: string;
  available: boolean;
};

const RoomCard = ({ id, type, available }: RoomCardProps) => {
  const router = useRouter();

  const navigateToRoomDetails = () => {
    router.push(`/(room)/${id}`);
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center bg-white rounded-lg p-4 mb-3 shadow-sm ${
        !available ? "opacity-70" : ""
      }`}
      onPress={navigateToRoomDetails}
    >
      <View className="w-14 h-14 bg-blue-100 rounded-md justify-center items-center">
        <Ionicons name="business-outline" size={26} color="#0050B3" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="font-medium text-lg">{id}</Text>
        <Text className="text-sm text-gray-500 mt-0.5">{type}</Text>
      </View>
      <View
        className={`rounded-full py-1 px-2 ${
          available ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <Text
          className={`font-medium ${
            available ? "text-green-600" : "text-red-700"
          }`}
        >
          {available ? "có sẵn" : "Đã sử dụng"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoomCard;
