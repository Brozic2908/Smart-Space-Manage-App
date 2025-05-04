import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import RoomCard from "@/components/ui/RoomCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import api from "@/services/api";

// Định nghĩa interface cho Room từ API
interface Room {
  id: number;
  room_code: string;
  room_type: string;
  location: string;
  status: string;
  sensor: string;
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Form state
  const [bookingDate, setBookingDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(
    new Date(new Date().setHours(new Date().getHours() + 3))
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Set initial times
  useEffect(() => {
    // Set start time to current hour
    const start = new Date();
    start.setMinutes(0);
    start.setSeconds(0);
    setStartTime(start);

    // Set end time to 3 hours later
    const end = new Date(start);
    end.setHours(end.getHours() + 3);
    setEndTime(end);
  }, []);

  // Filter rooms based on active tab
  useEffect(() => {
    if (rooms.length > 0) {
      if (activeTab === "All") {
        setFilteredRooms(rooms);
      } else {
        const filtered = rooms.filter(
          (room) => room.room_type.toLowerCase() === activeTab.toLowerCase()
        );
        setFilteredRooms(filtered);
      }
    }
  }, [activeTab, rooms]);

  const fetchAvailableRooms = async () => {
    try {
      setLoading(true);
      setError(null);

      // Format date and times for API
      const formattedDate = format(bookingDate, "yyyy-MM-dd");
      const formattedStartTime = format(startTime, "HH:mm");
      const formattedEndTime = format(endTime, "HH:mm");

      // Make API call
      const response = await api.get(
        `/room/?booking_date=${formattedDate}&start_time=${formattedStartTime}&end_time=${formattedEndTime}`
      );

      setRooms(response.data);
      setFilteredRooms(
        activeTab === "All"
          ? response.data
          : response.data.filter(
              (room: Room) =>
                room.room_type.toLowerCase() === activeTab.toLowerCase()
            )
      );
      setFormSubmitted(true);
    } catch (err: any) {
      console.error("Error fetching rooms:", err);
      setError(err.message || "Không thể tải danh sách phòng");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setBookingDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event: any, selectedTime?: Date) => {
    setShowStartTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setStartTime(selectedTime);

      // If end time is before or equal to start time, set end time to start time + 1 hour
      if (selectedTime >= endTime) {
        const newEndTime = new Date(selectedTime);
        newEndTime.setHours(selectedTime.getHours() + 1);
        setEndTime(newEndTime);
      }
    }
  };

  const handleEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      // Only allow end time to be after start time
      if (selectedTime > startTime) {
        setEndTime(selectedTime);
      } else {
        // If invalid selection, set end time to start time + 1 hour
        const newEndTime = new Date(startTime);
        newEndTime.setHours(startTime.getHours() + 1);
        setEndTime(newEndTime);
      }
    }
  };

  const renderRoomCard = ({ item }: { item: Room }) => (
    <RoomCard
      id={item.room_code}
      type={item.room_type}
      status={item.status}
      location={item.location}
      roomData={item} // Truyền toàn bộ đối tượng room data
      bookingDate={format(bookingDate, "yyyy-MM-dd")}
      startTime={format(startTime, "HH:mm")}
      endTime={format(endTime, "HH:mm")}
    />
  );

  return (
    <View className="flex-1 bg-blue-50">
      <Image
        source={require("../../assets/images/bg.png")}
        className="absolute opacity-70"
        style={{ width: "100%" }}
        resizeMode="cover"
      />
      <View className="mt-16 pb-4"></View>

      {!formSubmitted ? (
        <View className="px-4 py-6 bg-white mx-4 rounded-xl shadow-sm mt-20">
          <Text className="text-lg font-medium text-gray-800 mb-4">
            Chọn thời gian đặt phòng
          </Text>

          {/* Date Picker */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Ngày</Text>
            <TouchableOpacity
              className="flex-row justify-between items-center border border-gray-300 p-3 rounded-lg"
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{format(bookingDate, "dd/MM/yyyy")}</Text>
              <Text className="text-blue-600">Chọn</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={bookingDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          {/* Start Time Picker */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Giờ bắt đầu</Text>
            <TouchableOpacity
              className="flex-row justify-between items-center border border-gray-300 p-3 rounded-lg"
              onPress={() => setShowStartTimePicker(true)}
            >
              <Text>{format(startTime, "HH:mm")}</Text>
              <Text className="text-blue-600">Chọn</Text>
            </TouchableOpacity>
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                display="default"
                onChange={handleStartTimeChange}
                minuteInterval={30}
              />
            )}
          </View>

          {/* End Time Picker */}
          <View className="mb-4">
            <Text className="text-gray-600 mb-2">Giờ kết thúc</Text>
            <TouchableOpacity
              className="flex-row justify-between items-center border border-gray-300 p-3 rounded-lg"
              onPress={() => setShowEndTimePicker(true)}
            >
              <Text>{format(endTime, "HH:mm")}</Text>
              <Text className="text-blue-600">Chọn</Text>
            </TouchableOpacity>
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                display="default"
                onChange={handleEndTimeChange}
                minuteInterval={30}
              />
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-blue-700 py-3 rounded-lg mt-2"
            onPress={fetchAvailableRooms}
          >
            <Text className="text-white font-semibold text-center">
              Tìm phòng
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Room type tabs */}
          <View className="flex-row justify-center px-4 pb-3">
            {["All", "Mentoring", "Group", "Individual"].map((tab) => (
              <TouchableOpacity
                key={tab}
                className={`p-3 pb-1 ${
                  activeTab === tab
                    ? "border-b-[3px] border-primary"
                    : "border-b-[1px] border-gray-400"
                }`}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  className={`text-lg ${
                    activeTab === tab
                      ? "text-primary font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Show room booking info */}
          <View className="px-4 py-2 bg-blue-100 mx-4 mb-2 rounded-lg">
            <Text className="text-blue-800 text-center">
              {format(bookingDate, "dd/MM/yyyy")} • {format(startTime, "HH:mm")}{" "}
              - {format(endTime, "HH:mm")}
            </Text>
            <TouchableOpacity
              className="mt-1"
              onPress={() => setFormSubmitted(false)}
            >
              <Text className="text-blue-700 text-center font-medium">
                Thay đổi
              </Text>
            </TouchableOpacity>
          </View>

          {/* Room list */}
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#2563eb" />
            </View>
          ) : error ? (
            <View className="flex-1 justify-center items-center p-4">
              <Text className="text-red-500 text-center">{error}</Text>
              <TouchableOpacity
                className="mt-4 bg-blue-700 py-2 px-4 rounded-lg"
                onPress={fetchAvailableRooms}
              >
                <Text className="text-white font-medium">Thử lại</Text>
              </TouchableOpacity>
            </View>
          ) : filteredRooms.length === 0 ? (
            <View className="flex-1 justify-center items-center p-4">
              <Text className="text-gray-600 text-center">
                Không tìm thấy phòng trống với tiêu chí đã chọn
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredRooms}
              renderItem={renderRoomCard}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ padding: 16 }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </View>
  );
}
