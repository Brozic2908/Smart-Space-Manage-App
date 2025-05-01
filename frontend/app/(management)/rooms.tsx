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
  Switch,
} from "react-native";
import React, { useState } from "react";
import { rooms as mockRooms, Room } from "@/constants/rooms";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function room() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Form states
  const [roomId, setRoomId] = useState("");
  const [roomType, setRoomType] = useState("Group");
  const [roomStatus, setRoomStatus] = useState("available");
  const [roomLocation, setRoomLocation] = useState("H6");

  // Room type options for form
  type RoomType = "Group" | "Mentoring" | "Personal";
  type StatusType = "available" | "in_use" | "maintenance";

  const handleAddRoom = () => {
    setRoomId("");
    setRoomType("Group");
    setRoomStatus("available");
    setShowAddModal(true);
  };

  const handleDeleteRoom = (room: any) => {
    setSelectedRoom(room);
    setShowDeleteConfirm(true);
  };

  const saveNewRoom = () => {
    const newRoom = {
      id: roomId,
      type: roomType as RoomType,
      status: roomStatus as StatusType,
      location: roomLocation,
    };
    setRooms([...rooms, newRoom]);
    setShowAddModal(false);
  };

  const deleteRoom = () => {
    if (selectedRoom) {
      const filteredRooms = rooms.filter(
        (room) => selectedRoom && room.id !== selectedRoom.id
      );
      setRooms(filteredRooms);
    }
    setShowDeleteConfirm(false);
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
              <Text className="text-lg font-medium">{item.id}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="pricetag-outline" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">Type: {item.type}</Text>
              </View>

              <View className="flex-row items-center mt-1">
                <Ionicons
                  name={
                    item.available
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
  const roomTypes = ["Group", "Mentoring", "Personal"];
  const statusTypes = ["available", "in_use", "maintenance"];

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
          <View>
            <ActivityIndicator size={"large"} color={"#2563EB"} />
          </View>
        ) : (
          <FlatList
            data={rooms}
            renderItem={renderRoomItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
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
                    value={roomId}
                    onChangeText={setRoomId}
                    placeholder="e.g. H4-805"
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

                <View className="mb-4">
                  <Text className="text-gray-700 mb-1">Status:</Text>
                  <View className="flex-row flex-wrap justify-start mb-6">
                    {statusTypes.map((status) => (
                      <TouchableOpacity
                        key={status}
                        className={`border mr-2 mb-2 rounded-lg px-3 py-2 ${
                          roomStatus === status
                            ? "bg-primary border-primary"
                            : "border-gray-300 bg-gray-50"
                        }`}
                        onPress={() => setRoomStatus(status)}
                      >
                        <Text
                          className={`${
                            roomStatus === status
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {status === "available"
                            ? "Available"
                            : status === "in_use"
                            ? "In Use"
                            : "Maintenance"}
                        </Text>
                      </TouchableOpacity>
                    ))}
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
                    {selectedRoom?.id}
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
