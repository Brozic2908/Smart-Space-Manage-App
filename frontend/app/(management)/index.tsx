// (admin)/index.tsx
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import reportService from "@/services/reportService";
import { isValid } from "date-fns";

// Type definition for the report data from API
type ReportData = {
  year: number;
  month: number;
  total_bookings: number;
  total_completed: number;
  total_cancelled: number;
  total_rooms: number;
};

const DashboardCard = ({
  title,
  icon,
  count,
  onPress,
  isLoading = false,
}: any) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 shadow-lg flex-1 m-2"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
      onPress={onPress}
    >
      <View className="flex-row justify-between items-center mb-3">
        <View
          className="w-12 h-12 rounded-full justify-center items-center"
          style={{ backgroundColor: "#EFF6FF" }}
        >
          <Ionicons name={icon} size={24} color="#2563EB" />
        </View>
        {isLoading ? (
          <ActivityIndicator size={"small"} color="#2563EB" />
        ) : (
          <Text className="text-blue-600 text-lg font-bold">{count}</Text>
        )}
      </View>
      <Text className="text-gray-800 font-medium text-base">{title}</Text>
    </TouchableOpacity>
  );
};

// Component for month picker
const MonthPicker = ({
  isVisible,
  onClose,
  selectedMonth,
  selectedYear,
  onSelect,
}: {
  isVisible: boolean;
  onClose: () => void;
  selectedMonth: number;
  selectedYear: number;
  onSelect: (month: number, year: number) => void;
}) => {
  const [month, setMonth] = useState(selectedMonth);
  const [year, setYear] = useState(selectedYear);

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];

  const handleSelect = () => {
    onSelect(month, year);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="bg-white rounded-t-xl p-4">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-gray-800">
                  Chọn tháng/năm
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="#64748b" />
                </TouchableOpacity>
              </View>

              <View className="mb-4">
                <Text className="text-gray-600 mb-2">Tháng:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 12 }}
                >
                  {months.map((monthName, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`px-4 py-2 mr-2 rounded-lg ${
                        month === index + 1 ? "bg-blue-600" : "bg-gray-100"
                      }`}
                      onPress={() => setMonth(index + 1)}
                    >
                      <Text
                        className={`${
                          month === index + 1 ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {monthName}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View className="mb-6">
                <Text className="text-gray-600 mb-2">Năm:</Text>
                <View className="flex-row">
                  {years.map((yr) => (
                    <TouchableOpacity
                      key={yr}
                      className={`px-4 py-2 mr-2 rounded-lg ${
                        year === yr ? "bg-blue-600" : "bg-gray-100"
                      }`}
                      onPress={() => setYear(yr)}
                    >
                      <Text
                        className={`${
                          year === yr ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {yr}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                className="bg-blue-700 rounded-lg py-3 flex-row justify-center items-center"
                onPress={handleSelect}
              >
                <Text className="text-white font-medium">Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default function index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get current month and year
  const date = new Date();
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(date.getFullYear());

  // State for month picker modal
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);

  const navigateTo = (screen: string) => {
    router.push(`/(management)/${screen}`);
  };

  useEffect(() => {
    // Fetch data when components mounts
    fetchDashboardData();
  }, []);

  // Updated to use selected month and year instead of current
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch report data
      const data = await reportService.getReport(selectedMonth, selectedYear);
      setReportData(data);
    } catch (err) {
      console.warn("Error fetching dashboard data:", err);
      setError("Không thể tải dữ liệu dashboard");
    } finally {
      setLoading(false);
    }
  };

  // Handle selection of month and year
  const handleMonthYearSelect = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedMonth, selectedYear]);

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <Image
        source={require("../../assets/images/bg.png")}
        className="absolute opacity-70"
        style={{ width: "100%" }}
        resizeMode="cover"
      />
      <View className="mt-24 mb-6">
        <Text className="text-center font-bold text-primary text-2xl">
          Dashboard
        </Text>
      </View>

      {loading && !reportData ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color="#2563EB" />
          <Text className="text-gray-600 mt-4">Đang tải dữ liệu ...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center px-4">
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text className="text-red-500 mt-4 text-center">{error}</Text>
          <TouchableOpacity
            className="mt-6 bg-blue-700 py-3 px-6 rounded-lg"
            onPress={fetchDashboardData}
          >
            <Text className="text-white font-medium">Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1 px-4">
          <View className="mt-4">
            <View className="flex-row flex-wrap">
              <DashboardCard
                title="Room List"
                icon="business-outline"
                isLoading={loading}
                count={reportData?.total_rooms}
                onPress={() => navigateTo("rooms")}
              />
              <DashboardCard
                title="History"
                icon="time-outline"
                isLoading={loading}
                count={reportData?.total_bookings}
                onPress={() => navigateTo("history")}
              />
            </View>
          </View>

          <View className="mt-6 mb-8 bg-white rounded-xl p-4 shadow-lg m-2">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-bold text-lg text-gray-800 mb-2">
                Monthly Stats
              </Text>
              <TouchableOpacity
                className={`flex-row items-center bg-blue-100 px-3 py-1 rounded-lg`}
                onPress={() => setMonthPickerVisible(true)}
              >
                <Text className="text-primary font-medium">
                  Tháng {selectedMonth} - {selectedYear}
                </Text>
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color="#073E7E"
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text className="text-gray-600">Total Rooms</Text>
              <Text className="font-medium">{reportData?.total_rooms}</Text>
            </View>

            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text className="text-gray-600">Total bookings</Text>
              <Text className="font-medium">{reportData?.total_bookings}</Text>
            </View>

            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text className="text-gray-600">Available Bookings</Text>
              <Text className="font-medium text-gray-600">
                {(reportData?.total_bookings || 0) -
                  (reportData?.total_cancelled || 0) -
                  (reportData?.total_completed || 0)}
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text className="text-gray-600">Completed Bookings</Text>
              <Text className="font-medium text-green-600">
                {reportData?.total_completed || 0}
              </Text>
            </View>

            <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
              <Text className="text-gray-600">Cancelled Bookings</Text>
              <Text className="font-medium text-red-600">
                {reportData?.total_cancelled || 0}
              </Text>
            </View>

            <TouchableOpacity
              className="bg-blue-700 rounded-lg py-3 flex-row justify-center items-center mx-2 "
              onPress={fetchDashboardData}
            >
              <Ionicons name="refresh-outline" size={18} color="white" />
              <Text className="text-white font-medium ml-2">
                Làm mới dữ liệu
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Month Year Picker Modal */}
      <MonthPicker
        isVisible={monthPickerVisible}
        onClose={() => setMonthPickerVisible(false)}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onSelect={handleMonthYearSelect}
      />
    </SafeAreaView>
  );
}
