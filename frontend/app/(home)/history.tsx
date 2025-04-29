import { View, Text, SafeAreaView } from "react-native";
import React from "react";

export default function history() {
  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <View className="mt-24 pb-6">
        <Text className="text-center font-bold text-primary text-2xl">
          Lịch sử đặt phòng
        </Text>
      </View>
    </SafeAreaView>
  );
}
