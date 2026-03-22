-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2026 at 05:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tuition_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`, `role`, `created_at`) VALUES
(3, 'admin@eliteclasses.com', '$2b$10$PHs4ok8r1TOGu0e6.Jc9FeAvD9DAD/P0TSrZA84xW6UkRvZCWv8jG', 'admin', '2026-01-25 05:15:20');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `faculty_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `faculty_name`) VALUES
(1, 'C Programming', NULL),
(2, 'Python', NULL),
(3, 'Java', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `enquiries`
--

CREATE TABLE `enquiries` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `course` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enquiries`
--

INSERT INTO `enquiries` (`id`, `name`, `phone`, `email`, `course`, `message`, `created_at`) VALUES
(1, 'gleexa', '+917284927522', 'mahesh0886633@gmail.com', 'Competitive Exams', 'hello', '2026-01-25 04:42:08'),
(2, 'Mahesh Rathod', '+9188663377793', 'playbot359@gmail.com', 'Class 11 – 12 (Science)', 'hey', '2026-01-25 04:49:24'),
(3, 'Mahesh Rathod', '+9188663377793', 'ridhi@gmail.com', 'Class 11 – 12', '', '2026-01-26 14:04:41');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `progress` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `user_id`, `course_id`, `name`, `phone`, `email`, `message`, `created_at`, `progress`) VALUES
(1, 1, 1, '', '', NULL, NULL, '2026-02-01 08:00:58', 0),
(2, 1, 2, '', '', NULL, NULL, '2026-02-01 08:01:37', 0),
(7, 22, 1, 'ridhi', '7622856689', 'ridhi@gmail.com', NULL, '2026-02-01 08:20:54', 0),
(8, 22, 2, 'ridhi', '8866337793', 'ridhi@gmail.com', NULL, '2026-02-01 08:51:27', 0);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `course` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `course`, `phone`, `created_at`) VALUES
(1, 'Mahesh Rathod', 'bot4307007@gmail.com', 'Class 11 – 12 (Science)', '8866337793', '2026-01-26 03:53:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','student') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'rimp', 'rimp@123gmail.com', '$2b$10$dHoNyQNUt6olixiZ/8vFvug1AiZfGtseMjJhl7DqxGyBp1j6HH1Fi', 'student', '2026-01-25 10:34:36'),
(2, 'Admin', 'admin@eliteclasses.com', '$2b$10$iG8wootOXxWHNF1c7j/ggOxx.4.Gadpbi5nnrAaWfrubmxh3dhBWG', 'admin', '2026-01-25 10:38:50'),
(3, 'newuser', 'newuser@gmail.com', '$2b$10$kY.O8YoKC/xny9SX9D3y7.2dRWdlnXjc/YC/ejAcI6sWW.gWaSTSS', 'student', '2026-01-26 04:13:18'),
(4, 'Mahesh Rathod', 'mahesh@gmail.com', '$2b$10$ajOblLOG58UVwyIPJOSIa.m5zUteMst4q4R1Ixk36T6aoWA4rrtTu', 'student', '2026-01-26 04:24:04'),
(6, 'mahesh thakor', 'mahesh@123gmail.com', '$2b$10$uAcSoQyKEVbhi8BfkB7yOu1TTCB8UJ8JTigfHQycSeGW5lWYTcoky', 'student', '2026-01-26 04:30:45'),
(8, 'gleexa', 'gleexa5@gmail.com', '$2b$10$1pW4/NWfkcSnNs427SDDUuyA94hk1sPchqKTOsJijREEKdHJITHq6', 'student', '2026-01-26 04:38:28'),
(9, 'rishi', 'rishi@gmail.com', '$2b$10$IMbNz5wPjGiffmohYU14.e3ElqE4.dJBWmDZOgc1tcpe8OsDZO5WO', 'student', '2026-01-26 04:44:09'),
(10, 'nim', 'nim@gmail.com', '$2b$10$zZYgvbSOpbxXb8dzaREFT.X0xpqYqYix0u8amrKijSm1m6mRofM2C', 'student', '2026-01-26 04:48:51'),
(11, 'krish', 'krish@gmail.com', '$2b$10$6vuhX9rRIUXl9RiOLzipi.vfngy9uvx/4Uo5xGxYNGc.iUoq8Q3Ka', 'student', '2026-01-26 04:52:38'),
(13, 'rimp', 'rimp@gmail.com', '$2b$10$wcImnKVE2l9tomX.QxjsHeGuYMtTgx2lDLu8PARUATWdHrXt4Munq', 'student', '2026-01-26 04:58:15'),
(16, 'rimp', 'rimp@2gmail.com', '$2b$10$kh5DUWYDZMvn.dFR07Rh2u74RfUbJJFXlYkP4wJvC0WNE4KmZU66e', 'student', '2026-01-26 05:08:01'),
(17, 'newuser', 'rimp@2323gmail.com', '$2b$10$D6/dQOU.3LShoQOo26qzE.k8wxO9yJFOaXtlFPi11eQR7GrFn8tOC', 'student', '2026-01-26 05:41:32'),
(18, 'krun', 'krun@gmail.com', '$2b$10$GcNj6GEJFyJomGzd8M0DUegRI4f4IpfIBKNthigpXHzazXw.6Hgpu', 'student', '2026-01-26 06:02:12'),
(20, 'newuser', 'newuser2@gmail.com', '$2b$10$cK.PFRK5OdG5k.5XdVJexuaLlE9TuFwI6YHLFLH8o5o.cVAF40Riu', 'student', '2026-01-26 08:53:01'),
(22, 'ridhi', 'ridhi@gmail.com', '$2b$10$hFTLdmef3Wjp4xbsB5mHkO0g4alEUsN2tCpD8fTzA46dQ52QboeVC', 'student', '2026-01-26 14:03:56'),
(24, 'newuser', 'nim2@gmail.com', '$2b$10$fm5x72uxb7V4izSo64qLmeIn36e8g5X1WtG9TJqwZ6OtnX//FyEfK', 'student', '2026-02-01 04:17:02'),
(25, 'nishant', 'nisha@123gmail.com', '$2b$10$h0XcFUwZNdrI4HOZABWWh.QQu9EF11DqcuPB994P7jZcw0wr8G2ba', 'student', '2026-02-01 05:36:37'),
(26, 'newuser', 'new@gmail.com', '$2b$10$tuV6U623xAhVLKptL/sDcurKReWwmsZ5qkPLnCanAFoErpPfnthl2', 'student', '2026-03-01 11:55:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enquiries`
--
ALTER TABLE `enquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_enroll` (`user_id`,`course_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `enquiries`
--
ALTER TABLE `enquiries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
