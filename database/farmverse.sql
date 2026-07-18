USE farmverse;
SELECT user_id, full_name, email, password FROM users;
select * from users;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: farmverse
-- ------------------------------------------------------
-- Server version	8.0.44
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `crops`
--

DROP TABLE IF EXISTS `crops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crops` (
  `crop_id` int NOT NULL AUTO_INCREMENT,
  `farm_id` int NOT NULL,
  `crop_name` varchar(100) DEFAULT NULL,
  `season` varchar(50) DEFAULT NULL,
  `sowing_date` date DEFAULT NULL,
  `harvesting_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`crop_id`),
  KEY `farm_id` (`farm_id`),
  CONSTRAINT `crops_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farms` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crops`
--

LOCK TABLES `crops` WRITE;
/*!40000 ALTER TABLE `crops` DISABLE KEYS */;
INSERT INTO `crops` VALUES (1,1,'Rice','Kharif','2026-06-15','2026-10-20','Growing'),(2,2,'Wheat','Rabi','2026-11-10','2027-03-25','Planned'),(3,3,'Maize','Summer','2026-03-05','2026-06-30','Harvested');
/*!40000 ALTER TABLE `crops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `farms`
--

DROP TABLE IF EXISTS `farms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `farms` (
  `farm_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `farm_name` varchar(100) NOT NULL,
  `location` varchar(150) DEFAULT NULL,
  `area` decimal(10,2) DEFAULT NULL,
  `soil_type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`farm_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `farms_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `farms`
--

LOCK TABLES `farms` WRITE;
/*!40000 ALTER TABLE `farms` DISABLE KEYS */;
INSERT INTO `farms` VALUES (1,1,'Green Valley Farm','Chennai',5.50,'Loamy','2026-07-09 07:07:23'),(2,2,'Sunrise Farm','Coimbatore',3.75,'Clay','2026-07-09 07:07:23'),(3,3,'Organic Farm','Madurai',6.20,'Sandy','2026-07-09 07:07:23'),(4,1,'Green Valley Farm','Chennai',5.50,'Loamy','2026-07-09 07:07:44'),(5,2,'Sunrise Farm','Coimbatore',3.75,'Clay','2026-07-09 07:07:44'),(6,3,'Organic Farm','Madurai',6.20,'Sandy','2026-07-09 07:07:44');
/*!40000 ALTER TABLE `farms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilizers`
--

DROP TABLE IF EXISTS `fertilizers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizers` (
  `fertilizer_id` int NOT NULL AUTO_INCREMENT,
  `farm_id` int NOT NULL,
  `fertilizer_name` varchar(100) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `application_date` date DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fertilizer_id`),
  KEY `farm_id` (`farm_id`),
  CONSTRAINT `fertilizers_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farms` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizers`
--

LOCK TABLES `fertilizers` WRITE;
/*!40000 ALTER TABLE `fertilizers` DISABLE KEYS */;
INSERT INTO `fertilizers` VALUES (1,1,'Urea',50.00,'2026-07-10','Applied before irrigation'),(2,2,'DAP',30.00,'2026-07-12','Used during crop growth'),(3,3,'Organic Compost',100.00,'2026-07-14','Improves soil fertility');
/*!40000 ALTER TABLE `fertilizers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `irrigation`
--

DROP TABLE IF EXISTS `irrigation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `irrigation` (
  `irrigation_id` int NOT NULL AUTO_INCREMENT,
  `farm_id` int NOT NULL,
  `irrigation_type` varchar(100) DEFAULT NULL,
  `schedule_date` date DEFAULT NULL,
  `water_quantity` decimal(10,2) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`irrigation_id`),
  KEY `farm_id` (`farm_id`),
  CONSTRAINT `irrigation_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farms` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `irrigation`
--

LOCK TABLES `irrigation` WRITE;
/*!40000 ALTER TABLE `irrigation` DISABLE KEYS */;
INSERT INTO `irrigation` VALUES (1,1,'Drip','2026-07-15',500.00,'Morning irrigation'),(2,2,'Sprinkler','2026-07-16',350.00,'Evening irrigation'),(3,3,'Flood','2026-07-17',700.00,'Weekly irrigation'),(4,1,'Drip','2026-07-15',500.00,'Morning irrigation'),(5,2,'Sprinkler','2026-07-16',350.00,'Evening irrigation'),(6,3,'Flood','2026-07-17',700.00,'Weekly irrigation');
/*!40000 ALTER TABLE `irrigation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `farm_id` int NOT NULL,
  `report_type` varchar(100) DEFAULT NULL,
  `report_date` date DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`report_id`),
  KEY `farm_id` (`farm_id`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`farm_id`) REFERENCES `farms` (`farm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,1,'Crop Health','2026-07-15','Rice crop is healthy with good growth.'),(2,2,'Irrigation Report','2026-07-16','Sprinkler irrigation completed successfully.'),(3,3,'Harvest Report','2026-07-17','Maize harvest completed with good yield.');
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` enum('Farmer','Admin') DEFAULT 'Farmer',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Rahul Kumar','rahul@example.com','rahul123','9876543210','Farmer','2026-07-09 06:51:18'),(2,'Priya Sharma','priya@example.com','priya123','9876543211','Farmer','2026-07-09 06:51:18'),(3,'Admin User','admin@farmverse.com','admin123','9876543212','Admin','2026-07-09 06:51:18');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-09 18:44:33
