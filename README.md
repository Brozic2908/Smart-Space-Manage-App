# 📱 SmartApp - React Native with Expo Router

A modern, scalable, and well-structured **React Native** project using **Expo Router**, **TypeScript**, **Tailwind (via NativeWind)**, and **Zustand** for global state management.

---

## ✨ Features

- ⚛️ File-based navigation with **Expo Router**
- 💨 Styling with **Tailwind CSS (NativeWind)**
- ⚡️ Global state with **Zustand**
- 🎨 Reusable components, scalable structure
- 🧪 Ready for RESTful API, authentication, and local database

---

## 📁 Folder Structure

```bash
frontend/
  ├── app/
  │   ├── (auth)/              # Auth screens
  │   ├── (home)/              # Main app screens
  │   └── _layout.tsx          # Root layout
  ├── components/              # UI components
  ├── constants/               # Static data (rooms, etc.)
  ├── hooks/                   # Custom hooks
  ├── assets/                  # Images, logos
  ├── global.css               # Tailwind global styles
  └── tailwind.config.js       # Tailwind config
```

---

## 🚀 Getting Started

### 1️⃣ Backend Setup (FastAPI with Uvicorn)

> **Yêu cầu**: Python, FastAPI, Uvicorn, và môi trường backend sẵn sàng (hoặc XAMPP nếu có kết nối cơ sở dữ liệu).

- **Bước 1: Cài đặt FastAPI & Uvicorn**

```bash
pip install -r requirement.txt
```

> **Lưu ý**: cài XAMPP và chọn mục SQL sau đó copy file sql trong backend để sử dụng database

- **Bước 2: Chạy backend server**

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

📌 _Ghi chú_: Máy chủ backend phải nằm **cùng mạng nội bộ** với điện thoại để thiết bị truy cập được API.

Ví dụ: Nếu địa chỉ IP máy bạn là `192.168.1.10`, thì app di động sẽ gọi đến `http://192.168.1.10:8000`.

Bạn nên cập nhật `API_BASE_URL` trong file config (ví dụ trong `hooks/useRooms.ts` hoặc biến môi trường) để khớp với địa chỉ thật.

---

### 2️⃣ Mobile App Setup (Expo React Native)

- **Bước 1: Cài đặt các dependencies**

```bash
cd frontend
npm install
```

- **Bước 2: Khởi động dự án bằng Expo**

```bash
npx expo start --tunnel
```

> Sử dụng `--tunnel` giúp thiết bị di động dễ dàng truy cập server kể cả khi không cùng mạng LAN.

- **Bước 3: Mở ứng dụng bằng Expo Go**

- Tải ứng dụng **Expo Go** từ App Store hoặc Google Play.
- Dùng camera hoặc app Expo Go để **scan QR code** hiển thị trong terminal.

---

## 🔄 Kết nối API giữa app và backend

1. Xác định địa chỉ IP LAN của máy chạy backend để lấy địa chỉ ipv4:

   ```bash
   ipconfig (Windows) hoặc ifconfig (macOS/Linux)
   ```

   Ví dụ: `192.168.1.10`

2. Trong frontend, cập nhật base URL:

   ```ts
   // ví dụ trong useRooms.ts hoặc services/api.ts
   const API_BASE_URL = "http://192.168.1.10:8000";
   ```

3. Đảm bảo điện thoại dùng để test cũng **kết nối chung mạng WiFi** với máy tính chạy backend.

---

## 🛠️ Development Tips

- **Reset cache nếu gặp lỗi**:

  ```bash
  npx expo start --clear
  ```

- **Dùng VSCode + Tailwind IntelliSense** để dễ soạn style

- **Kiểm tra log thiết bị thật**: Dùng Expo Go để mở và xem log qua Developer Tools.

---

## 📞 Hỗ trợ

Nếu bạn gặp lỗi như `"Request timed out"` hoặc `"Could not load exp://"`, hãy đảm bảo:

- Đang dùng `--tunnel` khi start Expo
- Máy và điện thoại cùng mạng
- Server backend đang chạy đúng địa chỉ

---

Bạn có muốn mình thêm luôn phần `.env` để dễ cấu hình `API_URL` từ biến môi trường?
