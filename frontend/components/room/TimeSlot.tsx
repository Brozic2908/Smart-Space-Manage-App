// components/room/TimeSlot.tsx
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TimeSlot as TimeSlotType } from "@/constants/rooms";

type TimeSlotProps = {
  timeSlot: TimeSlotType;
  selected: boolean;
  onSelect: (timeSlot: TimeSlotType) => void;
};

export default function TimeSlot({
  timeSlot,
  selected,
  onSelect,
}: TimeSlotProps) {
  return (
    <TouchableOpacity
      className={`p-4 rounded-lg mb-2 ${
        selected
          ? "bg-blue-600"
          : timeSlot.available
          ? "bg-blue-100"
          : "bg-gray-200"
      }`}
      disabled={!timeSlot.available}
      onPress={() => {
        onSelect(timeSlot);
      }}
    >
      <Text
        className={`text-center ${
          selected
            ? "text-white font-semibold"
            : timeSlot.available
            ? "text-blue-800"
            : "text-gray-500"
        }`}
      >
        {timeSlot.startTime} - {timeSlot.endTime}
      </Text>
    </TouchableOpacity>
  );
}
