import { Stack, useRouter } from "expo-router";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("auth_token");
      const role = await AsyncStorage.getItem("role");
      if (!token) {
        router.replace("/(auth)");
      } else if (role === "admin") {
        router.replace("/(management)");
      } else if (role === "it") {
        router.replace("/(it)");
      } else if (role === "technician") {
        router.replace("/(engineer)");
      } else {
        router.replace("/(home)");
      }
    };
    checkLogin();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#f5f5f5" },
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
