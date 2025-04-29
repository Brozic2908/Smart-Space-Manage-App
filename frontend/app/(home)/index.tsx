import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import RoomCard from "@/components/ui/RoomCard";
import { useRooms } from "@/hooks/useRooms";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const { rooms, loading, error } = useRooms(activeTab);

  const renderRoomCard = ({ item }: any) => (
    <RoomCard id={item.id} type={item.type} available={item.available} />
  );

  return (
    <View className="flex-1 bg-blue-50">
      <View className="mt-24 pb-6">
        <Text className="text-center font-bold text-primary text-2xl">
          Đặt phòng học
        </Text>
      </View>

      <View className="flex-row justify-center px-4 pb-3">
        {["All", "Mentoring", "Group", "Personal"].map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`p-3 pb-1 ${
              activeTab === tab
                ? "border-b-[3px] border-primary"
                : "border-b-[1px] border-gray-300"
            }`}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`text-lg ${
                activeTab === tab ? "text-primary font-medium" : "text-gray-300"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-center">{error}</Text>
          <TouchableOpacity
            className="mt-4 bg-blue-700 py-2 px-4 rounded-lg"
            onPress={() => setActiveTab(activeTab)} // Refresh
          >
            <Text className="text-white font-medium">Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={rooms}
          renderItem={renderRoomCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
