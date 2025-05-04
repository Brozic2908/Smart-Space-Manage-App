// (admin)/history.tsx
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
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

// Mock booking history data
const mockBookingHistory = [
  {
    id: "BK001",
    roomId: "H4-805",
    roomType: "Group",
    date: "2025-04-30",
    timeStart: "08:00",
    timeEnd: "10:00",
    status: "completed",
    userName: "Nguyen Van A",
  },
  {
    id: "BK002",
    roomId: "H6-702",
    roomType: "Mentoring",
    date: "2025-04-29",
    timeStart: "13:00",
    timeEnd: "15:00",
    status: "completed",
    userName: "Tran Thi B",
  },
  {
    id: "BK003",
    roomId: "H4-501",
    roomType: "Personal",
    date: "2025-04-29",
    timeStart: "09:00",
    timeEnd: "11:00",
    status: "cancelled",
    userName: "Le Van C",
  },
  {
    id: "BK004",
    roomId: "H6-801",
    roomType: "Group",
    date: "2025-04-28",
    timeStart: "14:00",
    timeEnd: "16:00",
    status: "completed",
    userName: "Pham Thi D",
  },
  {
    id: "BK005",
    roomId: "H4-701",
    roomType: "Mentoring",
    date: "2025-04-28",
    timeStart: "10:00",
    timeEnd: "12:00",
    status: "cancelled",
    userName: "Hoang Van E",
  },
  {
    id: "BK006",
    roomId: "H6-602",
    roomType: "Personal",
    date: "2025-04-27",
    timeStart: "15:00",
    timeEnd: "17:00",
    status: "completed",
    userName: "Vu Thi F",
  },
  {
    id: "BK007",
    roomId: "H4-902",
    roomType: "Group",
    date: "2025-04-27",
    timeStart: "08:00",
    timeEnd: "10:00",
    status: "completed",
    userName: "Dao Van G",
  },
  {
    id: "BK008",
    roomId: "H6-503",
    roomType: "Mentoring",
    date: "2025-04-26",
    timeStart: "13:00",
    timeEnd: "15:00",
    status: "cancelled",
    userName: "Bui Thi H",
  },
];

// Define booking type
interface Booking {
  id: string;
  roomId: string;
  roomType: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  status: string;
  userName: string;
}

export default function History() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookingHistory);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Filter bookings by status
  const filteredBookings = filterStatus
    ? bookings.filter((booking) => booking.status === filterStatus)
    : bookings;

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  // Function to format date to display in a friendly way
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      className="bg-white rounded-lg shadow-sm mb-3 p-4"
      onPress={() => handleViewDetails(item)}
    >
      <View className="flex-row justify-between">
        <View className="flex-1">
          <View className="flex-row items-center">
            <View
              className={`w-12 h-12 space-x-3 rounded-full justify-center items-center mr-3 ${
                item.roomType === "Group"
                  ? "bg-blue-100"
                  : item.roomType === "Mentoring"
                  ? "bg-purple-100"
                  : "bg-green-100"
              }`}
            >
              <Ionicons
                name={
                  item.roomType === "Group"
                    ? "people-outline"
                    : item.roomType === "Mentoring"
                    ? "person-outline"
                    : "briefcase-outline"
                }
                size={24}
                color={
                  item.roomType === "Group"
                    ? "#2563EB"
                    : item.roomType === "Mentoring"
                    ? "#9333EA"
                    : "#10B981"
                }
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-medium">{item.roomId}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">
                  {formatDate(item.date)}
                </Text>
              </View>

              <View className="flex-row items-center mt-1">
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">
                  {item.timeStart} - {item.timeEnd}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="justify-center">
          <View
            className={`px-3 py-1 rounded-full ${
              item.status === "completed" ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <Text
              className={`${
                item.status === "completed" ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.status === "completed" ? "Hoàn thành" : "Đã hủy"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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

      {/* Filter buttons */}
      <View className="flex-row justify-center px-4 mb-4">
        <TouchableOpacity
          className={`py-2 px-4 m-1 rounded-full ${
            filterStatus === null
              ? "bg-primary"
              : "bg-white border border-gray-300"
          }`}
          onPress={() => setFilterStatus(null)}
        >
          <Text
            className={`${
              filterStatus === null ? "text-white" : "text-gray-700"
            }`}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`py-2 px-4 m-1 rounded-full ${
            filterStatus === "completed"
              ? "bg-primary"
              : "bg-white border border-gray-300"
          }`}
          onPress={() => setFilterStatus("completed")}
        >
          <Text
            className={` ${
              filterStatus === "completed" ? "text-white" : "text-gray-700"
            }`}
          >
            Đã Hoàn thành
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`py-2 px-4  m-1 rounded-full ${
            filterStatus === "cancelled"
              ? "bg-primary"
              : "bg-white border border-gray-300"
          }`}
          onPress={() => setFilterStatus("cancelled")}
        >
          <Text
            className={`${
              filterStatus === "cancelled" ? "text-white" : "text-gray-700"
            }`}
          >
            Đã hủy
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        ) : filteredBookings.length > 0 ? (
          <FlatList
            data={filteredBookings}
            renderItem={renderBookingItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="document-text-outline" size={64} color="#CBD5E1" />
            <Text className="text-gray-400 mt-4 text-center">
              Không có lịch sử đặt phòng nào
            </Text>
          </View>
        )}
      </View>

      {/* Booking Detail Modal */}
      <Modal
        visible={showDetailModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDetailModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="bg-white rounded-xl w-11/12 p-5">
                <Text className="text-xl font-bold text-center mb-4 text-primary">
                  Chi tiết đặt phòng
                </Text>

                {selectedBooking && (
                  <View>
                    <View className="flex-row mb-3">
                      <View className="w-32">
                        <Text className="text-gray-600">Mã đặt phòng:</Text>
                      </View>
                      <Text className="font-semibold">
                        {selectedBooking.id}
                      </Text>
                    </View>

                    <View className="flex-row mb-3">
                      <View className="w-32">
                        <Text className="text-gray-600">Tên phòng:</Text>
                      </View>
                      <Text className="font-semibold">
                        {selectedBooking.roomId}
                      </Text>
                    </View>

                    <View className="flex-row mb-3">
                      <View className="w-32">
                        <Text className="text-gray-600">Loại phòng:</Text>
                      </View>
                      <Text className="font-semibold">
                        {selectedBooking.roomType}
                      </Text>
                    </View>

                    <View className="flex-row mb-3">
                      <View className="w-32">
                        <Text className="text-gray-600">Người đặt:</Text>
                      </View>
                      <Text className="font-semibold">
                        {selectedBooking.userName}
                      </Text>
                    </View>

                    <View className="flex-row mb-3">
                      <View className="w-32">
                        <Text className="text-gray-600">Ngày đặt:</Text>
                      </View>
                      <Text className="font-semibold">
                        {formatDate(selectedBooking.date)}
                      </Text>
                    </View>

                    <View className="flex-row mb-3">
                      <View className="w-32">
                        <Text className="text-gray-600">Thời gian:</Text>
                      </View>
                      <Text className="font-semibold">
                        {selectedBooking.timeStart} - {selectedBooking.timeEnd}
                      </Text>
                    </View>

                    <View className="flex-row mb-4">
                      <View className="w-32">
                        <Text className="text-gray-600">Trạng thái:</Text>
                      </View>
                      <View
                        className={`px-3 py-1 rounded-full ${
                          selectedBooking.status === "completed"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        <Text
                          className={`${
                            selectedBooking.status === "completed"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {selectedBooking.status === "completed"
                            ? "Đã Hoàn thành"
                            : "Đã hủy"}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      className="bg-primary rounded-lg py-3 px-4 mt-2"
                      onPress={() => setShowDetailModal(false)}
                    >
                      <Text className="text-white text-center font-medium">
                        Đóng
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
