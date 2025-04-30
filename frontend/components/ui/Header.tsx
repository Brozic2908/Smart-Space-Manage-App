// components/ui/Header.tsx
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const Header = ({
  title,
  showBackButton = false,
  rightIcon,
  onRightIconPress,
}: HeaderProps) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between p-4 bg-white">
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        )}
        <Text className="text-lg font-bold text-gray-800">{title}</Text>
      </View>

      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress}>
          <Ionicons name={rightIcon as any} size={24} color="#333" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
