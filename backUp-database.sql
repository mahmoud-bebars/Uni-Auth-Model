-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Mar 17, 2022 at 09:57 PM
-- Server version: 8.0.26
-- PHP Version: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `followu`
--

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int NOT NULL,
  `userid` varchar(150) NOT NULL,
  `token` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `issuedAt` int DEFAULT NULL,
  `expirationTime` int DEFAULT NULL,
  `expired` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `userid`, `token`, `CreatedDate`, `issuedAt`, `expirationTime`, `expired`) VALUES
(1, 'QXCZEo9KK2YwgBV', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJRWENaRW85S0syWXdnQlYiLCJpYXQiOjE2NDc1MTMyMTEsImV4cCI6MTY0NzU5OTYxMX0.CcOQjdmcbLqkVavnXg5zhEPr_qSiPhYtfwhXeVSvAh0', '2022-03-17 10:33:31', 1647513211, 1647599611, '0'),
(2, 'QXCZEo9KK2YwgBV', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJRWENaRW85S0syWXdnQlYiLCJlbWFpbCI6Im1haG1vdWQuYmViYXJzLm1lQGdtYWlsLmNvbSIsImlhdCI6MTY0NzUxNjgxOCwiZXhwIjoxNjQ3NjAzMjE4fQ.PmJZR-uR8vU2O-8TZMpwELFQOL1We6y77SyLEer1Nm8', '2022-03-17 11:33:38', 1647516818, 1647603218, '0'),
(3, 'QXCZEo9KK2YwgBV', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJRWENaRW85S0syWXdnQlYiLCJlbWFpbCI6Im1haG1vdWQuYmViYXJzLm1lQGdtYWlsLmNvbSIsImlhdCI6MTY0NzUxNjg5NiwiZXhwIjoxNjQ3NjAzMjk2fQ.fN2vZoX42MNi-UJQjrEkgOIqGaYzrmnDTh33MhmEG0s', '2022-03-17 11:34:56', 1647516896, 1647603296, '0'),
(4, 'QXCZEo9KK2YwgBV', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJRWENaRW85S0syWXdnQlYiLCJlbWFpbCI6Im1haG1vdWQuYmViYXJzLm1lQGdtYWlsLmNvbSIsImlhdCI6MTY0NzUyMzczNCwiZXhwIjoxNjQ3NjEwMTM0fQ.V1n1BUX78EjSZrDxj3ZKpT6YOghzu7A_j7ZvwW89V-A', '2022-03-17 13:28:54', 1647523734, 1647610134, '0'),
(5, 'QXCZEo9KK2YwgBV', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJRWENaRW85S0syWXdnQlYiLCJlbWFpbCI6Im1haG1vdWQuYmViYXJzLm1lQGdtYWlsLmNvbSIsImlhdCI6MTY0NzU1Mjg4NiwiZXhwIjoxNjQ3NjM5Mjg2fQ.LKxct8zHEC1XH_pMraP-nZTWtqPyfpqvIu91tBSfwcc', '2022-03-17 21:34:46', 1647552886, 1647639286, '0');

-- --------------------------------------------------------

--
-- Table structure for table `userAvatars`
--

CREATE TABLE `userAvatars` (
  `id` int NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userid` varchar(70) NOT NULL,
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '/public/Defaults/avatar-Default.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userAvatars`
--

INSERT INTO `userAvatars` (`id`, `updatedAt`, `userid`, `path`) VALUES
(1, '2022-03-17 10:33:31', 'QXCZEo9KK2YwgBV', '/public/Defaults/avatar-Default.png');

-- --------------------------------------------------------

--
-- Table structure for table `userContact`
--

CREATE TABLE `userContact` (
  `id` int NOT NULL,
  `userid` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `lastName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `phone` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `organization` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `postion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `area` text,
  `streetAddress` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `city` text,
  `country` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userInfo`
--

CREATE TABLE `userInfo` (
  `id` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userid` varchar(150) NOT NULL,
  `firstName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lastName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `country` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `job` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bio` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userInfo`
--

INSERT INTO `userInfo` (`id`, `createdAt`, `userid`, `firstName`, `lastName`, `country`, `city`, `job`, `bio`) VALUES
(1, '2022-03-17 10:33:31', 'QXCZEo9KK2YwgBV', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userLinks`
--

CREATE TABLE `userLinks` (
  `id` int NOT NULL,
  `linkid` text NOT NULL,
  `userid` text NOT NULL,
  `link` text NOT NULL,
  `linkName` text NOT NULL,
  `hidden` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userLinks`
--

INSERT INTO `userLinks` (`id`, `linkid`, `userid`, `link`, `linkName`, `hidden`) VALUES
(1, 'EBzj5KKUlk0JpV9', 'QXCZEo9KK2YwgBV', 'https://mbebars.netlify.app', 'check my portofolio', 0),
(2, 'I2YzC4LYIskVvZV', 'QXCZEo9KK2YwgBV', 'https://github.com/mahmoud-bebars', 'check my Github', 0),
(3, 'TEAIftIK3GYrXIW', 'QXCZEo9KK2YwgBV', 'https://dev.to/mahmoud_bebars/the-uni-auth-system-39kb', 'my last article on Dev Commuinty', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userid` text NOT NULL,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `createdAt`, `userid`, `username`, `email`, `phone`, `password`) VALUES
(1, '2022-03-17 10:33:31', 'QXCZEo9KK2YwgBV', 'm.bebars', 'mahmoud.bebars.me@gmail.com', '01276800115', '$2b$10$9e1V7xMwD/PaaTGD.J.btOhPEoF.gB326GaG9QG93NVqbrosgxQM6');

-- --------------------------------------------------------

--
-- Table structure for table `userSocials`
--

CREATE TABLE `userSocials` (
  `id` int NOT NULL,
  `userid` text NOT NULL,
  `facebook` text,
  `instagram` text,
  `twitter` text,
  `linkedin` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userSocials`
--

INSERT INTO `userSocials` (`id`, `userid`, `facebook`, `instagram`, `twitter`, `linkedin`) VALUES
(1, 'QXCZEo9KK2YwgBV', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userThemes`
--

CREATE TABLE `userThemes` (
  `id` int NOT NULL,
  `userid` text NOT NULL,
  `brandColor` text,
  `subColor` text,
  `cover` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `userThemes`
--

INSERT INTO `userThemes` (`id`, `userid`, `brandColor`, `subColor`, `cover`) VALUES
(1, 'QXCZEo9KK2YwgBV', '#D9D9D9', '#6F7072', '/public/Defaults/cover-Default.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userAvatars`
--
ALTER TABLE `userAvatars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userContact`
--
ALTER TABLE `userContact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userInfo`
--
ALTER TABLE `userInfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userLinks`
--
ALTER TABLE `userLinks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userSocials`
--
ALTER TABLE `userSocials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userThemes`
--
ALTER TABLE `userThemes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `userAvatars`
--
ALTER TABLE `userAvatars`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userContact`
--
ALTER TABLE `userContact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userInfo`
--
ALTER TABLE `userInfo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userLinks`
--
ALTER TABLE `userLinks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userSocials`
--
ALTER TABLE `userSocials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userThemes`
--
ALTER TABLE `userThemes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
