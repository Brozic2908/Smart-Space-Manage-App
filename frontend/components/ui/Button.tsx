// components/ui/Button.tsx
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
}: ButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-700 text-white";
      case "secondary":
        return "bg-gray-200 text-gray-800";
      case "outline":
        return "bg-transparent border border-blue-700 text-blue-700";
      default:
        return "bg-blue-700 text-white";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-2 px-4 text-sm";
      case "md":
        return "py-3 px-6 text-base";
      case "lg":
        return "py-4 px-8 text-lg";
      default:
        return "py-3 px-6 text-base";
    }
  };

  return (
    <TouchableOpacity
      className={`rounded-lg justify-center items-center ${getVariantClasses()} ${getSizeClasses} ${
        fullWidth ? "w-full" : ""
      } ${disabled ? "opacity-50" : ""} ${className}`}
      onPress={onPress}
      disabled={disabled || loading}
      style={styles.button}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "white" : "#2563eb"}
        />
      ) : (
        <Text
          className={`font-bold ${
            variant === "primary" ? "text-white" : "text-blue-700"
          }`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    shadowColor: "#022f6c",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default Button;
