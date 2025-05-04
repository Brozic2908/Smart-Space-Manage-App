import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { bookingService, checkService } from "@/services";

type BookedRoom = {
  id: number;
  user_name: string;
  room_code: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: "active" | "checked_in" | "checked_out" | "cancelled";
  created_at: string;
};

export default function booked() {
  const router = useRouter();
  const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookedRoom | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getAllMybookings();

      // Sort bookings by created_at (newest first)
      const sortedData = [...data].sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      setBookedRooms(sortedData);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách phòng đã đặt");
      console.warn("Error fetching booked rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = (booking: BookedRoom) => {
    setSelectedBooking(booking);
    setShowConfirmModal(true);
  };

  const confirmCancelBooking = async () => {
    try {
      if (selectedBooking) {
        setLoading(true);
        await bookingService.cancelBooking(selectedBooking.id);
        fetchBookings();
      }
    } catch (err) {
      console.warn("Error cancelling booking:", err);
      setError("Không thể hủy đặt phòng. Vui lòng thử lại sau.");
    } finally {
      setShowConfirmModal(false);
      setLoading(false);
    }
  };

  const handleCheckin = async (bookingId: number) => {
    try {
      setLoading(true);
      await checkService.checkIn(bookingId);
      fetchBookings(); // Refresh the list
    } catch (err) {
      console.warn("Error checking in:", err);
      setError("Không thể check-in. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (bookingId: number) => {
    try {
      setLoading(true);
      // Use the checkService instead of bookingService for checkout
      await checkService.checkOut(bookingId);
      fetchBookings(); // Refresh the list
    } catch (err) {
      console.warn("Error checking out:", err);
      setError("Không thể check-out. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatTime = (timeString: string) => {
    // Format time from 08:00:00 to 08:00
    return timeString.substring(0, 5);
  };

  const renderBookedRoomItem = ({ item }: { item: BookedRoom }) => {
    const isActive = item.status === "active" || item.status === "checked_in";
    const isCompleted = item.status === "checked_out";

    return (
      <View className="bg-white p-4 rounded-lg shadow-sm mb-3">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="w-14 h-14 bg-blue-100 me-4 rounded-md justify-center items-center">
              <Ionicons name="business-outline" size={26} color="#0050B3" />
            </View>
            <View>
              <Text className="font-medium text-lg mb-1 ms-1">
                {item.room_code}
              </Text>
              <View
                className={`px-2 py-1 rounded-full flex-row justify-center ${
                  item.status === "active"
                    ? "bg-blue-100"
                    : item.status === "checked_in"
                    ? "bg-green-100"
                    : isCompleted
                    ? "bg-gray-100"
                    : "bg-red-100"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    item.status === "active"
                      ? "text-blue-600"
                      : item.status === "checked_in"
                      ? "text-green-600"
                      : isCompleted
                      ? "text-gray-600"
                      : "text-red-600"
                  }`}
                >
                  {item.status === "active"
                    ? "Đang hiệu lực"
                    : item.status === "checked_in"
                    ? "Đã check-in"
                    : isCompleted
                    ? "Đã hoàn thành"
                    : "Đã hủy"}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View className="flex-row justify-between items-center mb-1">
              <Ionicons name="calendar-outline" size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2">
                {formatDate(item.booking_date)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Ionicons name="time-outline" size={16} color={"#6B7280"} />
              <Text className="text-gray-600 ml-2">
                {formatTime(item.start_time)} - {formatTime(item.end_time)}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row mt-3 pt-2 justify-between border-t border-gray-200">
          {isActive && item.status !== "checked_in" && (
            <TouchableOpacity
              className="flex-1 flex-row justify-center items-center"
              onPress={() => handleCancelBooking(item)}
            >
              <Ionicons name="close-circle-outline" size={18} color="#EF4444" />
              <Text className="text-red-500 ml-1 font-medium">Hủy đặt</Text>
            </TouchableOpacity>
          )}

          {isActive && (
            <TouchableOpacity
              className={`flex-1 flex-row justify-center items-center rounded-full ${
                item.status === "checked_in" ? "bg-yellow-100" : "bg-green-100"
              } py-1`}
              onPress={() => {
                if (item.status === "checked_in") {
                  handleCheckout(item.id);
                } else {
                  handleCheckin(item.id);
                }
              }}
            >
              {item.status === "checked_in" ? (
                <>
                  <Ionicons name="log-out-outline" size={18} color="#d97706" />
                  <Text className="text-yellow-700 ml-1 font-medium">
                    Check-out
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons name="qr-code-outline" size={18} color="#3e9762" />
                  <Text className="text-green-600 ml-1 font-medium">
                    Check-in
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}
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
          Phòng đã đặt
        </Text>
      </View>

      <View className="flex-1 px-4 pt-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0050B3" />
            <Text className="text-gray-500 mt-2">Đang tải ...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
            <Text className="text-red-500 mt-4 text-center">{error}</Text>
            <TouchableOpacity
              className="mt-4 bg-blue-700 py-2 px-6 rounded-lg"
              onPress={fetchBookings}
            >
              <Text className="text-white font-medium">Thử lại</Text>
            </TouchableOpacity>
          </View>
        ) : bookedRooms.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="calendar-outline" size={64} color="#CBD5E1" />
            <Text className="text-gray-500 mt-4 text-center">
              Bạn chưa đặt phòng nào
            </Text>
            <TouchableOpacity
              className="mt-4 bg-blue-700 py-2 px-6 rounded-lg"
              onPress={() => router.push("/(home)")}
            >
              <Text className="text-white font-medium">Đặt phòng ngay</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={bookedRooms}
            renderItem={renderBookedRoomItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            onRefresh={fetchBookings}
          />
        )}
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowConfirmModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="bg-white rounded-xl p-6 m-4 w-4/5">
                <Text className="text-xl font-bold text-center mb-6">
                  Sinh viên vui lòng xác nhận để hủy đặt phòng
                </Text>

                {selectedBooking && (
                  <View className="mb-6">
                    <Text className="text-gray-700 mb-1">
                      Phòng: {selectedBooking.room_code}
                    </Text>
                    <Text className="text-gray-700 mb-1">
                      Ngày: {formatDate(selectedBooking.booking_date)}
                    </Text>
                    <Text className="text-gray-700 mb-1">
                      Thời gian: {formatTime(selectedBooking.start_time)} -{" "}
                      {formatTime(selectedBooking.end_time)}
                    </Text>
                  </View>
                )}

                <View className="flex-row justify-between">
                  <TouchableOpacity
                    className="bg-gray-300 rounded-lg py-3 px-6"
                    onPress={() => setShowConfirmModal(false)}
                  >
                    <Text className="text-center font-medium">Quay lại</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-red-600 rounded-lg py-3 px-6"
                    onPress={confirmCancelBooking}
                  >
                    <Text className="text-center font-medium text-white">
                      Xác nhận hủy
                    </Text>
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
