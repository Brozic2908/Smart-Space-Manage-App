// components/ui/RoomCard.tsx
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Cập nhật RoomCardProps để khớp với API response
export interface RoomData {
  id: number;
  room_code: string;
  room_type: string;
  location: string;
  status: string;
  sensor: string;
}

type RoomCardProps = {
  id: string;
  type: string;
  status: string;
  location: string;
  roomData?: RoomData; // Thêm roomData để truyền toàn bộ thông tin
  bookingDate?: string; // Ngày đặt phòng
  startTime?: string; // Thời gian bắt đầu
  endTime?: string; // Thời gian kết thúc
};

const RoomCard = ({
  id,
  type,
  status,
  location,
  roomData,
  bookingDate,
  startTime,
  endTime,
}: RoomCardProps) => {
  const router = useRouter();

  const navigateToRoomDetails = () => {
    // Truyền đầy đủ thông tin phòng qua router params
    router.push({
      pathname: "/(room)/[roomId]",
      params: {
        roomId: id,
        roomData: roomData ? JSON.stringify(roomData) : null,
        roomType: type,
        roomStatus: status,
        roomLocation: location,
        bookingDate: bookingDate,
        startTime: startTime,
        endTime: endTime,
      },
    });
  };

  // Map room types to proper display names
  const getDisplayType = (type: string) => {
    const typeMap: Record<string, string> = {
      individual: "Individual",
      group: "Group",
      mentoring: "Mentoring",
    };

    return typeMap[type.toLowerCase()] || type;
  };

  return (
    <>
      {status === "available" ? (
        <TouchableOpacity
          className={`flex-row items-center bg-white rounded-lg p-4 mb-3 shadow-sm ${
            status !== "available" ? "opacity-70" : ""
          }`}
          onPress={navigateToRoomDetails}
          disabled={status !== "available"}
        >
          <View className="w-14 h-14 bg-blue-100 rounded-md justify-center items-center">
            <Ionicons name="business-outline" size={26} color="#0050B3" />
          </View>
          <View className="flex-1 ml-3">
            <Text className="font-medium text-lg">{id}</Text>
            <Text className="text-sm text-gray-400 mt-0.5">{location}</Text>
          </View>
          <Text className="text-base font-bold text-primary mt-0.5">
            {getDisplayType(type)}
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};

export default RoomCard;
