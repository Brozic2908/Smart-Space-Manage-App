import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { authService } from "@/services";

export default function HomeLayout() {
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
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
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
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
