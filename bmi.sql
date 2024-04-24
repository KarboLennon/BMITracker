-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2024 at 05:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bmi`
--

-- --------------------------------------------------------

--
-- Table structure for table `bmi_status`
--

CREATE TABLE `bmi_status` (
  `id` int(11) NOT NULL,
  `berat` float DEFAULT NULL,
  `tinggi` float DEFAULT NULL,
  `umur` int(11) DEFAULT NULL,
  `kelamin` varchar(10) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `bmi` float DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bmi_status`
--

INSERT INTO `bmi_status` (`id`, `berat`, `tinggi`, `umur`, `kelamin`, `nama`, `bmi`, `status`, `created_at`) VALUES
(38, 90, 170, 20, 'Laki-Laki', 'Rifki', 31.1, 'Obesitas !!!', '2024-03-15 08:38:42'),
(50, 78, 190, 21, 'Laki-Laki', 'Ali', 21.6, 'Normal', '2024-03-17 00:31:25'),
(51, 33, 180, 27, 'Laki-Laki', 'Rafi', 10.2, 'Kurus', '2024-03-17 00:31:45'),
(52, 70, 190, 21, 'Perempuan', 'Aini', 19.4, 'Normal', '2024-03-17 00:40:30'),
(53, 21, 175, 21, 'Perempuan', 'Ivana', 6.9, 'Kurus', '2024-03-17 00:40:53'),
(54, 44, 190, 21, 'Laki-Laki', 'Aji', 12.2, 'Kurus', '2024-03-17 00:45:57'),
(55, 89, 178, 21, 'Laki-Laki', 'Ade', 28.1, 'Gendut', '2024-03-17 00:47:33'),
(65, 46, 170, 23, 'Laki-Laki', 'Ayam', 15.9, 'Kurus', '2024-03-19 18:53:14'),
(66, 69, 180, 23, 'Laki-Laki', 'Adam', 21.3, 'Ideal', '2024-03-19 19:08:10'),
(67, 75, 174, 28, 'Laki-Laki', 'Adit', 24.8, 'Ideal', '2024-03-20 10:56:02'),
(68, 159, 170, 23, 'Laki-Laki', 'Farhan', 55, 'Obesitas !!!', '2024-03-20 10:56:55'),
(69, 60, 170, 23, 'Laki-Laki', 'Yohan', 20.8, 'Ideal', '2024-03-21 09:53:17'),
(70, 55, 168, 21, 'Laki-Laki', 'Ainun', 19.5, 'Normal', '2024-03-21 10:13:42'),
(72, 76, 184, 21, 'Laki-Laki', 'Naufal', 22.4, 'Ideal', '2024-04-23 09:40:07'),
(73, 150, 160, 25, 'Laki-Laki', 'Laptop', 58.6, 'Obesitas !!!', '2024-04-23 12:37:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bmi_status`
--
ALTER TABLE `bmi_status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bmi_status`
--
ALTER TABLE `bmi_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
