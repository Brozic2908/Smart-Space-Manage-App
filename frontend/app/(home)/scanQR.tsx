// app/(home)/scanQR.tsx
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  AppState,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

export default function ScanQR() {
  const router = useRouter();
  const isFocused = useIsFocused(); // Check if screen is focused
  const [scanned, setScanned] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false); // Prevent multiple scans
  const appState = useRef(AppState.currentState); // Track app state
  const cameraRef = useRef(null);
  let isPermissionGranted = Boolean(permission?.granted);

  // Reset state when screen comes into focus
  useEffect(() => {
    if (isFocused) {
      setScanned(false);
      qrLock.current = false;
    }
  }, [isFocused]);

  // Request camera permission on mount
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      await requestPermission();
    };

    getBarCodeScannerPermissions();
  }, []);

  // Handle app state changes
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // Reset lock and scanned state when app becomes active
        qrLock.current = false;
        setScanned(false);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (qrLock.current || !isFocused) return;
    setScanned(true);
    qrLock.current = true; // Lock scanning
    console.log("QR code scanned:", type, data);

    // In a real app, you would validate the QR code data format
    // For this example, we'll assume the QR code contains a room ID
    try {
      // Check if data is a valid room ID format (e.g., H6-901)
      if (/^H\d+-\d+$/.test(data)) {
        router.push(`/(room)/${data}`);
      } else {
        alert(`Invalid QR code: ${data}`);
        // Reset to scan again
        setTimeout(() => {
          setScanned(false);
          qrLock.current = false;
        }, 2000);
      }
    } catch (error) {
      console.error("Error processing QR code", error);
      alert("Could not process QR code. Please try again.");
      setTimeout(() => {
        setScanned(false);
        qrLock.current = false;
      }, 2000);
    }
  };

  const toggleTorch = async () => {
    setTorchOn(!torchOn);
  };

  if (permission === null) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Đang kiểm tra quyền truy cập camera...</Text>
      </View>
    );
  }

  if (isPermissionGranted === false) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-gray-100">
        <Ionicons name="camera" size={60} color="#6B7280" />
        <Text className="text-center text-lg mt-4 mb-4">
          Cần quyền truy cập camera để quét mã QR
        </Text>
        <Pressable
          onPress={requestPermission}
          className="bg-blue-700 py-3 px-6 rounded-lg"
        >
          <Text className="text-white font-medium">Cấp quyền</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <View className="flex-1 bg-black/50">
        <StatusBar style="light" />

        {isFocused && (
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFillObject}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            enableTorch={torchOn}
          />
        )}
      </View>

      <View className="absolute top-20 left-5 z-10">
        <TouchableOpacity
          className="p-2 bg-black/30 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="absolute top-20 right-5 z-10">
        <TouchableOpacity
          className="p-2 bg-black/30 rounded-full"
          onPress={toggleTorch}
        >
          <Ionicons
            name={torchOn ? "flash" : "flash-off"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <View className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex-1 justify-center items-center bg-transparent">
        <View className="w-64 h-64 border-white/70 rounded-lg">
          {/* QR Code Frame */}
          <View className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white" />
          <View className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white" />
          <View className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white" />
          <View className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white" />
        </View>

        <View className="bg-primary py-2 rounded-lg mt-10">
          <Text className="text-white text-lg text-center px-6">
            Đặt mã QR vào khung để quét
          </Text>
        </View>
        {scanned && (
          <TouchableOpacity
            className="mt-8 bg-blue-700 py-3 px-6 rounded-lg"
            onPress={() => {
              setScanned(false);
              qrLock.current = false;
            }}
          >
            <Text className="text-white font-medium">Quét lại</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
