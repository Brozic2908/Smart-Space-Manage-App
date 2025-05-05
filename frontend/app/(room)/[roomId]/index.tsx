import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import RoomDetail from "@/components/room/RoomDetail";
import { bookingService } from "@/services";

// Định nghĩa interface cho Room
interface Room {
  id: number;
  room_code: string;
  room_type: string;
  location: string;
  status: string;
  sensor: string;
}

export default function RoomDetailScreen() {
  const params = useLocalSearchParams<{
    roomId: string;
    roomData: string;
    roomType: string;
    roomStatus: string;
    roomLocation: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
  }>();
  const router = useRouter();

  // Parse room data từ params
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Lấy thông tin phòng từ params ngay khi component được mount
  useEffect(() => {
    try {
      setLoading(true);

      // Nếu có roomData từ params, parse để lấy thông tin đầy đủ
      if (params.roomData) {
        const parsedRoom = JSON.parse(params.roomData);
        setRoom(parsedRoom);
      }
      // Nếu không có roomData nhưng có thông tin riêng lẻ, tạo object room từ các thông tin đó
      else if (params.roomId) {
        const reconstructedRoom: Room = {
          id: 0, // Giá trị mặc định
          room_code: params.roomId,
          room_type: params.roomType || "",
          location: params.roomLocation || "",
          status: params.roomStatus || "available",
          sensor: "active", // Giá trị mặc định
        };
        setRoom(reconstructedRoom);
      }
      // Nếu không có đủ thông tin
      else {
        setError("Không tìm thấy thông tin phòng");
      }
    } catch (err) {
      console.warn("Error parsing room data:", err);
      setError("Lỗi khi xử lý thông tin phòng");
    } finally {
      setLoading(false);
    }
  }, [
    params.roomData,
    params.roomId,
    params.roomType,
    params.roomLocation,
    params.roomStatus,
    params.bookingDate,
    params.startTime,
    params.endTime,
  ]);

  const handleBookRoom = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);

      if (!room) {
        setError("Không có thông tin phòng để đặt");
        return;
      }

      const data = {
        room_id: room.id,
        booking_date: params.bookingDate,
        start_time: params.startTime,
        end_time: params.endTime,
      };
      await bookingService.bookingRoom(data);
      setShowConfirmModal(false);
      router.push("/(home)/booked");
    } catch (error: any) {
      console.warn("Error booking room:", error);

      if (error.response && error.response.data && error.response.data.detail) {
        // Lỗi do backend trả về
        Alert.alert("Lỗi Đặt phòng", error.response.data.detail);
        setError(error.response.data.detail);
      } else {
        Alert.alert("Lỗi Đặt phòng", "Lỗi khi đặt phòng. Vui lòng thử lại sau");
        // Lỗi khác (mạng, không phản hồi, v.v.)
        setError("Lỗi khi đặt phòng. Vui lòng thử lại sau");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  // Chuyển đổi dữ liệu phòng từ API sang định dạng phù hợp với component RoomDetail
  const adaptRoomForDisplay = () => {
    if (!room) return null;

    return {
      id: room.room_code,
      type: room.room_type,
      status: room.status,
      location: room.location,
      bookingDate: params.bookingDate,
      startTime: params.startTime,
      endTime: params.endTime,
    };
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-blue-50">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">Đang tải...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !room) {
    return (
      <SafeAreaView className="flex-1 bg-blue-50">
        <Image
          source={require("../../../assets/images/bg.png")}
          className="absolute opacity-70"
          style={{ width: "100%" }}
          resizeMode="cover"
        />
        <View className="mt-20 pb-6 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => router.back()} className="ms-6">
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text className="text-center font-bold text-primary text-2xl">
            Chi tiết phòng
          </Text>
          <View className="me-10"></View>
        </View>
        <View className="p-4">
          <Text className="text-red-500 text-center">
            {error || "Không tìm thấy phòng"}
          </Text>
          <Button
            title="Quay lại"
            onPress={() => router.back()}
            variant="primary"
            className="mt-4 px-3 py-2"
          />
        </View>
      </SafeAreaView>
    );
  }

  const adaptedRoom = adaptRoomForDisplay();

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <Image
        source={require("../../../assets/images/bg.png")}
        className="absolute opacity-70"
        style={{ width: "100%" }}
        resizeMode="cover"
      />
      <View className="mt-20 pb-8 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()} className="ms-6">
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-center font-bold text-primary text-2xl">
          Chi tiết phòng
        </Text>
        <View className="me-10"></View>
      </View>

      <View className="flex-1">
        <RoomDetail room={adaptedRoom} loading={loading} />

        {!loading && room && (
          <View className="px-6">
            <Text className="text-gray-700 mb-3">
              Sinh viên vui lòng tuân thủ quy định sử dụng, giữ vệ sinh và bảo
              quản tài sản trong phòng. Sinh viên cần hoàn tất thủ tục đặt phòng
              và check-in đúng giờ.
            </Text>
            <Text className="text-red-500 mb-8">
              Lưu ý: Khi đăng ký tại cùng một thời gian chỉ đăng ký được một
              phòng duy nhất. Nếu đăng ký 2 phòng khác nhau cùng một khung giờ,
              hệ thống sẽ không nhận yêu cầu.
            </Text>

            {room.status === "available" ? (
              <Button
                title="Đặt phòng ngay"
                onPress={handleBookRoom}
                variant="primary"
                fullWidth
                className="py-3 text-2xl"
              />
            ) : (
              <View className="bg-gray-100 p-4 rounded-lg">
                <Text className="text-center text-gray-500">
                  {room.status === "in_use"
                    ? "Phòng này hiện đang được sử dụng"
                    : "Phòng này hiện đang bảo trì"}
                </Text>
              </View>
            )}

            {/* Confirmation Modal */}
            <Modal
              visible={showConfirmModal}
              transparent={true}
              animationType="fade"
              onRequestClose={handleCloseModal}
            >
              <TouchableWithoutFeedback
                onPress={() => setShowConfirmModal(false)}
              >
                <View className="flex-1 justify-center items-center bg-black/50">
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <View className="bg-white rounded-xl p-6 m-4 w-4/5">
                      <Text className="text-xl font-bold text-center mb-6">
                        Sinh viên vui lòng xác nhận để hoàn tất đặt phòng
                      </Text>

                      <View className="mb-6">
                        <Text className="text-gray-700 mb-1">
                          Phòng: {room.room_code}
                        </Text>
                        <Text className="text-gray-700 mb-1">
                          Loại phòng: {room.room_type}
                        </Text>
                        <Text className="text-gray-700 mb-1">
                          Vị trí: {room.location}
                        </Text>
                        <Text className="text-gray-700 mb-1">
                          Ngày đặt: {params.bookingDate}
                        </Text>
                        <Text className="text-gray-700 mb-1">
                          Bắt đầu: {params.startTime}
                        </Text>
                        <Text className="text-gray-700 mb-1">
                          Kết thúc: {params.endTime}
                        </Text>
                      </View>

                      <View className="flex-row justify-between">
                        <TouchableOpacity
                          className="bg-gray-300 rounded-lg py-3 px-6"
                          onPress={handleCloseModal}
                        >
                          <Text className="text-center font-medium">
                            Quay lại
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          className="bg-blue-600 rounded-lg py-3 px-6"
                          onPress={handleConfirmBooking}
                        >
                          <Text className="text-center font-medium text-white">
                            Xác nhận
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
