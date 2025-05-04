import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Mock user data based on the database schema provided
const mockUsers: User[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Nguyen Van An",
    email: "an.nguyen@hcmut.edu.vn",
    role: "student",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Tran Thi Binh",
    email: "binh.tran@hcmut.edu.vn",
    role: "student",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Le Minh Cuong",
    email: "cuong.le@hcmut.edu.vn",
    role: "lecturer",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Pham Thi Dung",
    email: "dung.pham@hcmut.edu.vn",
    role: "lecturer",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Hoang Van Em",
    email: "em.hoang@hcmut.edu.vn",
    role: "admin",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Vo Thi Giang",
    email: "giang.vo@hcmut.edu.vn",
    role: "it",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Lam Van Hai",
    email: "hai.lam@hcmut.edu.vn",
    role: "technician",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "Nguyen Thi Khanh",
    email: "khanh.nguyen@hcmut.edu.vn",
    role: "student",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    name: "Tran Van Lam",
    email: "lam.tran@hcmut.edu.vn",
    role: "student",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    name: "Le Thi Mai",
    email: "mai.le@hcmut.edu.vn",
    role: "lecturer",
  },
];
// Define UserRole type
type UserRole = "student" | "lecturer" | "admin" | "it" | "technician";

// Define User type
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export default function it() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleChangeRole = (user: User) => {
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setShowDeleteConfirm(false);
      // TODO: In a real app, you would make an API call to delete the user
      Alert.alert("Thành công", "Đã xóa tài khoản người dùng");
    }
  };

  const saveNewRole = (newRole: UserRole) => {
    if (selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
      setShowRoleModal(false);
      // TODO: In a real app, you would make an API call to update the user's role
      Alert.alert("Thành công", "Đã thay đổi vai trò của người dùng");
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "student":
        return "Sinh viên";
      case "lecturer":
        return "Giảng viên";
      case "admin":
        return "Ban quản lý";
      case "it":
        return "Nhân viên IT";
      case "technician":
        return "Kỹ thuật viên";
      default:
        return role;
    }
  };

  const getRoleIconName = (role: string) => {
    switch (role) {
      case "student":
        return "school-outline";
      case "lecturer":
        return "business-outline";
      case "admin":
        return "shield-outline";
      case "it":
        return "code-outline";
      case "technician":
        return "build-outline";
      default:
        return "person-outline";
    }
  };

  const getRoleIconColor = (role: string) => {
    switch (role) {
      case "student":
        return "#3B82F6"; // blue
      case "lecturer":
        return "#10B981"; // green
      case "admin":
        return "#6366F1"; // indigo
      case "it":
        return "#8B5CF6"; // purple
      case "technician":
        return "#F59E0B"; // amber
      default:
        return "#6B7280"; // gray
    }
  };

  // Available roles option
  const roleOptions: Array<UserRole> = [
    "student",
    "lecturer",
    "admin",
    "it",
    "technician",
  ];

  const renderUserItem = ({ item }: { item: User }) => (
    <View className="bg-white rounded-lg shadow-sm mb-3 p-4">
      <View className="flex-row justify-between">
        <View className="flex-1">
          <View className="flex-row items-center">
            <View
              className={`w-12 h-12 rounded-full justify-center items-center mr-3`}
              style={{ backgroundColor: `${getRoleIconColor(item.role)}20` }} // 20 for opacity
            >
              <Ionicons
                name={getRoleIconName(item.role)}
                size={24}
                color={getRoleIconColor(item.role)}
              />
            </View>

            <View className="flex-1">
              <Text className="text-lg font-medium">{item.name}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="mail-outline" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">{item.email}</Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Ionicons name="person-outline" size={16} color="#6B7280" />
                <Text className="text-gray-600 ml-2">
                  {getRoleDisplayName(item.role)}
                </Text>
              </View>
            </View>
            <View className="justify-around">
              <TouchableOpacity
                className="p-[0.6rem] bg-blue-100 rounded-full mb-2"
                onPress={() => handleChangeRole(item)}
              >
                <Ionicons
                  name="swap-vertical-outline"
                  size={18}
                  color="#2563EB"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-[0.6rem] bg-red-100 rounded-full"
                onPress={() => handleDeleteUser(item)}
              >
                <Ionicons name="trash-outline" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
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
          Quản lý người dùng
        </Text>
      </View>

      {/* Display */}
      <View className="flex-1 px-4">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"} color="#2563EB" />
          </View>
        ) : users.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.id}
            data={users}
            renderItem={renderUserItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="people-outline" size={64} color="#CBD5E1" />
            <Text className="text-gray-400 mb-4 text-center">
              Không tìm thấy tài khoản nào
            </Text>
          </View>
        )}
      </View>

      {/* Change Role Modal */}
      <Modal
        visible={showRoleModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRoleModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowRoleModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="bg-white rounded-xl w-11/12 p-5">
                <Text className="text-xl font-bold text-center mb-4 text-primary">
                  Thay đổi vai trò
                </Text>

                {selectedUser && (
                  <View>
                    <Text className="text-gray-600 mb-2">
                      Tài khoản:{" "}
                      <Text className="font-bold mb-2 text-primary">
                        {selectedUser.name}
                      </Text>
                    </Text>
                    <Text className="text-gray-600 mb-4">
                      Vài trò hiện tại:{" "}
                      <Text className="font-bold mb-2 text-primary">
                        {getRoleDisplayName(selectedUser.role)}
                      </Text>
                    </Text>

                    <Text className="text-gray-700 font-medium mb-2">
                      Chọn vai trò mới:
                    </Text>
                    <View className="mb-4">
                      {roleOptions.map((role) => (
                        <TouchableOpacity
                          className={`flex-row items-center p-3 border-b border-gray-100 ${
                            selectedUser.role === role ? "bg-blue-50" : ""
                          }`}
                          onPress={() => saveNewRole(role)}
                        >
                          <View
                            className="w-8 h-8 rounded-full justify-center items-center mr-3"
                            style={{
                              backgroundColor: `${getRoleIconColor(role)}20`,
                            }}
                          >
                            <Ionicons
                              name={getRoleIconName(role)}
                              size={16}
                              color={getRoleIconColor(role)}
                            />
                          </View>
                          <Text className="flex-1">
                            {getRoleDisplayName(role)}
                          </Text>
                          {selectedUser.role === role && (
                            <Ionicons
                              name="checkmark"
                              size={20}
                              color={"#2563EB"}
                            />
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>

                    <View className="flex-row justify-end mt-2">
                      <TouchableOpacity
                        className="bg-gray-300 rounded-lg py-2 px-4 mr-3"
                        onPress={() => setShowRoleModal(false)}
                      >
                        <Text className="text-gray-700">Hủy</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Delete confirm Modal */}
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
                  Xác nhận xóa tài khoản
                </Text>

                {selectedUser && (
                  <Text className="text-gray-600 text-center mb-4">
                    Bạn có chắc chắn muốn xóa tài khoản của{" "}
                    <Text className="font-bold text-red-500">
                      {selectedUser.name}
                    </Text>
                    ? Hành động này không thể hoàn tác.
                  </Text>
                )}

                <View className="flex-row justify-center space-x-3">
                  <TouchableOpacity
                    className="bg-gray-200 rounded-lg py-2 px-4 mr-2"
                    onPress={() => setShowDeleteConfirm(false)}
                  >
                    <Text className="text-gray-700">Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-500 rounded-lg py-2 px-4"
                    onPress={confirmDeleteUser}
                  >
                    <Text className="text-white">Xác nhận</Text>
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
