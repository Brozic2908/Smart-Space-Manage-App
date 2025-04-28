import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";

// Mock data phòng học
const rooms = [
  { id: "H6-901", type: "Mentoring", available: true },
  { id: "H8-301", type: "Group", available: true },
  { id: "H3-806", type: "Group", available: true },
  { id: "H6-902", type: "Mentoring", available: true },
  { id: "H8-305", type: "Group", available: true },
  { id: "H3-906", type: "Group", available: true },
  { id: "H2-609", type: "Personal", available: false },
  { id: "H1-001", type: "Personal", available: true },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  const filteredRooms =
    activeTab === "All"
      ? rooms
      : rooms.filter((room) => room.type === activeTab);

  const navigateToRoomDetails = (roomId: string) => {
    router.push(`/(home)/${roomId}`);
  };

  const renderRoomCard = ({ item }: any) => (
    <TouchableOpacity
      className={`flex-row items-center bg-white rounded-lg p-4 mb-3 shadow-sm ${
        !item.available ? "opacity-70" : ""
      }`}
      onPress={() => navigateToRoomDetails(item.id)}
      disabled={!item.available}
    >
      <View className="w-14 h-14 bg-blue-100 rounded-md justify-center items-center">
        <Ionicons name="business-outline" size={26} color="#0050B3" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="font-medium text-base">{item.id}</Text>
        <Text className="text-sm text-gray-500 mt-0.5">{item.type}</Text>
      </View>
      {/* <View className=""> */}
      {/* <Text className="text-blue-500 font-medium">Details</Text> */}
      {/* </View> */}
      <Text
        className={`font-medium ${
          item.available ? "text-success" : "text-danger"
        }`}
      >
        {item.available ? "có sẵn" : "Đã sử dụng"}
      </Text>
    </TouchableOpacity>
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

      <FlatList
        data={filteredRooms}
        renderItem={renderRoomCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
