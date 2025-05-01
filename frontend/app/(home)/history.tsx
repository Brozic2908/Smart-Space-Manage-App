// app/(home)/history.tsx
import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

type HistoryItem = {
  id: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "completed" | "cancelled";
};

// Mock history data
const historyData: HistoryItem[] = [
  {
    id: "1",
    room: "H3-806",
    date: "25/04/2025",
    startTime: "14:30",
    endTime: "16:00",
    status: "completed",
  },
  {
    id: "2",
    room: "H6-901",
    date: "23/04/2025",
    startTime: "10:00",
    endTime: "11:30",
    status: "completed",
  },
  {
    id: "3",
    room: "H8-301",
    date: "21/04/2025",
    startTime: "13:00",
    endTime: "14:30",
    status: "cancelled",
  },
  {
    id: "4",
    room: "H1-001",
    date: "20/04/2025",
    startTime: "16:00",
    endTime: "17:30",
    status: "completed",
  },
];

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setHistory(historyData);
      setLoading(false);
    }, 1000);
  }, []);

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
    const isCompleted = item.status === "completed";

    return (
      <View className="bg-white p-4 mb-3 rounded-lg shadow-sm">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="w-14 h-14 bg-blue-100 me-4 rounded-md justify-center items-center">
              <Ionicons name="business-outline" size={26} color="#0050B3" />
            </View>
            <View>
              <Text className="font-medium text-lg ms-1 mb-1">{item.room}</Text>
              <View
                className={`px-2 py-1 rounded-full text-center ${
                  isCompleted ? "bg-gray-100" : "bg-red-100"
                }`}
              >
                <Text
                  className={`text-sm font-medium text-center ${
                    isCompleted ? "text-gray-600" : "text-red-600"
                  }`}
                >
                  {isCompleted ? "Đã hoàn thành" : "Đã hủy"}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View className="flex-row justify-between items-center mb-1">
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2">{item.date}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2">
                {item.startTime} - {item.endTime}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

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
          Lịch sử đặt phòng
        </Text>
      </View>

      <View className="flex-1 px-4 pt-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">Đang tải...</Text>
          </View>
        ) : history.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="time-outline" size={64} color="#CBD5E1" />
            <Text className="text-gray-500 mt-4 text-center">
              Chưa có lịch sử đặt phòng
            </Text>
          </View>
        ) : (
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
