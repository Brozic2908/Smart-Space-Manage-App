CREATE DATABASE IF NOT EXISTS s3_mrs;
USE s3_mrs;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('student','lecturer','admin','it','technician') NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_code VARCHAR(20) NOT NULL UNIQUE,
    room_type ENUM('individual', 'group', 'mentoring') NOT NULL,
    location VARCHAR(100) NOT NULL,
    status ENUM('available', 'in_use', 'maintenance') NOT NULL,
    sensor ENUM('active', 'inactive') NOT NULL
);

CREATE TABLE IF NOT EXISTS devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('light', 'fan', 'air_conditioner') NOT NULL,
    status ENUM('on', 'off', 'error') NOT NULL,
    room_id INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    booking_date DATE NOT NULL ,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('active', 'cancelled', 'checked_in', 'checked_out') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS checkin_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    checkin_time DATETIME,
    checkout_time DATETIME,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Insert mock data for users table
INSERT INTO users (name, email, role, password_hash) VALUES
('Nguyen Van A', 'stu@gmail.com', 'student', '$2b$12$YMjZfK3N7v2vueR2P40qYu7vyCcaTjY02PQfzoiXVZo5TQJkcSwUS'),
('Le Van C', 'lec@gmail.com', 'lecturer', '$2b$12$YMjZfK3N7v2vueR2P40qYu7vyCcaTjY02PQfzoiXVZo5TQJkcSwUS'),
('Hoang Van E', 'admin@gmail.com', 'admin', '$2b$12$YMjZfK3N7v2vueR2P40qYu7vyCcaTjY02PQfzoiXVZo5TQJkcSwUS'),
('Pham Van I', 'tech@gmail.com', 'technician', '$2b$12$YMjZfK3N7v2vueR2P40qYu7vyCcaTjY02PQfzoiXVZo5TQJkcSwUS'),
('Tran Van G', 'it@gmail.com', 'it', '$2b$12$YMjZfK3N7v2vueR2P40qYu7vyCcaTjY02PQfzoiXVZo5TQJkcSwUS'),
('Tran Thi B', 'tranb@gmail.com', 'student', '$2y$10$9KcMXz2JpyZcA9qGf0r4IuSaY9lGjH8XY7Xd5v1Sp3LjR9Dy6dO0e'),
('Pham Thi D', 'phamd@gmail.com', 'lecturer', '$2y$10$3GJ5xGnqfKVQKxC0ZKrCXO5RgK7YrLxzwOl5Lh2WZO2Tm8Jc.8PzK'),
('Nguyen Thi F', 'nguyenf@gmail.com', 'admin', '$2y$10$j9hCfQJvKzpYwmJ9OjTHiuAjRr7BsJQMfdjGdKOFxHfTXbcqTUDX.'),
('Le Thi H', 'leh@gmail.com', 'it', '$2y$10$FRl3JpGj4Y9ClDJrkx7jjeTu9Rjr9f9pjf3RmqNwj3yFjZlLKbRCe'),
('Hoang Thi K', 'hoangk@gmail.com', 'technician', '$2y$10$mUqt1XCvUYCGFQyHE4eGHeU3Jy4ZXW7KJjrkXhwL5lgjdVVYMIvUW'),
('Nguyen Van L', 'nguyenl@gmail.com', 'student', '$2y$10$ZvhTFYMY4zWn6S2H9bRgZe8xFgxYl9S8Dj.B7O.6Xg4tqghwzkNk2'),
('Tran Thi M', 'tranm@gmail.com', 'student', '$2y$10$F/KK3vvcXvTUYpBHLVIZNeFtZHjxzNV8RLRjWzD3gUaoBJMGQR6.W'),
('Le Van N', 'len@gmail.com', 'student', '$2y$10$0ywkzT6mVcK1TMZC5YqBWOs8NB0Mz.W7FQl6G7jx5.BX9o5fW2p2a'),
('Pham Thi P', 'phamp@gmail.com', 'lecturer', '$2y$10$lvzW7kFZoNQeXS5g7jUUUe/dKSBiK3sQIGpZ89yDKbzH2-2Gxvm0OZG'),
('Hoang Van Q', 'hoangq@gmail.com', 'lecturer', '$2y$10$qZc.KUr3jgWfQVJr5doPFu6kJZa.Iz0WJGXmyoJVYXsP5/9N7X6ta');

-- Insert mock data for rooms table
INSERT INTO rooms (room_code, room_type, location, status, sensor) VALUES
('H1-101', 'individual', 'Building H1, Floor 1', 'available', 'active'),
('H1-102', 'individual', 'Building H1, Floor 1', 'available', 'active'),
('H1-201', 'group', 'Building H1, Floor 2', 'available', 'active'),
('H1-202', 'group', 'Building H1, Floor 2', 'in_use', 'active'),
('H2-101', 'individual', 'Building H2, Floor 1', 'available', 'active'),
('H2-102', 'individual', 'Building H2, Floor 1', 'maintenance', 'inactive'),
('H2-201', 'mentoring', 'Building H2, Floor 2', 'available', 'active'),
('H2-202', 'mentoring', 'Building H2, Floor 2', 'in_use', 'active'),
('H3-101', 'group', 'Building H3, Floor 1', 'available', 'active'),
('H3-102', 'group', 'Building H3, Floor 1', 'available', 'inactive'),
('H3-201', 'individual', 'Building H3, Floor 2', 'in_use', 'active'),
('H3-202', 'individual', 'Building H3, Floor 2', 'available', 'active'),
('H6-101', 'mentoring', 'Building H6, Floor 1', 'available', 'active'),
('H6-102', 'mentoring', 'Building H6, Floor 1', 'in_use', 'active'),
('H6-201', 'group', 'Building H6, Floor 2', 'maintenance', 'inactive');

-- Insert mock data for devices table
INSERT INTO devices (name, type, status, room_id) VALUES
('Light H1-101', 'light', 'off', 1),
('AC H1-101', 'air_conditioner', 'off', 1),
('Light H1-102', 'light', 'off', 2),
('Fan H1-102', 'fan', 'off', 2),
('Light H1-201', 'light', 'off', 3),
('AC H1-201', 'air_conditioner', 'off', 3),
('Light H1-202', 'light', 'on', 4),
('AC H1-202', 'air_conditioner', 'on', 4),
('Light H2-101', 'light', 'off', 5),
('Fan H2-101', 'fan', 'off', 5),
('Light H2-102', 'light', 'off', 6),
('Fan H2-102', 'fan', 'error', 6),
('Light H2-201', 'light', 'off', 7),
('AC H2-201', 'air_conditioner', 'off', 7),
('Light H2-202', 'light', 'on', 8),
('AC H2-202', 'air_conditioner', 'on', 8),
('Light H3-101', 'light', 'off', 9),
('Fan H3-101', 'fan', 'off', 9),
('Light H3-102', 'light', 'off', 10),
('Fan H3-102', 'fan', 'error', 10),
('Light H3-201', 'light', 'on', 11),
('AC H3-201', 'air_conditioner', 'on', 11),
('Light H3-202', 'light', 'off', 12),
('AC H3-202', 'air_conditioner', 'off', 12),
('Light H6-101', 'light', 'off', 13),
('AC H6-101', 'air_conditioner', 'off', 13),
('Light H6-102', 'light', 'on', 14),
('AC H6-102', 'air_conditioner', 'on', 14),
('Light H6-201', 'light', 'off', 15),
('Fan H6-201', 'fan', 'error', 15);

-- Insert mock data for bookings table (for current and future dates)
INSERT INTO bookings (user_id, room_id, booking_date, start_time, end_time, status, created_at) VALUES
-- Today's bookings
(1, 1, CURDATE(), '08:00:00', '10:00:00', 'active', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2, 3, CURDATE(), '10:30:00', '12:30:00', 'active', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(3, 5, CURDATE(), '13:00:00', '15:00:00', 'checked_in', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(4, 8, CURDATE(), '15:30:00', '17:30:00', 'checked_in', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(5, 11, CURDATE(), '09:00:00', '11:00:00', 'checked_in', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(6, 14, CURDATE(), '14:00:00', '16:00:00', 'checked_in', DATE_SUB(NOW(), INTERVAL 4 DAY)),

-- Tomorrow's bookings
(7, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '08:00:00', '10:00:00', 'active', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(8, 4, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:30:00', '12:30:00', 'active', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(9, 7, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '13:00:00', '15:00:00', 'active', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(10, 9, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '15:30:00', '17:30:00', 'active', DATE_SUB(NOW(), INTERVAL 3 DAY)),

-- Day after tomorrow's bookings
(11, 12, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '09:00:00', '11:00:00', 'active', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(12, 13, DATE_ADD(CURDATE(), INTERVAL 2 DAY), '14:00:00', '16:00:00', 'active', DATE_SUB(NOW(), INTERVAL 2 DAY)),

-- Past bookings (completed)
(13, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '08:00:00', '10:00:00', 'checked_out', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(14, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), '10:30:00', '12:30:00', 'checked_out', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(1, 5, DATE_SUB(CURDATE(), INTERVAL 2 DAY), '13:00:00', '15:00:00', 'checked_out', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(2, 8, DATE_SUB(CURDATE(), INTERVAL 2 DAY), '15:30:00', '17:30:00', 'checked_out', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(3, 11, DATE_SUB(CURDATE(), INTERVAL 3 DAY), '09:00:00', '11:00:00', 'checked_out', DATE_SUB(NOW(), INTERVAL 8 DAY)),
(4, 14, DATE_SUB(CURDATE(), INTERVAL 3 DAY), '14:00:00', '16:00:00', 'checked_out', DATE_SUB(NOW(), INTERVAL 8 DAY)),

-- Cancelled bookings
(5, 2, DATE_SUB(CURDATE(), INTERVAL 4 DAY), '08:00:00', '10:00:00', 'cancelled', DATE_SUB(NOW(), INTERVAL 9 DAY)),
(6, 4, DATE_SUB(CURDATE(), INTERVAL 4 DAY), '10:30:00', '12:30:00', 'cancelled', DATE_SUB(NOW(), INTERVAL 9 DAY)),
(7, 7, DATE_SUB(CURDATE(), INTERVAL 5 DAY), '13:00:00', '15:00:00', 'cancelled', DATE_SUB(NOW(), INTERVAL 10 DAY));

-- Insert mock data for checkin_logs table
INSERT INTO checkin_logs (booking_id, checkin_time, checkout_time) VALUES
-- Current check-ins with no checkout
(3, DATE_ADD(CONCAT(CURDATE(), ' 13:05:00'), INTERVAL 0 MINUTE), NULL),
(4, DATE_ADD(CONCAT(CURDATE(), ' 15:32:00'), INTERVAL 0 MINUTE), NULL),
(5, DATE_ADD(CONCAT(CURDATE(), ' 09:01:00'), INTERVAL 0 MINUTE), NULL),
(6, DATE_ADD(CONCAT(CURDATE(), ' 14:03:00'), INTERVAL 0 MINUTE), NULL),

-- Past completed check-ins
(13, DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), ' 08:02:00'), INTERVAL 0 MINUTE), DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), ' 09:58:00'), INTERVAL 0 MINUTE)),
(14, DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), ' 10:35:00'), INTERVAL 0 MINUTE), DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), ' 12:25:00'), INTERVAL 0 MINUTE)),
(15, DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 2 DAY), ' 13:00:00'), INTERVAL 0 MINUTE), DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 2 DAY), ' 14:55:00'), INTERVAL 0 MINUTE)),
(16, DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 2 DAY), ' 15:28:00'), INTERVAL 0 MINUTE), DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 2 DAY), ' 17:25:00'), INTERVAL 0 MINUTE)),
(17, DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 3 DAY), ' 09:05:00'), INTERVAL 0 MINUTE), DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 3 DAY), ' 11:00:00'), INTERVAL 0 MINUTE)),
(18, DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 3 DAY), ' 14:00:00'), INTERVAL 0 MINUTE), DATE_ADD(CONCAT(DATE_SUB(CURDATE(), INTERVAL 3 DAY), ' 16:10:00'), INTERVAL 0 MINUTE));