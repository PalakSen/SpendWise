CREATE DATABASE  IF NOT EXISTS `projectdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `projectdb`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: projectdb
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `deptid` int NOT NULL AUTO_INCREMENT,
  `deptname` varchar(45) NOT NULL,
  `allocatedamt` double NOT NULL,
  `requestedamt` double NOT NULL,
  PRIMARY KEY (`deptid`),
  UNIQUE KEY `deptname_UNIQUE` (`deptname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(45) NOT NULL,
  `pwd` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `status` tinyint NOT NULL,
  `roleid` int NOT NULL,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `pwd_UNIQUE` (`pwd`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `uname_UNIQUE` (`uname`),
  UNIQUE KEY `contact_UNIQUE` (`contact`),
  KEY `roleid_idx` (`roleid`),
  CONSTRAINT `roleid` FOREIGN KEY (`roleid`) REFERENCES `role` (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizationhead`
--

DROP TABLE IF EXISTS `organizationhead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizationhead` (
  `orgid` int NOT NULL AUTO_INCREMENT,
  `orgname` varchar(45) NOT NULL,
  `orgaddress` varchar(45) NOT NULL,
  `industry` varchar(45) NOT NULL,
  `orgwebsite` varchar(45) DEFAULT NULL,
  `orgdesc` varchar(45) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`orgid`),
  UNIQUE KEY `oname_UNIQUE` (`orgname`),
  UNIQUE KEY `orgwebsite_UNIQUE` (`orgwebsite`),
  KEY `orguid_idx` (`uid`),
  CONSTRAINT `orguid` FOREIGN KEY (`uid`) REFERENCES `login` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizationhead`
--

LOCK TABLES `organizationhead` WRITE;
/*!40000 ALTER TABLE `organizationhead` DISABLE KEYS */;
/*!40000 ALTER TABLE `organizationhead` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orgcategory`
--

DROP TABLE IF EXISTS `orgcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orgcategory` (
  `orgcid` int NOT NULL AUTO_INCREMENT,
  `orgcname` varchar(45) NOT NULL,
  `cdesc` varchar(45) NOT NULL,
  PRIMARY KEY (`orgcid`),
  UNIQUE KEY `orgcname_UNIQUE` (`orgcname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orgcategory`
--

LOCK TABLES `orgcategory` WRITE;
/*!40000 ALTER TABLE `orgcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `orgcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orgexpenditure`
--

DROP TABLE IF EXISTS `orgexpenditure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orgexpenditure` (
  `orgexid` int NOT NULL AUTO_INCREMENT,
  `expamt` double NOT NULL,
  `exppurpose` varchar(45) NOT NULL,
  `expdate` date NOT NULL,
  `transactionid` varchar(45) NOT NULL,
  `orgcid` int DEFAULT NULL,
  `deptid` int DEFAULT NULL,
  PRIMARY KEY (`orgexid`),
  UNIQUE KEY `transactionid_UNIQUE` (`transactionid`),
  KEY `ocid_idx` (`orgcid`),
  KEY `dptid_idx` (`deptid`),
  CONSTRAINT `dptid` FOREIGN KEY (`deptid`) REFERENCES `department` (`deptid`),
  CONSTRAINT `ocid` FOREIGN KEY (`orgcid`) REFERENCES `orgcategory` (`orgcid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orgexpenditure`
--

LOCK TABLES `orgexpenditure` WRITE;
/*!40000 ALTER TABLE `orgexpenditure` DISABLE KEYS */;
/*!40000 ALTER TABLE `orgexpenditure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orgfunds`
--

DROP TABLE IF EXISTS `orgfunds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orgfunds` (
  `fundid` int NOT NULL AUTO_INCREMENT,
  `fundamt` double NOT NULL,
  `deptid` int DEFAULT NULL,
  `fstartdate` date NOT NULL,
  `fenddate` date NOT NULL,
  PRIMARY KEY (`fundid`),
  KEY `dpt_id_idx` (`deptid`),
  CONSTRAINT `dpt_id` FOREIGN KEY (`deptid`) REFERENCES `department` (`deptid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orgfunds`
--

LOCK TABLES `orgfunds` WRITE;
/*!40000 ALTER TABLE `orgfunds` DISABLE KEYS */;
/*!40000 ALTER TABLE `orgfunds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personalbudget`
--

DROP TABLE IF EXISTS `personalbudget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personalbudget` (
  `bid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `pcid` int DEFAULT NULL,
  `bamount` float NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  PRIMARY KEY (`bid`),
  KEY `uid_idx` (`uid`),
  KEY `pcid_idx` (`pcid`),
  CONSTRAINT `pcid` FOREIGN KEY (`pcid`) REFERENCES `personalcategory` (`pcid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `login` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalbudget`
--

LOCK TABLES `personalbudget` WRITE;
/*!40000 ALTER TABLE `personalbudget` DISABLE KEYS */;
/*!40000 ALTER TABLE `personalbudget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personalcategory`
--

DROP TABLE IF EXISTS `personalcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personalcategory` (
  `pcid` int NOT NULL AUTO_INCREMENT,
  `cname` varchar(45) NOT NULL,
  `desc` varchar(45) NOT NULL,
  PRIMARY KEY (`pcid`),
  UNIQUE KEY `cname_UNIQUE` (`cname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalcategory`
--

LOCK TABLES `personalcategory` WRITE;
/*!40000 ALTER TABLE `personalcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `personalcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personalexpenditure`
--

DROP TABLE IF EXISTS `personalexpenditure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personalexpenditure` (
  `exid` int NOT NULL AUTO_INCREMENT,
  `edesc` varchar(45) NOT NULL,
  `edate` date NOT NULL,
  `tid` varchar(45) NOT NULL,
  `uid` int DEFAULT NULL,
  `pcid` int DEFAULT NULL,
  PRIMARY KEY (`exid`),
  UNIQUE KEY `tid_UNIQUE` (`tid`),
  KEY `uid_idx` (`uid`),
  KEY `expcid_idx` (`pcid`),
  CONSTRAINT `expcid` FOREIGN KEY (`pcid`) REFERENCES `personalcategory` (`pcid`),
  CONSTRAINT `exuid` FOREIGN KEY (`uid`) REFERENCES `login` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personalexpenditure`
--

LOCK TABLES `personalexpenditure` WRITE;
/*!40000 ALTER TABLE `personalexpenditure` DISABLE KEYS */;
/*!40000 ALTER TABLE `personalexpenditure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `reqid` int NOT NULL AUTO_INCREMENT,
  `reqamt` double NOT NULL,
  `reqdate` date NOT NULL,
  `reqdesc` varchar(45) NOT NULL,
  `deptid` int DEFAULT NULL,
  `reqstatus` int NOT NULL,
  PRIMARY KEY (`reqid`),
  KEY `dt_id_idx` (`deptid`),
  CONSTRAINT `dt_id` FOREIGN KEY (`deptid`) REFERENCES `department` (`deptid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(30) NOT NULL,
  PRIMARY KEY (`roleid`),
  UNIQUE KEY `rname_UNIQUE` (`rname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(4,'depthead'),(3,'organizationhead'),(2,'singleuser');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-02 16:17:27
