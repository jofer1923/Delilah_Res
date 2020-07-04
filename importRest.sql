-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2020 at 10:35 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `delilahresto`
--

-- --------------------------------------------------------

--
-- Table structure for table `dishmenu`
--

CREATE TABLE `dishmenu` (
  `Dish_Id` int(11) NOT NULL,
  `Long_Dish_Name` varchar(35) NOT NULL,
  `Short_Dish_Name` varchar(14) NOT NULL,
  `Picture_Dish` varchar(70) NOT NULL,
  `Price_Dish` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dishmenu`
--

INSERT INTO `dishmenu` (`Dish_Id`, `Long_Dish_Name`, `Short_Dish_Name`, `Picture_Dish`, `Price_Dish`) VALUES
(1, 'Hot dog with salad', 'Hot dog', 'https://dam.cocinafacil.com.mx/wp-content/uploads/2019/04/hot-dog-ader', 8),
(3, 'Arroz con pollo a la llanera', 'Arroz con poll', 'https://images-gmi-pmc.edge-generalmills.com/8f518e2c-ad62-4480-b6e1-c', 15),
(7, 'ajiaco caleño del valle de aburra', 'ajiaco', 'https://img-global.cpcdn.com/recipes/7e9561ebcd80ac0b/1200x630cq70/pho', 12),
(8, 'ajiaco caleño del llano', 'ajiaco con pap', 'https://img-global.cpcdn.com/recipes/7e9561ebcd80ac0b/1200x630cq70/pho', 20);

-- --------------------------------------------------------

--
-- Table structure for table `orderstatus`
--

CREATE TABLE `orderstatus` (
  `Id_Order_Status` int(11) NOT NULL,
  `New_Order` tinyint(1) DEFAULT NULL,
  `Confirm_Order` tinyint(1) DEFAULT NULL,
  `Preparation_Order` tinyint(1) DEFAULT NULL,
  `Sent_Order` tinyint(1) DEFAULT NULL,
  `Delivery_Order` tinyint(1) DEFAULT NULL,
  `Cancel_Order` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderstatus`
--

INSERT INTO `orderstatus` (`Id_Order_Status`, `New_Order`, `Confirm_Order`, `Preparation_Order`, `Sent_Order`, `Delivery_Order`, `Cancel_Order`) VALUES
(1, 1, 0, 0, 0, 0, 0),
(2, 0, 1, 0, 0, 0, 0),
(3, 0, 0, 1, 0, 0, 0),
(4, 0, 0, 0, 1, 0, 0),
(5, 0, 0, 0, 0, 1, 0),
(6, 0, 0, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `paypss`
--

CREATE TABLE `paypss` (
  `Paypss_Id` int(11) NOT NULL,
  `Cash_Pay` tinyint(1) DEFAULT NULL,
  `Card_Pay` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paypss`
--

INSERT INTO `paypss` (`Paypss_Id`, `Cash_Pay`, `Card_Pay`) VALUES
(1, 0, 1),
(2, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userservice`
--

CREATE TABLE `userservice` (
  `User_Id` int(11) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `Nick_Name` varchar(12) NOT NULL,
  `User_Name` varchar(40) NOT NULL,
  `Mail` varchar(70) NOT NULL,
  `Contact` varchar(12) NOT NULL,
  `Location` varchar(50) NOT NULL,
  `Pwd` varchar(65) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userservice`
--

INSERT INTO `userservice` (`User_Id`, `admin`, `Nick_Name`, `User_Name`, `Mail`, `Contact`, `Location`, `Pwd`) VALUES
(1, 0, 'jofer1923', 'fernando bedoya', 'jofer1923@gmail.com', '3125689054', 'Crc 3 Dg 5 - 56', 'jofer19232020'),
(2, 0, 'Andres3030', 'Andres Cano', 'AndresCan@gmail.com', '3203428097', 'cl 40 cr 56 -98', 'Andres092020'),
(8, 0, 'joseoRamiro', 'jose ramiro', 'ramirocorreo@gmail.com', '3113457980', 'cl 34 sur cr 67 -3', 'ramiro3980'),
(9, 1, 'joseooofeiii', 'carlos araujo', 'carau@jrrruuoi.com', '234343300', 'cr 40 cl 56 -88', '00000003');

-- --------------------------------------------------------

--
-- Table structure for table `uservsorder`
--

CREATE TABLE `uservsorder` (
  `User_Id_Def` int(11) NOT NULL,
  `User_Id` int(11) DEFAULT NULL,
  `Dish_Id` int(11) DEFAULT NULL,
  `Paypss_Id` int(11) DEFAULT NULL,
  `Id_Order_Status` int(11) DEFAULT NULL,
  `UpdateDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uservsorder`
--

INSERT INTO `uservsorder` (`User_Id_Def`, `User_Id`, `Dish_Id`, `Paypss_Id`, `Id_Order_Status`, `UpdateDate`) VALUES
(7, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00'),
(8, 2, 2, 1, 5, '2020-07-04 05:28:07'),
(9, NULL, NULL, NULL, NULL, '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dishmenu`
--
ALTER TABLE `dishmenu`
  ADD PRIMARY KEY (`Dish_Id`);

--
-- Indexes for table `orderstatus`
--
ALTER TABLE `orderstatus`
  ADD PRIMARY KEY (`Id_Order_Status`);

--
-- Indexes for table `paypss`
--
ALTER TABLE `paypss`
  ADD PRIMARY KEY (`Paypss_Id`);

--
-- Indexes for table `userservice`
--
ALTER TABLE `userservice`
  ADD PRIMARY KEY (`User_Id`);

--
-- Indexes for table `uservsorder`
--
ALTER TABLE `uservsorder`
  ADD PRIMARY KEY (`User_Id_Def`),
  ADD KEY `User_Id` (`User_Id`),
  ADD KEY `Dish_Id` (`Dish_Id`),
  ADD KEY `Paypss_Id` (`Paypss_Id`),
  ADD KEY `Id_Order_Status` (`Id_Order_Status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dishmenu`
--
ALTER TABLE `dishmenu`
  MODIFY `Dish_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orderstatus`
--
ALTER TABLE `orderstatus`
  MODIFY `Id_Order_Status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `paypss`
--
ALTER TABLE `paypss`
  MODIFY `Paypss_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userservice`
--
ALTER TABLE `userservice`
  MODIFY `User_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `uservsorder`
--
ALTER TABLE `uservsorder`
  MODIFY `User_Id_Def` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `uservsorder`
--
ALTER TABLE `uservsorder`
  ADD CONSTRAINT `uservsorder_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `userservice` (`User_Id`),
  ADD CONSTRAINT `uservsorder_ibfk_2` FOREIGN KEY (`Dish_Id`) REFERENCES `dishmenu` (`Dish_Id`),
  ADD CONSTRAINT `uservsorder_ibfk_3` FOREIGN KEY (`Paypss_Id`) REFERENCES `paypss` (`Paypss_Id`),
  ADD CONSTRAINT `uservsorder_ibfk_5` FOREIGN KEY (`Id_Order_Status`) REFERENCES `orderstatus` (`Id_Order_Status`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
