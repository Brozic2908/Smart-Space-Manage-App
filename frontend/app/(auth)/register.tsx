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
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);

  const handleRegister = () => {
    // Validate fields
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Check password strength (minimum 8 characters)
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    console.log("Register pressed with: ", fullName, email, password);
    // TODO: thêm api đăng ký tài khoản

    // Redirect to login after successful registration
    Alert.alert("Success", "Account created successfully!", [
      {
        text: "OK",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  const navigateToLogin = () => {
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require("../../assets/images/bg.png")}
            className="absolute opacity-70"
            style={{ width: "100%" }}
            resizeMode="cover"
          />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 px-6 py-5">
              <View className="items-center">
                <Text className="text-3xl font-bold  text-primary mt-24">
                  Create Account
                </Text>
                <Text className="text-lg text-gray-500 mt-2">
                  Sign up to get started
                </Text>
              </View>

              <View className="mt-6">
                <View className="mb-4">
                  <Text className="text-lg font-semibold text-gray-700 mb-2">
                    Full Name
                  </Text>
                  <TextInput
                    className="h-12 px-4 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Enter your full name"
                    placeholderTextColor={"#6B7280"}
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>

                <View className="mb-4">
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
                  />
                </View>

                <View className="mb-4">
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
                    />
                    <TouchableOpacity
                      className="px-4"
                      onPress={() => setSecureTextEntry(!secureTextEntry)}
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
                  <Text className="text-xs text-gray-500 mt-1 ml-1">
                    Password must be at least 8 characters
                  </Text>
                </View>

                <View className="mb-4">
                  <Text className="text-lg font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </Text>
                  <View className="flex-row items-center border border-gray-300 rounded-lg bg-gray-50">
                    <TextInput
                      className="flex-1 h-12 px-4"
                      placeholder="••••••••"
                      placeholderTextColor={"#6B7280"}
                      secureTextEntry={confirmSecureTextEntry}
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                      className="px-4"
                      onPress={() =>
                        setConfirmSecureTextEntry(!confirmSecureTextEntry)
                      }
                    >
                      <Text>
                        <Ionicons
                          name={`${
                            confirmSecureTextEntry
                              ? "eye-off-outline"
                              : "eye-outline"
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
                className="bg-blue-700 h-14 rounded-lg justify-center items-center mt-4 shadow-lg"
                style={{
                  shadowColor: "#022f6c",
                  shadowOffset: { width: 4, height: 4 },
                  elevation: 5,
                }}
                onPress={handleRegister}
              >
                <Text className="text-white text-lg font-bold">Register</Text>
              </TouchableOpacity>

              <View className="flex-row justify-center mt-6 text-lg">
                <Text className="text-gray-500 text-lg">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text className="text-primary font-bold text-lg">
                    Login Here!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
