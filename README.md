# 📱 SmartApp - React Native with Expo Router

A modern, scalable, and well-structured **React Native** project using **Expo Router**, **TypeScript**, **Tailwind (via NativeWind)**, and **Zustand** for global state management. Built with performance, modularity, and maintainability in mind.

## ✨ Features

- ⚛️ **Expo Router** for file-based navigation
- 💨 **Tailwind CSS** (NativeWind) for fast and consistent styling
- ⚡️ **Zustand** for minimal, scalable state management
- 🎨 Customizable theme and reusable components
- 📁 Clean architecture for long-term scalability
- 🧪 Ready for integration with API, auth, and local DB

---

## 📂 Folder Structure

```bash
frontend/
  ├── app/
  │   ├── (auth)/
  │   │   ├── sign-in.tsx
  │   │   └── index.tsx
  │   ├── (home)/
  │   │   ├── index.tsx
  │   │   ├── _room-list.tsx
  │   │   └── [roomId]/
  │   │       ├── index.tsx
  │   │       ├── confirm.tsx
  │   │       └── time-selection.tsx
  │   └── _layout.tsx
  ├── components/
  │   ├── ui/
  │   │   ├── Button.tsx
  │   │   ├── Header.tsx
  │   │   └── RoomCard.tsx
  │   └── room/
  │       ├── RoomDetails.tsx
  │       └── TimeSlot.tsx
  ├── constants/
  │   └── rooms.ts
  ├── hooks/
  │   └── useRooms.ts
  ├── assets/
  │   └── logo.png
  ├── global.css
  └── tailwind.config.js
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Brozic2908/Smart-Space-Manage-App.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

````bash
npx expo start
``` Make sure you have the Expo Go app on your phone or an Android/iOS emulator running.


````
