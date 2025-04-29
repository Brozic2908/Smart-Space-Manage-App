// app/(home)/scanQR.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ScanQRScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [torchOn, setTorchOn] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);

    // In a real app, you would validate the QR code data format
    // For this example, we'll assume the QR code contains a room ID
    try {
      // Check if data is a valid room ID format (e.g., H6-901)
      if (/^H\d+-\d+$/.test(data)) {
        router.push(`/(room)/${data}`);
      } else {
        alert(`Invalid QR code: ${data}`);
        // Reset to scan again
        setTimeout(() => setScanned(false), 2000);
      }
    } catch (error) {
      console.error("Error processing QR code", error);
      alert("Could not process QR code. Please try again.");
      setTimeout(() => setScanned(false), 2000);
    }
  };

  const toggleTorch = () => {
    setTorchOn(!torchOn);
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg">Đang yêu cầu quyền truy cập camera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-gray-100">
        <Ionicons name="camera" size={60} color="#6B7280" />
        <Text className="text-center text-lg mt-4 mb-4">
          Cần quyền truy cập camera để quét mã QR
        </Text>
        <TouchableOpacity
          className="bg-blue-700 py-3 px-6 rounded-lg"
          onPress={() => Camera.requestCameraPermissionsAsync()}
        >
          <Text className="text-white font-medium">Cấp quyền</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      {/* <Camera
        style={StyleSheet.absoluteFillObject}
        type={Camera.Constants.Type.back}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        flashMode={
          torchOn
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off
        } */}
      {/* /> */}

      <View className="absolute top-12 left-5 z-10">
        <TouchableOpacity
          className="p-2 bg-black/30 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="absolute top-12 right-5 z-10">
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

      <View className="flex-1 justify-center items-center">
        <View className="w-64 h-64 border-2 border-white/70 rounded-lg">
          {/* QR Code Frame */}
          <View className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white" />
          <View className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white" />
          <View className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white" />
          <View className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white" />
        </View>

        <Text className="text-white text-lg mt-6 text-center px-6">
          Đặt mã QR vào khung để quét
        </Text>

        {scanned && (
          <TouchableOpacity
            className="mt-8 bg-blue-700 py-3 px-6 rounded-lg"
            onPress={() => setScanned(false)}
          >
            <Text className="text-white font-medium">Quét lại</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
