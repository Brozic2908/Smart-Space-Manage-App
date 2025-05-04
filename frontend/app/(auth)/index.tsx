import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { authService } from "@/services";

export default function signIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validate input fields
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Call login API
      const response = await authService.login(email, password);

      console.log("Login successful: ", response);

      // Navigate to home screen after successful login
      switch (response.role) {
        case "student":
        case "lecturer":
          router.replace("/(home)");
          break;
        case "admin":
          router.replace("/(management)");
          break;
        case "it":
          router.replace("/(it)");
          break;
        case "technician":
          router.replace("/(engineer)");
          break;
        default:
          break;
      }
    } catch (error: any) {
      // Handle login errors
      const errorMessage =
        error.response?.data?.detail?.[0]?.msg ||
        error.response?.data?.detail ||
        "Login failed. Please check your credentials and try again.";
      Alert.alert("Login Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    // Navigate to register screen
    router.push("/(auth)/register");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <Image
          source={require("../../assets/images/bg.png")}
          className="absolute opacity-70"
          style={{ width: "100%" }}
          resizeMode="cover"
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center px-6 py-5">
            <View className="items-center mt-[-6rem]">
              <View className="w-52 h-52 flex-row justify-center items-center">
                <Image
                  source={require("../../assets/images/logoBK.png")}
                  className="w-full h-full"
                  style={{ width: 180, height: 180 }}
                  resizeMode="cover"
                />
              </View>
              <Text className="text-3xl font-bold text-primary">
                Welcome Back!
              </Text>
              <Text className="text-lg text-gray-500 mt-2">
                Sign in to continue
              </Text>
            </View>

            <View className="mt-8">
              <View className="mb-5">
                <Text className="text-lg font-semibold text-gray-700 mb-2">
                  Email
                </Text>
                <TextInput
                  className="h-12 px-4 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="your@email.com"
                  placeholderTextColor={"#6B7280"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  editable={!loading}
                />
              </View>

              <View className="mb-5">
                <Text className="text-lg font-semibold text-gray-700 mb-2">
                  Password
                </Text>
                <View className="flex-row items-center border border-gray-300 rounded-lg bg-gray-50">
                  <TextInput
                    className="flex-1 h-12 px-4"
                    placeholder="••••••••"
                    placeholderTextColor={"#6B7280"}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    className="px-4"
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                    disabled={loading}
                  >
                    <Text>
                      <Ionicons
                        name={`${
                          secureTextEntry ? "eye-off-outline" : "eye-outline"
                        }`}
                        size={20}
                        color="black"
                      />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              className={`${
                loading ? "bg-blue-500" : "bg-blue-700"
              } h-14 rounded-lg justify-center items-center mt-2 shadow-lg`}
              style={{
                shadowColor: "#022f6c",
                shadowOffset: { width: 4, height: 4 },
                elevation: 5,
              }}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text className="text-white text-lg font-bold">Login</Text>
              )}
            </TouchableOpacity>
            <Text className="text-lg text-center text-gray-500 mt-6">
              If you don't have an account,
            </Text>
            <View className="flex-row justify-center">
              <Text className="text-lg text-gray-500 me-2">You can</Text>
              <TouchableOpacity onPress={navigateToRegister} disabled={loading}>
                <Text className="text-primary font-bold text-lg">
                  Register here!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
