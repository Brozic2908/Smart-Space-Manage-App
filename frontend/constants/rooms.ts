// constants/rooms.ts
export type Room = {
  id: string;
  type: "Mentoring" | "Group" | "Personal";
  available: boolean;
  building?: string;
  floor?: string;
  capacity?: number;
};

export type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
};

// Mock data
export const rooms: Room[] = [
  {
    id: "H6-901",
    type: "Mentoring",
    available: true,
    building: "H6",
    floor: "9",
    capacity: 10,
  },
  {
    id: "H8-301",
    type: "Group",
    available: true,
    building: "H8",
    floor: "3",
    capacity: 20,
  },
  {
    id: "H3-806",
    type: "Group",
    available: true,
    building: "H3",
    floor: "8",
    capacity: 15,
  },
  {
    id: "H6-902",
    type: "Mentoring",
    available: true,
    building: "H6",
    floor: "9",
    capacity: 8,
  },
  {
    id: "H8-305",
    type: "Group",
    available: true,
    building: "H8",
    floor: "3",
    capacity: 25,
  },
  {
    id: "H3-906",
    type: "Group",
    available: true,
    building: "H3",
    floor: "9",
    capacity: 15,
  },
  {
    id: "H2-609",
    type: "Personal",
    available: false,
    building: "H2",
    floor: "6",
    capacity: 4,
  },
  {
    id: "H1-001",
    type: "Personal",
    available: true,
    building: "H1",
    floor: "0",
    capacity: 2,
  },
];

export const timeSlots: TimeSlot[] = [
  { id: "1", startTime: "07:00", endTime: "08:30", available: true },
  { id: "2", startTime: "08:30", endTime: "10:00", available: true },
  { id: "3", startTime: "10:00", endTime: "11:30", available: true },
  { id: "4", startTime: "11:30", endTime: "13:00", available: true },
  { id: "5", startTime: "13:00", endTime: "14:30", available: true },
  { id: "6", startTime: "14:30", endTime: "16:00", available: false },
];
