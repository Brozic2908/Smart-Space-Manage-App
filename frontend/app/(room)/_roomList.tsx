import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import RoomCard from "@/components/ui/RoomCard";
import { useRooms } from "@/hooks/useRooms";
import { TouchableOpacity } from "react-native-gesture-handler";

interface RoomListProps {
  roomType?: string;
}

export default function RoomList({ roomType = "All" }: RoomListProps) {
  const { rooms, loading, error } = useRooms(roomType);

  const renderRoomCard = ({ item }: any) => (
    <RoomCard id={item.id} type={item.type} available={item.available} />
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={"#073E7E"} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center">{error}</Text>
        <TouchableOpacity
          className="mt-4 bg-blue-700 py-2 px-4 rounded-lg"
          onPress={() => {}} // This would trigger a refresh in a real app
        >
          <Text className="text-white font-medium">Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={rooms}
      renderItem={renderRoomCard}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
    />
  );
}
