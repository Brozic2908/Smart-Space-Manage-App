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
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { roomAdminService } from "@/services";

// Define booking type
interface Booking {
  id: string;
  room_code: string;
  room_type: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  user_name: string;
}

export default function History() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await roomAdminService.getAllBooked();
        setBookings(response);
      } catch (error) {
        console.warn("Error to fetch history admin", error);
        Alert.alert(
          "Lỗi",
          "Không thể tải lịch sử đặt phòng. Vui lòng thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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
  const formatTime = (hourString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(`1970-01-01T${hourString}`).toLocaleTimeString(
      "vi-VN",
      options
    );
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
                item.status === "active"
                  ? "bg-blue-100"
                  : item.status === "checked_in"
                  ? "bg-yellow-100"
                  : item.status === "checked_out"
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              <Ionicons
                name={
                  item.status === "active"
                    ? "accessibility-outline"
                    : item.status === "checked_in"
                    ? "checkmark-circle-outline"
                    : item.status === "checked_out"
                    ? "checkmark-circle"
                    : "close-circle-outline"
                }
                size={24}
                color={
                  item.status === "active"
                    ? "#2563EB"
                    : item.status === "checked_in"
                    ? "#CC9900"
                    : item.status === "checked_out"
                    ? "#10B981"
                    : "#aa0000"
                }
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-medium">{item.room_code}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">
                  {formatDate(item.booking_date)}
                </Text>
              </View>

              <View className="flex-row items-center mt-1">
                <Ionicons name="time-outline" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">
                  {formatTime(item.start_time)} - {formatTime(item.end_time)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="justify-center">
          <View
            className={`px-3 py-1 rounded-full ${
              item.status === "active"
                ? "bg-blue-100"
                : item.status === "cancelled"
                ? "bg-red-100"
                : item.status === "checked_in"
                ? "bg-yellow-100"
                : "bg-green-100" // checked_out
            }`}
          >
            <Text
              className={`${
                item.status === "active"
                  ? "text-blue-600"
                  : item.status === "cancelled"
                  ? "text-red-500"
                  : item.status === "checked_in"
                  ? "text-yellow-600"
                  : "text-green-600" // checked_out
              }`}
            >
              {
                item.status === "active"
                  ? "Đang hoạt động"
                  : item.status === "cancelled"
                  ? "Đã hủy"
                  : item.status === "checked_in"
                  ? "Đã vào phòng"
                  : "Đã trả phòng" // checked_out
              }
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
      <View className="flex-row justify-center px-4 mb-4 flex-wrap">
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
            filterStatus === "active"
              ? "bg-primary"
              : "bg-white border border-gray-300"
          }`}
          onPress={() => setFilterStatus("active")}
        >
          <Text
            className={` ${
              filterStatus === "active" ? "text-white" : "text-gray-700"
            }`}
          >
            Đang hoạt động
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
        <TouchableOpacity
          className={`py-2 px-4 m-1 rounded-full ${
            filterStatus === "checked_in"
              ? "bg-primary"
              : "bg-white border border-gray-300"
          }`}
          onPress={() => setFilterStatus("checked_in")}
        >
          <Text
            className={`${
              filterStatus === "checked_in" ? "text-white" : "text-gray-700"
            }`}
          >
            Đã vào phòng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`py-2 px-4 m-1 rounded-full ${
            filterStatus === "checked_out"
              ? "bg-primary"
              : "bg-white border border-gray-300"
          }`}
          onPress={() => setFilterStatus("checked_out")}
        >
          <Text
            className={`${
              filterStatus === "checked_out" ? "text-white" : "text-gray-700"
            }`}
          >
            Đã trả phòng
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
                        {selectedBooking.room_code}
                      </Text>
                    </View>

                    <View className="flex-row mb-3">
                      <View className="w-32">
                        <Text className="text-gray-600">Người đặt:</Text>
                      </View>
                      <Text className="font-semibold">
                        {selectedBooking.user_name}
                      </Text>
                    </View>

                    <View className="flex-row mb-3">
                      <View className="w-32">
                        <Text className="text-gray-600">Ngày đặt:</Text>
                      </View>
                      <Text className="font-semibold">
                        {formatDate(selectedBooking.booking_date)}
                      </Text>
                    </View>

                    <View className="flex-row mb-3">
                      <View className="w-32">
                        <Text className="text-gray-600">Thời gian:</Text>
                      </View>
                      <Text className="font-semibold">
                        {formatTime(selectedBooking.start_time)} -{" "}
                        {formatTime(selectedBooking.end_time)}
                      </Text>
                    </View>

                    <View className="flex-row mb-4">
                      <View className="w-32">
                        <Text className="text-gray-600">Trạng thái:</Text>
                      </View>
                      <View
                        className={`px-3 py-1 rounded-full ${
                          selectedBooking.status === "active"
                            ? "bg-blue-100"
                            : selectedBooking.status === "cancelled"
                            ? "bg-red-100"
                            : selectedBooking.status === "checked_in"
                            ? "bg-yellow-100"
                            : "bg-green-100" // checked_out
                        }`}
                      >
                        <Text
                          className={`${
                            selectedBooking.status === "active"
                              ? "text-blue-600"
                              : selectedBooking.status === "cancelled"
                              ? "text-red-500"
                              : selectedBooking.status === "checked_in"
                              ? "text-yellow-600"
                              : "text-green-600" // checked_out
                          }`}
                        >
                          {
                            selectedBooking.status === "active"
                              ? "Đang hoạt động"
                              : selectedBooking.status === "cancelled"
                              ? "Đã hủy"
                              : selectedBooking.status === "checked_in"
                              ? "Đã vào phòng"
                              : "Đã trả phòng" // checked_out
                          }
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
