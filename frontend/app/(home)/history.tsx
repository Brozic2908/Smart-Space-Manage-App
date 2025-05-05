// app/(home)/history.tsx
import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { bookingService } from "@/services";

type HistoryItem = {
  id: string;
  room_code: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: "checked_out" | "cancelled";
};

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(async () => {
      const data = await bookingService.getAllHistoryBookings();
      // Sort bookings by created_at (newest first)
      const sortedData = [...data].sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
      setHistory(sortedData);
      setLoading(false);
    }, 500);
  }, [history.length]);

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
    const isChecked_out = item.status === "checked_out";

    const formatTime = (timeString: string) => {
      // Format time from 08:00:00 to 08:00
      return timeString.substring(0, 5);
    };

    return (
      <View className="bg-white p-4 mb-3 rounded-lg shadow-sm">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="w-14 h-14 bg-blue-100 me-4 rounded-md justify-center items-center">
              <Ionicons name="business-outline" size={26} color="#0050B3" />
            </View>
            <View>
              <Text className="font-medium text-lg ms-1 mb-1">
                {item.room_code}
              </Text>
              <View
                className={`px-2 py-1 rounded-full text-center ${
                  isChecked_out ? "bg-gray-100" : "bg-red-100"
                }`}
              >
                <Text
                  className={`text-sm font-medium text-center ${
                    isChecked_out ? "text-gray-600" : "text-red-600"
                  }`}
                >
                  {isChecked_out ? "Đã hoàn thành" : "Đã hủy"}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View className="flex-row justify-between items-center mb-1">
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2">{item.booking_date}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2">
                {formatTime(item.start_time)} - {formatTime(item.end_time)}
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
