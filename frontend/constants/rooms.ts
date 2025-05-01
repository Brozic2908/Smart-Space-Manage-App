// constants/rooms.ts
export type Room = {
  id: string;
  type: "Mentoring" | "Group" | "Personal";
  status: string;
  location?: string;
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
    status: "available",
    location: "H6",
  },
  {
    id: "H8-301",
    type: "Group",
    status: "available",
    location: "H8",
  },
  {
    id: "H3-806",
    type: "Group",
    status: "available",
    location: "H3",
  },
  {
    id: "H6-902",
    type: "Mentoring",
    status: "in_use",
    location: "H6",
  },
  {
    id: "H8-305",
    type: "Group",
    status: "available",
    location: "H8",
  },
  {
    id: "H3-906",
    type: "Group",
    status: "maintenance",
    location: "H3",
  },
  {
    id: "H2-609",
    type: "Personal",
    status: "available",
    location: "H2",
  },
  {
    id: "H1-001",
    type: "Personal",
    status: "available",
    location: "H1",
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
