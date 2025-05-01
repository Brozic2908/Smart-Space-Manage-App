import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Slot, useLocalSearchParams, useRouter } from "expo-router";
import { useRoom } from "@/hooks/useRooms";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import RoomDetail from "@/components/room/RoomDetail";
import { timeSlots } from "@/constants/rooms";

export default function RoomDetailScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const { room, loading, error } = useRoom(roomId || "");
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSelectedTime, setShowSelectedTime] = useState(false);

  const handleBookRoom = () => {
    setShowSelectedTime(true);
  };

  const handleSelectTime = (time: any) => {
    setSelectedTime(time);
  };

  const handleProceedToConfirm = () => {
    if (selectedTime) {
      setShowConfirmModal(true);
      setShowSelectedTime(false);
    }
  };

  const handleConfirmBooking = () => {
    // Here you would handle the actual booking process
    // For now, we'll just go back to the room list
    setShowConfirmModal(false);
    router.push("/(home)/booked"); // Redirect to the rooms list
  };

  const handleCloseSelectedTime = () => {
    setShowSelectedTime(false);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const changeTimeToString = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
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
        <RoomDetail room={room} loading={loading} />

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
            <Modal
              visible={showSelectedTime}
              transparent
              animationType="fade"
              onRequestClose={() => setShowSelectedTime(false)}
            >
              <TouchableWithoutFeedback
                onPress={() => setShowSelectedTime(false)}
              >
                <View className="flex-1 justify-center items-center bg-black/50">
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <View className="bg-white rounded-xl p-6 shadow-sm w-4/5">
                      <Text className="text-lg text-center font-bold mb-4">
                        Chọn khung giờ
                      </Text>
                      <View className="flex-row flex-wrap justify-center gap-4">
                        {timeSlots.map((slot) => (
                          <TouchableOpacity
                            className={`py-3 px-4 rounded-lg ${
                              selectedTime ===
                              changeTimeToString(slot.startTime, slot.endTime)
                                ? "bg-blue-600"
                                : slot.available
                                ? "bg-blue-500"
                                : "bg-gray-300"
                            }`}
                            key={slot.id}
                            disabled={!slot.available}
                            style={{ minWidth: 100 }}
                            onPress={() =>
                              handleSelectTime(
                                changeTimeToString(slot.startTime, slot.endTime)
                              )
                            }
                          >
                            <Text
                              className={`text-center font-medium ${
                                selectedTime ===
                                  changeTimeToString(
                                    slot.startTime,
                                    slot.endTime
                                  ) || slot.available
                                  ? "text-white"
                                  : "text-gray-500"
                              }`}
                            >
                              {slot.startTime} - {slot.endTime}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      <View className="mt-8">
                        <Button
                          title="Chọn khung giờ này"
                          onPress={handleProceedToConfirm}
                          variant="primary"
                          disabled={!selectedTime}
                          fullWidth
                          className={`py-3 ${
                            !selectedTime ? "opacity-50" : ""
                          }`}
                        />
                        <TouchableOpacity
                          className="bg-gray-300 rounded-lg py-3 px-6 mt-3"
                          onPress={handleCloseSelectedTime}
                        >
                          <Text className="text-center font-medium">
                            Quay lại
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

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
                  Phòng này hiện đang được sử dụng
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
                          Phòng: {room?.id}
                        </Text>
                        <Text className="text-gray-700 mb-1">
                          Type: {room?.type}
                        </Text>
                        <Text className="text-gray-700">
                          Thời gian: {selectedTime}
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
