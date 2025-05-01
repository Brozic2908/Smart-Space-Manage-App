// hooks/useRooms.ts
import { useEffect, useState } from "react";
import {
  rooms as roomsData,
  Room,
  TimeSlot,
  timeSlots as timeSlotsData,
} from "../constants/rooms";

export const useRooms = (roomType?: string) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      // Simulate API call with timeout
      setTimeout(() => {
        const filteredRooms =
          roomType && roomType !== "All"
            ? roomsData.filter((room) => room.type === roomType)
            : roomsData;

        setRooms(filteredRooms);
        setLoading(false);
      }, 400);
    } catch (err) {
      setError("Failed to fetch rooms");
      setLoading(false);
    }
  }, [roomType]);

  return { rooms, loading, error };
};

export const useRoom = (roomId: string) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      // Simulate API call with timeout
      setTimeout(() => {
        const foundRoom = roomsData.find((r) => r.id === roomId) || null;
        setRoom(foundRoom);
        setTimeSlots(timeSlotsData);
        setLoading(false);
      }, 400);
    } catch (err) {
      setError("Failed to fetch room details");
      setLoading(false);
    }
  }, [roomId]);

  return { room, timeSlots, loading, error };
};
