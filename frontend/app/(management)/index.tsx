// (admin)/index.tsx
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";

const DashboardCard = ({ title, icon, count, onPress }: any) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 shadow-lg flex-1 m-2"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
      onPress={onPress}
    >
      <View className="flex-row justify-between items-center mb-3">
        <View
          className="w-12 h-12 rounded-full justify-center items-center"
          style={{ backgroundColor: "#EFF6FF" }}
        >
          <Ionicons name={icon} size={24} color="#2563EB" />
        </View>
        <Text className="text-blue-600 text-lg font-bold">{count}</Text>
      </View>
      <Text className="text-gray-800 font-medium text-base">{title}</Text>
    </TouchableOpacity>
  );
};

export default function index() {
  const router = useRouter();

  const navigateTo = (screen: string) => {
    router.push(`/(management)/${screen}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <Image
        source={require("../../assets/images/bg.png")}
        className="absolute opacity-70"
        style={{ width: "100%" }}
        resizeMode="cover"
      />
      <View className="mt-24 mb-6">
        <Text className="text-center font-bold text-primary text-2xl">
          Dashboard
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="mt-4">
          <View className="flex-row flex-wrap">
            <DashboardCard
              title="Room List"
              icon="business-outline"
              count={24}
              onPress={() => navigateTo("rooms")}
            />
            <DashboardCard
              title="History"
              icon="time-outline"
              count={78}
              onPress={() => navigateTo("history")}
            />
          </View>
        </View>

        <View className="flex-row flex-wrap">
          <DashboardCard
            title="Available Rooms"
            icon="cloud-done-outline"
            count={18}
            onPress={() => {}}
          />
          <DashboardCard
            title="Booked Today"
            icon="trash-bin-outline"
            count={6}
            onPress={() => {}}
          />
        </View>

        <View className="mt-6 mb-8 bg-white rounded-xl p-4 shadow-lg m-2">
          <Text className="font-bold text-lg text-gray-800 mb-2">
            Quick Stats
          </Text>

          <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <Text className="text-gray-600">Total Rooms</Text>
            <Text className="font-medium">24</Text>
          </View>

          <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <Text className="text-gray-600">Available Rooms</Text>
            <Text className="font-medium">18</Text>
          </View>

          <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
            <Text className="text-gray-600">Booked Today</Text>
            <Text className="font-medium">6</Text>
          </View>

          <View className="flex-row justify-between items-center py-3">
            <Text className="text-gray-600">Lịch sử đặt phòng</Text>
            <Text className="font-medium">78</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
