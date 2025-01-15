-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: parking_service_web
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `benefits`
--

DROP TABLE IF EXISTS `benefits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `benefits` (
  `benefit_id` int NOT NULL AUTO_INCREMENT,
  `benefit` text NOT NULL,
  `language_id` int NOT NULL,
  PRIMARY KEY (`benefit_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `benefits_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benefits`
--

LOCK TABLES `benefits` WRITE;
/*!40000 ALTER TABLE `benefits` DISABLE KEYS */;
INSERT INTO `benefits` VALUES (1,'Easy Park გამოირჩევა სანდო და ადაპტირებადი პარკირების მართვის სისტემით, რომელიც განკუთვნილია როგორც მცირე, ასევე დიდი ზომის საწარმოებისთვის',0),(2,'ადმინისტრაციული ხარჯების შემცირება: ავტომატიზირებული სისტემა გამორიცხავს ხელით მართვის საჭიროებას და ზოგავს დროისა და ფინანსურ რესურსებს',0),(3,'სწრაფი გადახდის შესაძლებლობა: გადახდა შესაძლებელია ნაღდი ფულით ან ბარათით გასასვლელ სადგურზე – მარტივად და სწრაფად',0),(4,'განვითარებული ადმინისტრაციული პანელი: აკონტროლეთ მნიშვნელოვანი მეტრიკები ჩვენს ინტერფეისში. დეტალური ანგარიშგება დაგეხმარებათ პარკირების სივრცეების ოპტიმიზაციაში',0),(5,'ჩვენ გთავაზობთ გამძლე და  მარტივ ტექნოლოგიას, რაც უზრუნველყოფს, რომ ნებისმიერი სერვისის საჭიროება სწრაფად და პროფესიონალურად იყოს დაკმაყოფილებული ადგილობრივი გუნდის მიერ',0),(6,'Reliable and adaptable parking management system: Suited for businesses of all sizes and types',1),(7,'Lower administrative costs: Automated systems eliminate the need for manual management, saving time and financial resources',1),(8,'Fast and secure payment: exit stations allow payments via cash or card – quick and easy',1),(9,'Advanced administrative panel: Control key metrics through our interface. Detailed reporting helps optimize parking spaces',1),(10,'Durable and simple technology: Our system is designed for resilience and ease of use, ensuring quick and professional service by a local team',1);
/*!40000 ALTER TABLE `benefits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_type`
--

DROP TABLE IF EXISTS `device_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device_type` (
  `device_type_id` int NOT NULL AUTO_INCREMENT,
  `device_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`device_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_type`
--

LOCK TABLES `device_type` WRITE;
/*!40000 ALTER TABLE `device_type` DISABLE KEYS */;
INSERT INTO `device_type` VALUES (0,'card_receiver'),(1,'card_dispenser');
/*!40000 ALTER TABLE `device_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `device_id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` text,
  `language_id` int DEFAULT NULL,
  `device_type_id` int DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  KEY `language_id` (`language_id`),
  KEY `device_type_id` (`device_type_id`),
  CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`) ON DELETE SET NULL,
  CONSTRAINT `devices_ibfk_2` FOREIGN KEY (`device_type_id`) REFERENCES `device_type` (`device_type_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (0,'ბარათის მიმღები S200','სერიის S200 ავტოსადგომის ბილეთების მიმღები აპარატი არის მოწყობილობა, რომელიც გამოიყენება ავტოსადგომების შესასვლელებში ავტომობილების წვდომის სამართავად. ის ჩვეულებრივ დამონტაჟებულია ავტომატურ ბარიერთან ერთად.\r \r ავტოსადგომის შესასვლელი სვეტი დამზადებულია გამძლე რკინის კორპუსით, რომელიც გამართულად მუშაობს როგორც შიდა, ასევე გარე პირობებში. მისი გულდასმით დამუშავებული დიზაინი და უახლესი მოდელის კომპონენტები საშუალებას გვაძლევს შევთავაზოთ ერთ-ერთი ყველაზე მცირე და კომპაქტური მოწყობილობა.\r \r მოკლედ რომ ვთქვათ, ეს არის მოწყობილობა, რომელიც შეიცავს უახლეს ტექნოლოგიებს, რაც თანამედროვე ავტოსადგომს სჭირდება, დაწყებული პარკინგზე შესვლისთვის ტელეფონის გამოყენებით, დამთავრებული სანომრე ნიშნის ამოცნობის LPR კამერით.',0,0),(1,'ticket resiever serie S200','The car park ticket dispenser serie S200 is an equipment used in entryways to parking to control vehicle access. It is usually installed with an automatic barier. The entry column to the car park column is built with a sturdy iron body, working properly both indoors and outdoors. Its careful design and its latest model components allows us to offer one of the smallest and compact machines. In short, this is an equipment that includes the latest technology that a modern car park needs, from technology for access the parking with the phone, to a LPR camera for recognition license plates.',1,0),(2,'სერიის S100 ავტოსადგომის ბილეთების გამცემ','სერიის S100 ავტოსადგომის ბილეთების გამცემ აპარატი არის მოწყობილობა, რომელიც გამოიყენება ავტოსადგომების შესასვლელებში ავტომობილების წვდომის სამართავად. ის ჩვეულებრივ დამონტაჟებულია ავტომატურ ბარიერთან ერთად.\n\nავტოსადგომის შესასვლელი სვეტი დამზადებულია გამძლე რკინის კორპუსით, რომელიც გამართულად მუშაობს როგორც შიდა, ასევე გარე პირობებში. მისი გულდასმით დამუშავებული დიზაინი და უახლესი მოდელის კომპონენტები საშუალებას გვაძლევს შევთავაზოთ ერთ-ერთი ყველაზე მცირე და კომპაქტური მოწყობილობა.\n\nმოკლედ რომ ვთქვათ, ეს არის მოწყობილობა, რომელიც შეიცავს უახლეს ტექნოლოგიებს, რაც თანამედროვე ავტოსადგომს სჭირდება, დაწყებული პარკინგზე შესვლისთვის ტელეფონის გამოყენებით, დამთავრებული სანომრე ნიშნის ამოცნობის LPR კამერით.',0,1),(3,'The car park ticket dispenser serie S100','The car park ticket reseiver serie S100 is an equipment used in entryways to parking to control vehicle access. It is usually installed with an automatic barier. The entry column to the car park column is built with a sturdy iron body, working properly both indoors and outdoors. Its careful design and its latest model components allows us to offer one of the smallest and compact machines. In short, this is an equipment that includes the latest technology that a modern car park needs, from technology for access the parking with the phone, to a LPR camera for recognition license plates.',1,1);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `faq_id` int NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `language_id` int NOT NULL,
  PRIMARY KEY (`faq_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `faq_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (1,'შეიძლება Easy Park-ის პერსონალიზაცია განსხვავებული ზომის ბიზნესებისთვის?','რა თქმა უნდა. Easy Park შექმნილია ნებისმიერი მასშტაბის დასახმარებლად, მცირე ბიზნესიდან დიდ საწარმოებამდე, რეგულირებადი ფუნქციებითა და კონფიგურაციებით.',0),(2,'როგორ მუშაობს სივრცეების რეალურ დროში მონიტორინგი ადმინისტრაციისთვის?','ჩვენი სისტემა აჩვენებს დაკავებული ადგილების რაოდენობას.',0),(3,'რა მონაცემებს გვთავაზობს ადმინისტრაციული პანელი?','ადმინისტრაციული პანელი გთავაზობთ სხვადასხვა მეტრიკებს, მათ შორის მოწყობილობაში საერთო ბარათების რაოდენობა; საპარკინგე სივრცის გამოყენების სიხშირე, სასურველი დროის მიხედვთ; დაჯამებული ან მიმდინარე თანხის ჩვენება, ბარათების რაოდენობები მოწყობილობებში.',0),(4,'როგორ ხდება გადახდა გასვლისას?','გასასვლელთან მომხმარებლებს შეუძლიათ ბარათის დაბრუნების შემდეგ გადახდა ნაღდი ფულით ან ბარათით, რაც პროცესს შეუფერხებელს ხდის.',0),(5,'Can Easy Park be customized for businesses of different sizes?','Absolutely. Easy Park is designed to support businesses of all scales, from small to large enterprises, with adjustable features and configurations.',1),(6,'How does real-time space monitoring work for administration?','Our system displays the number of occupied spaces in real time.',1),(7,'What data does the administrative panel provide?','Metrics include: Total cards in devices; Parking space usage frequency based on preferred times; Summary or ongoing payment details.',1),(8,'How is payment processed at exit points?','Customers can pay with cash or card after returning their card at the exit, ensuring a smooth process.',1);
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `features`
--

DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `features` (
  `feature_id` int NOT NULL,
  `feature` varchar(100) DEFAULT NULL,
  `language_id` int DEFAULT NULL,
  `device_type_id` int DEFAULT NULL,
  PRIMARY KEY (`feature_id`),
  KEY `language_id` (`language_id`),
  KEY `device_type_id` (`device_type_id`),
  CONSTRAINT `features_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`) ON DELETE SET NULL,
  CONSTRAINT `features_ibfk_2` FOREIGN KEY (`device_type_id`) REFERENCES `device_type` (`device_type_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `features`
--

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (0,'ფიჩერი 1 დივაისი 1',0,0),(1,'feature 1 device 1',1,0),(2,'ფიჩერი 1 დივაისი 2',0,1),(3,'feature 1 device 2',1,1),(4,'ფიჩერი 2 დივაისი 1',0,0),(5,'feature 2 device 1',1,0),(6,'ფიჩერი 2 დივაისი 2',0,1),(7,'feature 2 device 2',1,1);
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(50) DEFAULT NULL,
  `device_type_id` int DEFAULT NULL,
  `is_main` tinyint DEFAULT '0',
  PRIMARY KEY (`image_id`),
  KEY `images_type_ibfk_2_idx` (`device_type_id`),
  CONSTRAINT `images_type_ibfk_2` FOREIGN KEY (`device_type_id`) REFERENCES `device_type` (`device_type_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'/images/services/monitoring.svg',NULL,0),(2,'/images/services/paying.svg',NULL,0),(3,'/images/services/adminPanel.svg',NULL,0),(4,'/images/services/personalSystem.svg',NULL,0),(5,'/images/services/support.svg',NULL,0),(6,'/images/services/automatization.svg',NULL,0),(7,'/images/services/statistics.svg',NULL,0),(8,'/images/devices/device01.svg',0,1),(9,'/images/devices/device02.svg',0,0),(10,'/images/devices/device03.svg',0,0),(11,'/images/devices/device01.svg',1,1),(12,'/images/devices/device02.svg',1,0),(13,'/images/devices/device03.svg',1,0);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `language_id` int NOT NULL AUTO_INCREMENT,
  `language` varchar(10) NOT NULL,
  PRIMARY KEY (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (0,'Ge'),(1,'En');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(30) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `language_id` int NOT NULL,
  `description` text,
  `image_id` int DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  KEY `language_id` (`language_id`),
  KEY `fk_image_id` (`image_id`),
  CONSTRAINT `fk_image_id` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'სივრცის მონიტორინგი','მიმდინარე დროში სივრცეების მონიტორინგი',0,'მიმდინარე დროში, თვალყური ადევნეთ დაკავებული ადგილების რაოდენობას.',1),(2,'მოქნილი გადახდის პარამეტრები','მოქნილი გადახდის პარამეტრები',0,'მომხმარებლებს შეუძლიათ გასასვლელში დამონტაჟებულ მოწყობილობასთან გადახდა, ნაღდი ფულით ან ბარათით, რაც ამარტივებს პროცესს.',2),(3,'ადმინისტრაციული პანელი','კომპლექსური ადმინისტრაციული პანელი',0,'მიიღეთ მნიშვნელოვანი სტატისტიკა და მეტრიკები, როგორიცაა: მიმდინარე დროში დაკავებული ადგილების რაოდენობა, მიმღებ და გამცემ მოწყობილობაში ბარათების რაოდენობის მონიტორინგი, დაჯამებული ან მიმდინარე თანხის მონიტორინგი.',3),(4,'პერსონალიზებადი სისტემა','პერსონალიზირებადი პარკირების მართვის სისტემა',0,'Easy Park შეიძლება ადაპტირდეს ნებისმიერი ზომის ან ტიპის სივრცეზე, რაც უზრუნველყოფს, თქვენი ობიექტის, უნიკალურ საჭიროებებზე მორგებულ კონფიგურაციას.',4),(5,'ადგილობრივი მხარდაჭერა','ადგილობრივი მხარდაჭერა',0,'ჩვენი ტექნიკის წარმოება და სერვისით უზრუნველყოფა ხდება საქართველოში, რაც უზრუნველყოფს სწრაფ და სანდო მხარდაჭერას თქვენი ოპერაციების შეუფერხებლად ფუნქციონირებისათვის. ამასთანავე ჩვენი გუნდი მუდმივად ზრუნავს სისტემის ახალი ფუნქციებით აღჭურვაზე.',5),(6,'ავტომატიზირებული სისტემა','ავტომატიზირებული სისტემა',0,'ავტომატიზირებული სისტემა გამორიცხავს ხელით მართვის საჭიროებას რაც ზოგავს ადამიანურ რესურსებს',6),(7,'სტატისტიკები ',NULL,0,NULL,7),(8,'Space Monitoring','Real-time space monitoring',1,'Keep track of the number of occupied spaces in real time.',1),(9,'Flexible Payment Options','Flexible payment options',1,'Users can pay at the exit terminal using cash or card, simplifying the process.',2),(10,'Admin Panel','Comprehensive admin panel',1,'Access critical statistics and metrics, such as the real-time number of occupied spaces, monitoring the number of cards in entry and exit devices, and tracking cumulative or current funds.',3),(11,'Customizable System','Customizable parking management system',1,'Easy Park can adapt to any size or type of space, ensuring a configuration tailored to the unique needs of your property.',4),(12,'Local Support','Local support',1,'Our equipment is manufactured and serviced in Georgia, providing quick and reliable support to ensure uninterrupted operations. Additionally, our team continuously enhances the system with new features.',5),(13,'Automated System','Automated system',1,'The automated system eliminates the need for manual management, saving human resources.',6),(14,'Statistics',NULL,1,NULL,7);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-15 20:41:15
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: parkingsystem
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `accounting`
--

DROP TABLE IF EXISTS `accounting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounting` (
  `accounting_id` int NOT NULL AUTO_INCREMENT,
  `dispenser_device_id` varchar(50) DEFAULT NULL,
  `collector_device_id` varchar(50) DEFAULT NULL,
  `card_uid` varchar(50) DEFAULT NULL,
  `income_time` datetime DEFAULT NULL,
  `outcome_time` datetime DEFAULT NULL,
  `price` int DEFAULT '0',
  PRIMARY KEY (`accounting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounting`
--

LOCK TABLES `accounting` WRITE;
/*!40000 ALTER TABLE `accounting` DISABLE KEYS */;
INSERT INTO `accounting` VALUES (6,'1','11','CD636130','2024-11-09 16:37:28','2024-11-11 17:54:49',33),(8,'1',NULL,'CD636130','2024-11-11 17:58:01',NULL,0);
/*!40000 ALTER TABLE `accounting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `balances`
--

DROP TABLE IF EXISTS `balances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `balances` (
  `balance_id` int NOT NULL AUTO_INCREMENT,
  `create_date` date DEFAULT NULL,
  `subsidiary_money_amount` double DEFAULT NULL,
  `cash_amount` double DEFAULT NULL,
  `debit_card_transaction_amount` double DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  PRIMARY KEY (`balance_id`),
  KEY `FK_balances_devices` (`device_id`),
  CONSTRAINT `FK_balances_devices` FOREIGN KEY (`device_id`) REFERENCES `devices` (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balances`
--

LOCK TABLES `balances` WRITE;
/*!40000 ALTER TABLE `balances` DISABLE KEYS */;
/*!40000 ALTER TABLE `balances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `card_uid` varchar(12) NOT NULL DEFAULT '0',
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`card_id`),
  UNIQUE KEY `card_uid` (`card_uid`),
  KEY `FK_cards_roles` (`role_id`),
  CONSTRAINT `FK_cards_roles` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (66,'grtrtrt',1),(67,'grtrtrtrtr',1),(69,'ff',1),(70,'ffd',1),(71,'sd',1),(72,'sdcc',1),(73,'sdccdf',1),(74,'sdccdfdfd',1),(76,'eeeee',1);
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counters`
--

DROP TABLE IF EXISTS `counters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counters` (
  `counter_id` int NOT NULL AUTO_INCREMENT,
  `counter_name` varchar(50) NOT NULL DEFAULT '0',
  `tolerance_time` int DEFAULT NULL,
  `first_hours` int DEFAULT NULL,
  `during_3_hours` int DEFAULT NULL,
  `until_23_oclock` int DEFAULT NULL,
  `until_9_oclock` int DEFAULT NULL,
  `every_24_hours` int DEFAULT NULL,
  PRIMARY KEY (`counter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counters`
--

LOCK TABLES `counters` WRITE;
/*!40000 ALTER TABLE `counters` DISABLE KEYS */;
INSERT INTO `counters` VALUES (1,'მრიცხველი 1',15,2,1,2,3,15),(2,'მრიცხველი ბ პარკინგისთვის',20,4,2,5,6,25);
/*!40000 ALTER TABLE `counters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `device_id` int NOT NULL AUTO_INCREMENT,
  `external_device_id` int DEFAULT NULL,
  `devicetype_id` int DEFAULT NULL,
  `counter_id` int DEFAULT NULL,
  `device_name` varchar(250) DEFAULT NULL,
  `device_subsidiary_money_amount` double DEFAULT '0',
  `device_cards_to_give_quantity` int DEFAULT '0',
  `device_cards_busy_quantity` int DEFAULT '0',
  `device_cards_problematic_quantity` int DEFAULT '0',
  `device_cards_received_quantity` int DEFAULT '0',
  `has_monitor` bit(1) DEFAULT NULL,
  `has_cash_receiver` bit(1) DEFAULT NULL,
  `has_subsidiary_money_receiver` bit(1) DEFAULT NULL,
  `has_debit_card_transaction` bit(1) DEFAULT NULL,
  `client_mode` int DEFAULT '0',
  `employee_mode` int DEFAULT '0',
  PRIMARY KEY (`device_id`),
  KEY `FK_devices_devicetypes` (`devicetype_id`),
  KEY `FK_devices_counters` (`counter_id`),
  CONSTRAINT `FK_devices_counters` FOREIGN KEY (`counter_id`) REFERENCES `counters` (`counter_id`),
  CONSTRAINT `FK_devices_devicetypes` FOREIGN KEY (`devicetype_id`) REFERENCES `devicetypes` (`devicetype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (14,10,2,NULL,'ბარათის გამცემი 1',0,300,0,0,0,_binary '',_binary '\0',_binary '\0',_binary '\0',2,2),(15,11,1,NULL,'ბარათის გამცემი 1',0,1,0,0,0,_binary '\0',_binary '\0',_binary '\0',_binary '\0',0,0);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devicetypes`
--

DROP TABLE IF EXISTS `devicetypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devicetypes` (
  `devicetype_id` int NOT NULL AUTO_INCREMENT,
  `devicetype_name` varchar(100) DEFAULT NULL,
  `devicetype_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`devicetype_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devicetypes`
--

LOCK TABLES `devicetypes` WRITE;
/*!40000 ALTER TABLE `devicetypes` DISABLE KEYS */;
INSERT INTO `devicetypes` VALUES (1,'ბარათის მიმღები','card-receiver'),(2,'ბარათის გამცემი','card-giver');
/*!40000 ALTER TABLE `devicetypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  `role_name_description` varchar(50) DEFAULT NULL,
  `role_priority` int DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'client','კლიენტი',1),(2,'employee','თანამშრომელი',2);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('027e38a8-551e-4509-aad6-c270909a97ec',1758881039,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-08-30T10:45:14.553Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('2572921a-918d-4076-8ab3-ccedf97d58be',1764680804,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-12-02T13:05:39.950Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('33905739-69e2-4dbf-a362-370dfe5f49b7',1763419736,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-11-17T21:38:52.279Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('3674ad65-ae45-4a69-bd9d-4b325f4caafb',1764669764,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-12-02T09:58:51.957Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('41a953a3-ad0c-4807-a08c-4d086c1936bf',1756481698,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-08-28T10:40:02.634Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('476545d4-1303-4c28-a32f-b03630c52662',1763734400,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-11-21T10:02:00.202Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('53bec7b0-0cb9-4fb2-b906-677bbc266c02',1763742153,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-11-19T11:36:30.159Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('5913a474-6d4c-4cb7-9579-764faa4dc08d',1764695212,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-12-02T17:02:24.828Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('5a4c5594-12e0-4614-8c0f-ab0146b59f69',1764670809,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-12-02T10:19:53.386Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('68873ef1-f124-430c-9d96-dc58dd560e81',1764694798,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-12-02T13:14:41.113Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('7586b62a-5b4b-43da-861e-5f5b92d9f532',1764146439,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-11-26T08:40:39.193Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('84e91cc8-855d-4741-960a-69b858b68a12',1761735431,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-10-28T14:03:10.492Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('8e53c8a6-91a4-4d48-b6b1-605759e056b7',1761911537,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-09-27T09:42:55.515Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('91318431-f87a-494e-8cdd-0cd1a4f64e10',1764862807,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-12-04T14:02:59.800Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('99956e25-1760-4f77-9189-a763d0899352',1768311711,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-01-13T13:26:03.658Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('a6624cb1-a935-486c-9571-3ec48e14ac66',1764673023,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-12-02T10:55:23.629Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('ae7fc6d7-caf6-4bd2-8b4c-32fa50f85864',1768486975,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-01-15T14:15:25.516Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('b65a9b3d-0397-403e-a907-b2a62f8f7415',1763436649,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-11-17T22:52:51.756Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('b9ea06a9-555b-4ffb-8e0a-2760b9d6ef28',1764852640,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-12-02T17:08:04.544Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('c511bbe1-3a89-4a84-b166-bf4fc1d840b6',1755961986,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-08-22T14:29:00.869Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('c9cedca9-b11e-4046-b74e-064d1da5eb40',1768316485,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2026-01-13T13:48:48.822Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('d0536077-19cf-4ec0-bba0-377686288d54',1761658753,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-10-28T12:43:57.676Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('d08f335b-8855-4b1e-963a-87cbd366d470',1764681031,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-12-02T13:09:08.585Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('d1dff4bd-e151-489d-bc15-abd728d46bb6',1762881552,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-11-04T13:37:48.500Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('d34385fb-2750-4a2e-8c20-ea3495df9e74',1762185926,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-11-02T11:34:34.237Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('e660a54f-1a79-4b64-841a-f4226d086e48',1764673041,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-12-02T10:57:18.516Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('eaefd22f-9ff1-4e7e-bf20-0a205686e86e',1758888564,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-09-26T11:08:45.379Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('f04689a7-3cb0-453a-ba6a-0b1de7e8946b',1762440948,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-11-06T13:51:13.239Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}'),('fe9a9608-fbd0-46ca-b008-a11b7e5fa635',1763632226,'{\"cookie\":{\"originalMaxAge\":31536000000,\"expires\":\"2025-11-17T19:42:31.357Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":true},\"Auth\":{\"user_id\":1,\"user_name\":\"admin\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2b$10$Po27OM80m/jaT57YwxPAce8s0f62/FZUZvNWkOgH7LprJVdFUtxCC');
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

-- Dump completed on 2025-01-15 20:41:15
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: electronic-component-logistics-schema
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `components`
--

DROP TABLE IF EXISTS `components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `components` (
  `id` int NOT NULL AUTO_INCREMENT,
  `family` varchar(100) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `purpose` text,
  `package_type` varchar(100) DEFAULT NULL,
  `nominal_value` varchar(100) DEFAULT NULL,
  `electrical_supply` varchar(100) DEFAULT NULL,
  `unit_cost` int DEFAULT NULL,
  `other_cost` varchar(10) DEFAULT NULL,
  `available_quantity` int DEFAULT NULL,
  `storage_drawer` varchar(10) DEFAULT NULL,
  `storage_shelf` varchar(10) DEFAULT NULL,
  `suppliers_name` varchar(10) DEFAULT NULL,
  `suppliers_contact_person` varchar(100) DEFAULT NULL,
  `suppliers_contact_details` text,
  `receipt_date` varchar(50) DEFAULT NULL,
  `data_sheet` varchar(100) DEFAULT NULL,
  `invoice_number` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components`
--

LOCK TABLES `components` WRITE;
/*!40000 ALTER TABLE `components` DISABLE KEYS */;
INSERT INTO `components` VALUES (224,'ere','erer','','','','',20,'',30,'','','','','',NULL,'/files/dataSheet/1733215917996-1.pdf','');
/*!40000 ALTER TABLE `components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_components`
--

DROP TABLE IF EXISTS `device_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device_components` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `component_id` int NOT NULL,
  `quantity_per_device` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=290 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_components`
--

LOCK TABLES `device_components` WRITE;
/*!40000 ALTER TABLE `device_components` DISABLE KEYS */;
INSERT INTO `device_components` VALUES (236,68,186,6),(237,68,186,17),(239,70,187,9),(240,70,204,3),(241,70,188,10),(243,69,205,2),(244,70,205,10),(280,67,200,9),(286,68,198,20),(287,68,200,2),(288,68,197,9),(289,86,224,2);
/*!40000 ALTER TABLE `device_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `purpose` text,
  `electrical_supply` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `available_quantity` int DEFAULT NULL,
  `unit_cost` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (86,'uu','','','',60,NULL);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(45) NOT NULL,
  `component_id` int DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_device_idx` (`device_id`),
  KEY `fk_component` (`component_id`),
  CONSTRAINT `fk_component` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_device` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=322 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-15 20:41:15
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: erp_electronics
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `components`
--

DROP TABLE IF EXISTS `components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `components` (
  `id` int NOT NULL AUTO_INCREMENT,
  `family` varchar(100) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `purpose` text,
  `package_type` varchar(100) DEFAULT NULL,
  `nominal_value` varchar(100) DEFAULT NULL,
  `electrical_supply` varchar(100) DEFAULT NULL,
  `unit_cost` int DEFAULT NULL,
  `other_cost` varchar(10) DEFAULT NULL,
  `available_quantity` int DEFAULT NULL,
  `required_quantity` int DEFAULT NULL,
  `suppliers_name` varchar(50) DEFAULT NULL,
  `suppliers_contact_details` text,
  `receipt_date` varchar(50) DEFAULT NULL,
  `data_sheet` varchar(100) DEFAULT NULL,
  `invoice_number` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components`
--

LOCK TABLES `components` WRITE;
/*!40000 ALTER TABLE `components` DISABLE KEYS */;
INSERT INTO `components` VALUES (1,'Electrical','Capacitor','Energy storage','Box','100µF','220V',500,'50',100,150,'ElecSupplies','john@elecsupplies.com','2025-01-01','capacitor_data.pdf','INV12345'),(2,'Mechanical','Motor','Power generation','Carton','5HP','110V',1500,'100',50,75,'MotorCo','jane@motorco.com','2025-01-02','motor_data.pdf','INV12346'),(3,'Electrical','Switch','Circuit control','Bag','10A','230V',200,'20',200,250,'SwitchGear','paul@switchgear.com','2025-01-03','switch_data.pdf','INV12347'),(4,'Mechanical','Gearbox','Mechanical transmission','Box','2HP','380V',3000,'150',30,60,'GearTech','alice@geartech.com','2025-01-04','gearbox_data.pdf','INV12348'),(5,'Electrical','Transformer','Voltage regulation','Crate','500KVA','415V',8000,'250',20,30,'TransPower','mike@transpower.com','2025-01-05','transformer_data.pdf','INV12349'),(6,'Electrical','Capacitor3','Energy storage','Carton','200µF','250V',600,'60',120,180,'ElecSolutions','emily@elecsolutions.com','2025-01-06','capacitor_data_v2.pdf','INV12350'),(7,'Mechanical','Motor3','Power generation','Wooden crate','10HP','220V',2500,'200',70,95,'PowerMotors','chris@powermotors.com','2025-01-07','motor_data_v2.pdf','INV12351'),(8,'Electrical','Switch3','Circuit control','Plastic case','15A','240V',300,'30',250,300,'ControlGear','linda@controlgear.com','2025-01-08','switch_data_v2.pdf','INV12352'),(9,'Mechanical','Gearbox3','Mechanical transmission','Metal case','3HP','400V',4000,'180',40,80,'PrecisionGears','samuel@precisiongears.com','2025-01-09','gearbox_data_v2.pdf','INV12353'),(10,'Electrical','Transformer3','Voltage regulation','Pallet','750KVA','430V',10000,'300',25,35,'VoltagePros','sarah@voltagepros.com','2025-01-10','transformer_data_v2.pdf','INV12354'),(12,'Passive Components','Motor4','Voltage Divider','SMD','10kΩ','5V',5,'6',500,1000,'ElectroParts Co.','contact@electroparts.com','2025-01-10',NULL,'INV-2025-001'),(13,'Passive Components','Motorsky','Voltage Divider','SMD','10kΩ','5V',5,'6',500,1000,'ElectroParts Co.','contact@electroparts.com','2025-01-10',NULL,'INV-2025-001'),(14,'Passive Components','Motorsk','Voltage Divider','SMD','10kΩ','5V',5,'6',500,1000,'ElectroParts Co.','contact@electroparts.com','2025-01-10',NULL,'INV-2025-001'),(15,'Passive Components','Motorskwee','Voltage Divider','SMD','10kΩ','5V',5,'6',500,1000,'ElectroParts Co.','contact@electroparts.com','2025-01-10',NULL,'INV-2025-001'),(16,'Passive Components','Mo','Voltage Divider','SMD','10kΩ','5V',5,'6',500,1000,'ElectroParts Co.','contact@electroparts.com','2025-01-10',NULL,'INV-2025-001'),(17,'Passive Components','Moeeee','Voltage Divider','SMD','10kΩ','5V',5,'6',500,1000,'ElectroParts Co.','contact@electroparts.com','2025-01-10',NULL,'INV-2025-001');
/*!40000 ALTER TABLE `components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_components`
--

DROP TABLE IF EXISTS `device_components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device_components` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `component_id` int NOT NULL,
  `quantity_per_device` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  KEY `component_id` (`component_id`),
  CONSTRAINT `device_components_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE,
  CONSTRAINT `device_components_ibfk_2` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_components`
--

LOCK TABLES `device_components` WRITE;
/*!40000 ALTER TABLE `device_components` DISABLE KEYS */;
/*!40000 ALTER TABLE `device_components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `purpose` text,
  `electrical_supply` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `available_quantity` int DEFAULT NULL,
  `unit_cost` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `component_id` int DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_device_idx` (`device_id`),
  KEY `fk_component` (`component_id`),
  CONSTRAINT `fk_component` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_device` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'uirl1',1,NULL),(2,'url2',1,NULL);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storage`
--

DROP TABLE IF EXISTS `storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `component_id` int DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  `cabinet` varchar(10) DEFAULT NULL,
  `drawer` varchar(10) DEFAULT NULL,
  `shelf` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `storage_ibfk_1` (`component_id`),
  KEY `storage_ibfk_2` (`device_id`),
  CONSTRAINT `storage_ibfk_1` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`),
  CONSTRAINT `storage_ibfk_2` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage`
--

LOCK TABLES `storage` WRITE;
/*!40000 ALTER TABLE `storage` DISABLE KEYS */;
INSERT INTO `storage` VALUES (1,1,NULL,'a','2','a2'),(2,2,NULL,'b','3','b3'),(3,3,NULL,'c','5','c5'),(4,4,NULL,'d','7','d7'),(5,5,NULL,'e','9','e9'),(6,6,NULL,'f','11','f11'),(7,7,NULL,'j','13','j13'),(8,8,NULL,'h','15','h15'),(9,9,NULL,'i','17','j17'),(10,10,NULL,'j','19','j19');
/*!40000 ALTER TABLE `storage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-15 20:41:15
