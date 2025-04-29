import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type BookedRoom = {
  id: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "active" | "completed" | "cancelled";
};

// Mock data for booked rooms
const bookedRoomsData: BookedRoom[] = [
  {
    id: "1",
    room: "H6-901",
    date: "28/04/2025",
    startTime: "10:00",
    endTime: "11:30",
    status: "active",
  },
  {
    id: "2",
    room: "H8-301",
    date: "29/04/2025",
    startTime: "13:00",
    endTime: "14:30",
    status: "active",
  },
  {
    id: "3",
    room: "H3-806",
    date: "27/04/2025",
    startTime: "14:30",
    endTime: "16:00",
    status: "completed",
  },
  {
    id: "4",
    room: "H6-901",
    date: "28/04/2025",
    startTime: "10:00",
    endTime: "11:30",
    status: "active",
  },
  {
    id: "5",
    room: "H8-301",
    date: "29/04/2025",
    startTime: "13:00",
    endTime: "14:30",
    status: "active",
  },
  {
    id: "6",
    room: "H3-806",
    date: "27/04/2025",
    startTime: "14:30",
    endTime: "16:00",
    status: "cancelled",
  },
];

export default function booked() {
  const router = useRouter();
  const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookedRooms(bookedRoomsData);
      setLoading(false);
    }, 1000);
  }, []);

  const renderBookedRoomItem = ({ item }: { item: BookedRoom }) => {
    const isActive = item.status === "active";
    const isCompleted = item.status === "completed";

    return (
      <View className="bg-white p-4 rounded-lg shadow-sm mb-3">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-medium text-lg mb-1">{item.room}</Text>
            <View className="flex-row items-center mb-1">
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2">{item.date}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color={"#6B7280"} />
              <Text className="text-gray-600 ml-2">
                {item.startTime} - {item.endTime}
              </Text>
            </View>
          </View>
          <View>
            <View
              className={`px-2 py-1 rounded-full ${
                isActive
                  ? "bg-green-100"
                  : isCompleted
                  ? "bg-gray-100"
                  : "bg-red-100"
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  isActive
                    ? "text-green-600"
                    : isCompleted
                    ? "text-gray-600"
                    : "text-red-600"
                }`}
              >
                {isActive
                  ? "Đang diễn ra"
                  : isCompleted
                  ? "Đã hoàn thành"
                  : "Đã hủy"}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row mt-3 pt-2 justify-between border-t border-gray-200">
          <TouchableOpacity
            className="flex-1 flex-row justify-center items-center"
            onPress={() => router.push(`/(room)${item.room}`)}
          >
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#2563eb"
            />
            <Text className="text-blue-600 ml-1 font-medium">Chi tiết</Text>
          </TouchableOpacity>

          {isActive && (
            <TouchableOpacity className="flex-1 flex-row justify-center items-center">
              <Ionicons name="close-circle-outline" size={18} color="#EF4444" />
              <Text className="text-red-500 ml-1 font-medium">Hủy đặt</Text>
            </TouchableOpacity>
          )}

          {isActive && (
            <TouchableOpacity className="flex-1 flex-row justify-center items-center">
              <Ionicons name="qr-code-outline" size={18} color="#2563eb" />
              <Text className="text-blue-600 ml-1 font-medium">Check-in</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <View className="mt-24 pb-6">
        <Text className="text-center font-bold text-primary text-2xl">
          Phòng đã đặt
        </Text>
      </View>

      <View className="flex-1 px-4 pt-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">Đang tải ...</Text>
          </View>
        ) : bookedRooms.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="calendar-outline" size={64} color="#CBD5E1" />
            <Text className="text-gray-500 mt-4 text-center">
              Bạn chưa đặt phòng nào
            </Text>
            <TouchableOpacity
              className="mt-4 bg-blue-700 py-2 px-6 rounded-lg"
              onPress={() => router.push("/(home)")}
            >
              <Text className="text-white font-medium">Đặt phòng ngay</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={bookedRooms}
            renderItem={renderBookedRoomItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
