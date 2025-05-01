import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import {
  Image,
  Platform,
  Touchable,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeLayout() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace("/(auth)");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          height: 70,
          paddingBottom: 5,
          paddingTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="booked"
        options={{
          title: "Booking",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanQR"
        options={{
          tabBarButton: ({ onPress }) => (
            <TouchableOpacity
              onPress={onPress}
              activeOpacity={1}
              style={{
                top: -16,
                justifyContent: "center",
                alignItems: "center",
                ...Platform.select({
                  ios: {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.12,
                    shadowRadius: 5,
                  },
                  android: {
                    elevation: 5,
                  },
                }),
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 35,
                  backgroundColor: "#073E7E", // Tailwind blue-600
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="qr-code-scanner" size={36} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default behavior
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Tabs>
  );
}
