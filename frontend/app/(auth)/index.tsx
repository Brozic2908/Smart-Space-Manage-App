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
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function signIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = () => {
    console.log("Login pressed with: ", email, password);
    // TODO: thêm login đăng nhập
    router.replace("/(home)");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center px-6 py-5">
            <View className="items-center mt-[-4rem]">
              <View className="w-24 h-24 mb-2">
                <Image
                  source={require("../../assets/images/logoBK.png")}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-3xl font-bold text-gray-800">
                Welcome Back
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
                  />
                  <TouchableOpacity
                    className="px-4"
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                  >
                    <Text>
                      {secureTextEntry ? (
                        <Ionicons name="eye-outline" size={20} color="black" />
                      ) : (
                        <Ionicons
                          name="eye-off-outline"
                          size={20}
                          color="black"
                        />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              className="bg-blue-700 h-14 rounded-lg justify-center items-center mt-2 shadow-lg"
              style={{
                shadowColor: "#022f6c",
                shadowOffset: { width: 4, height: 4 },
                elevation: 5,
              }}
              onPress={handleLogin}
            >
              <Text className="text-white text-lg font-bold">Login</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
