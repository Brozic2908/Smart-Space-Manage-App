// (admin)/rooms.tsx
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { roomAdminService } from "@/services";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Room {
  id: number;
  room_code: string;
  room_type: "group" | "mentoring" | "individual";
  status: "available" | "in_use" | "maintenance";
  location: string;
  sensor?: "active" | "inactive";
}

export default function room() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Form states
  const [roomCode, setRoomCode] = useState("");
  const [roomType, setRoomType] = useState("individual");
  const [roomStatus, setRoomStatus] = useState("available");
  const [roomLocation, setRoomLocation] = useState("");
  const [sensorStatus, setSensorStatus] = useState("active");

  // Room type options for form
  type RoomType = "group" | "mentoring" | "individual";
  type StatusType = "available" | "in_use" | "maintenance";

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const roomData = await roomAdminService.getAllRooms();
      setRooms(roomData);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to load rooms. Please check your connection and try again."
      );
      console.warn("Error fetching rooms: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = () => {
    setRoomCode("");
    setRoomType("individual");
    setRoomLocation("");
    setShowAddModal(true);
  };

  const handleDeleteRoom = (room: Room) => {
    setSelectedRoom(room);
    setShowDeleteConfirm(true);
  };

  const saveNewRoom = async () => {
    try {
      setLoading(true);
      const newRoom = {
        room_code: roomCode,
        room_type: roomType as RoomType,
        location: roomLocation,
      };

      await roomAdminService.createRoom(newRoom);

      // Refresh roomlist
      fetchRooms();

      setShowAddModal(false);
      Alert.alert("Success", "Room added successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to add room. Please try again.");
      console.warn("Error adding room:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async () => {
    if (selectedRoom) {
      try {
        setLoading(true);
        await roomAdminService.deleteRoom(selectedRoom.id);

        // Update local state after successful deletion
        const filteredRooms = rooms.filter(
          (room) => room.id !== selectedRoom.id
        );
        setRooms(filteredRooms);

        Alert.alert("Success", "Room deleted successfully");
      } catch (error) {
        Alert.alert("Error", "Failed to delete room. Please try again.");
        console.warn("Error deleting room:", error);
      } finally {
        setLoading(false);
        setShowDeleteConfirm(false);
      }
    }
  };

  const renderRoomItem = ({ item }: any) => (
    <View className="bg-white rounded-lg shadow-sm mb-3 p-4">
      <View className="flex-row justify-between">
        <View className="flex-1">
          <View className="flex-row items-center">
            <View className="w-16 h-16 rounded-lg bg-blue-100 justify-center items-center mr-3">
              <Ionicons name="business-outline" size={30} color="#2563EB" />
            </View>
            <View>
              <Text className="text-lg font-medium">{item.room_code}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="location-outline" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">
                  {item.location.charAt(0).toUpperCase() +
                    item.location.slice(1)}
                </Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Ionicons name="pricetag-outline" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">
                  Type:{" "}
                  {item.room_type.charAt(0).toUpperCase() +
                    item.room_type.slice(1)}
                </Text>
              </View>
              <View className="flex-row items-center mt-1">
                <MaterialIcons name="sensors" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">
                  Sensor:{" "}
                  {item.sensor.charAt(0).toUpperCase() + item.sensor.slice(1)}
                </Text>
              </View>

              <View className="flex-row items-center mt-1">
                <Ionicons
                  name={
                    item.status === "available"
                      ? "checkmark-circle-outline"
                      : "close-circle-outline"
                  }
                  size={16}
                  color={
                    item.status === "available"
                      ? "#10B981"
                      : item.status === "in_use"
                      ? "#EF4444"
                      : "#FBBF24"
                  }
                />
                <Text
                  className={`ml-2 ${
                    item.status === "available"
                      ? "text-green-600"
                      : item.status === "in_use"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {item.status === "available"
                    ? "Available"
                    : item.status === "in_use"
                    ? "In Use"
                    : "Maintenance"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="justify-around">
          <TouchableOpacity
            className="p-3 bg-red-50 rounded-full"
            onPress={() => handleDeleteRoom(item)}
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Room type options for form
  const roomTypes = ["individual", "group", "mentoring"];

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <Image
        source={require("../../assets/images/bg.png")}
        className="absolute opacity-70"
        style={{ width: "100%" }}
        resizeMode="cover"
      />
      <View className="mt-24 pb-8 flex-row justify-between items-center px-4">
        <View className="p-3"></View>
        <Text className="text-center font-bold text-primary text-2xl">
          Danh sách không gian
        </Text>
        <TouchableOpacity className="p-2" onPress={handleAddRoom}>
          <Ionicons name="add-circle" size={24} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"} color={"#2563EB"} />
          </View>
        ) : (
          <FlatList
            data={rooms}
            renderItem={renderRoomItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            refreshing={loading}
            onRefresh={fetchRooms}
          />
        )}
      </View>

      {/* Add Room Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAddModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowAddModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="bg-white rounded-xl w-11/12 p-4 max-h-4/5">
                <Text className="text-xl font-bold text-center mb-4 text-primary ">
                  Add New Room
                </Text>

                <View className="mb-4">
                  <Text className="text-gray-700 mb-1">Room Name:</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg p-2 bg-gray-50"
                    value={roomCode}
                    onChangeText={setRoomCode}
                    placeholder="e.g. H4-805"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-gray-700 mb-1">Room Location:</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg p-2 bg-gray-50"
                    value={roomLocation}
                    onChangeText={setRoomLocation}
                    placeholder="e.g. Building H4, Floor 8"
                  />
                </View>

                <View className="mb-2">
                  <Text className="text-gray-700 mb-1">Room Type:</Text>
                  <View className="flex-row flex-wrap justify-start">
                    {roomTypes.map((type) => (
                      <TouchableOpacity
                        key={type}
                        className={`border mr-2 mb-2 rounded-lg px-3 py-2 ${
                          roomType === type
                            ? "bg-primary border-primary"
                            : "border-gray-300 bg-gray-50"
                        }`}
                        onPress={() => setRoomType(type)}
                      >
                        <Text
                          className={`${
                            roomType === type ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View className="flex-row justify-end space-x-3">
                  <TouchableOpacity
                    className="bg-gray-200 rounded-lg py-2 px-4"
                    onPress={() => setShowAddModal(false)}
                  >
                    <Text className="text-gray-700">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-primary rounded-lg py-2 px-4 ms-3"
                    onPress={saveNewRoom}
                  >
                    <Text className="text-white">Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteConfirm}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDeleteConfirm(false)}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="bg-white rounded-xl w-4/5 p-4">
                <Text className="text-xl font-bold text-center mb-2">
                  Confirm Deletion
                </Text>

                <Text className="text-gray-600 text-center mb-4">
                  Bạn có chắc chắn muốn xóa không gian{" "}
                  <Text className="font-bold text-red-500">
                    {selectedRoom?.room_code}
                  </Text>
                  ? Hành động này không thể hoàn tác
                </Text>

                <View className="flex-row justify-center space-x-3">
                  <TouchableOpacity
                    className="bg-gray-200 rounded-lg py-2 px-4 mr-3"
                    onPress={() => setShowDeleteConfirm(false)}
                  >
                    <Text className="text-gray-700">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-500 rounded-lg py-2 px-4"
                    onPress={deleteRoom}
                  >
                    <Text className="text-white">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
