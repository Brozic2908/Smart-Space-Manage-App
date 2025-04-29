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
      disabled={!available}
    >
      <View className="w-14 h-14 bg-blue-100 rounded-md justify-center items-center">
        <Ionicons name="business-outline" size={26} color="#0050B3" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="font-medium text-base">{id}</Text>
        <Text className="text-sm text-gray-500 mt-0.5">{type}</Text>
      </View>
      <Text
        className={`font-medium ${
          available ? "text-green-500" : "text-red-500"
        }`}
      >
        {available ? "có sẵn" : "Đã sử dụng"}
      </Text>
    </TouchableOpacity>
  );
};

export default RoomCard;
