-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.39 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for erp_electronics
CREATE DATABASE IF NOT EXISTS `erp_electronics` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `erp_electronics`;

-- Dumping structure for table erp_electronics.components
CREATE TABLE IF NOT EXISTS `components` (
  `id` int NOT NULL AUTO_INCREMENT,
  `family` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purpose` text COLLATE utf8mb4_unicode_ci,
  `package_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nominal_value` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `electrical_supply` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit_cost` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `other_cost` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `available_quantity` int DEFAULT NULL,
  `required_quantity` int DEFAULT NULL,
  `suppliers_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `suppliers_contact_details` text COLLATE utf8mb4_unicode_ci,
  `receipt_date` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_sheet` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table erp_electronics.components: ~28 rows (approximately)
INSERT INTO `components` (`id`, `family`, `name`, `purpose`, `package_type`, `nominal_value`, `electrical_supply`, `unit_cost`, `other_cost`, `available_quantity`, `required_quantity`, `suppliers_name`, `suppliers_contact_details`, `receipt_date`, `data_sheet`, `invoice_number`) VALUES
	(2, 'Mechanical', 'Motor', 'Power generation', 'Carton', '5HP', '110V', '1500', '100', 50, 75, 'MotorCo', 'jane@motorco.com', '2025-01-02', 'motor_data.pdf', 'INV12346'),
	(3, 'Electrical', 'Switch', 'Circuit control', 'Bag', '10A', '230V', '200', '20', 200, 250, 'SwitchGear', 'paul@switchgear.com', '2025-01-03', 'switch_data.pdf', 'INV12347'),
	(4, 'Mechanical', 'Gearbox', 'Mechanical transmission', 'Box', '2HP', '380V', '3000', '150', 30, 60, 'GearTech', 'alice@geartech.com', '2025-01-04', 'gearbox_data.pdf', 'INV12348'),
	(5, 'Electrical', 'Transformer', 'Voltage regulation', 'Crate', '500KVA', '415V', '8000', '250', 20, 30, 'TransPower', 'mike@transpower.com', '2025-01-05', 'transformer_data.pdf', 'INV12349'),
	(6, 'Electrical', 'Capacitor3', 'Energy storage', 'Carton', '200µF', '250V', '600', '60', 120, 180, 'ElecSolutions', 'emily@elecsolutions.com', '2025-01-06', 'capacitor_data_v2.pdf', 'INV12350'),
	(7, 'Mechanical', 'Motor3', 'Power generation', 'Wooden crate', '10HP', '220V', '2500', '200', 70, 95, 'PowerMotors', 'chris@powermotors.com', '2025-01-07', 'motor_data_v2.pdf', 'INV12351'),
	(8, 'Electrical', 'Switch3', 'Circuit control', 'Plastic case', '15A', '240V', '300', '30', 250, 300, 'ControlGear', 'linda@controlgear.com', '2025-01-08', 'switch_data_v2.pdf', 'INV12352'),
	(9, 'Mechanical', 'Gearbox3', 'Mechanical transmission', 'Metal case', '3HP', '400V', '4000', '180', 40, 80, 'PrecisionGears', 'samuel@precisiongears.com', '2025-01-09', 'gearbox_data_v2.pdf', 'INV12353'),
	(10, 'Electrical', 'Transformer3', 'Voltage regulation', 'Pallet', '750KVA', '430V', '10000', '300', 25, 35, 'VoltagePros', 'sarah@voltagepros.com', '2025-01-10', 'transformer_data_v2.pdf', 'INV12354'),
	(12, 'Passive Components', 'Motor4', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(13, 'Passive Components', 'Motorsky', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(14, 'Passive Components', 'Motorsk', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(15, 'Passive Components', 'Motorskwee', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(16, 'Passive Components', 'Mo', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(17, 'Passive Components', 'Moeeee', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(36, '', 'gggggggg', '', '', '', '', '', '', 2, 7, '', '', '', NULL, ''),
	(37, '', 'sdsd', '', '', '', '', '', '', 2, 55, '', '', '', '1743117654368-RAQNVRC.pdf', '');

-- Dumping structure for table erp_electronics.devices
CREATE TABLE IF NOT EXISTS `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `purpose` text COLLATE utf8mb4_unicode_ci,
  `electrical_supply` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `available_quantity` int DEFAULT NULL,
  `unit_cost` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table erp_electronics.devices: ~17 rows (approximately)
INSERT INTO `devices` (`id`, `name`, `purpose`, `electrical_supply`, `size`, `available_quantity`, `unit_cost`) VALUES
	(1, 'Device 1', 'Industrial', '220V', 'Medium', 10, '150'),
	(2, 'Device 2', 'Medical', '110V', 'Small', 5, '200'),
	(3, 'Device 3', 'Commercial', '220V', 'Large', 8, '300'),
	(4, 'Device 4', 'Residential', '110V', 'Medium', 12, '250'),
	(5, 'Device 5', 'Automotive', '12V', 'Compact', 20, '180'),
	(6, 'Device 6', 'Aerospace', '28V', 'Mini', 3, '500'),
	(7, 'Device 7', 'Marine', '110V', 'Large', 6, '400'),
	(8, 'Device 8', 'Industrial', '380V', 'Extra Large', 4, '600'),
	(9, 'Device 9', 'Medical', '220V', 'Medium', 7, '275'),
	(10, 'Device 10', 'Commercial', '110V', 'Small', 15, '120'),
	(11, 'Device 11', 'Residential', '220V', 'Medium', 9, '210'),
	(12, 'Device 12', 'Automotive', '24V', 'Compact', 25, '130'),
	(13, 'Device 13', 'Aerospace', '115V', 'Mini', 2, '700'),
	(14, 'Device 14', 'Marine', '12V', 'Medium', 8, '320'),
	(15, 'Device 15', 'Industrial', '110V', 'Small', 10, '145'),
	(16, 'Device 16', 'Medical', '220V', 'Large', 6, '275'),
	(17, 'Device 17', 'Commercial', '380V', 'Extra Large', 3, '500');

-- Dumping structure for table erp_electronics.device_components
CREATE TABLE IF NOT EXISTS `device_components` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `component_id` int NOT NULL,
  `quantity_per_device` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  KEY `component_id` (`component_id`),
  CONSTRAINT `device_components_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `device_components_ibfk_2` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table erp_electronics.device_components: ~0 rows (approximately)

-- Dumping structure for table erp_electronics.images
CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `component_id` int DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_device_idx` (`device_id`),
  KEY `fk_component` (`component_id`),
  CONSTRAINT `fk_component` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_device` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table erp_electronics.images: ~0 rows (approximately)

-- Dumping structure for table erp_electronics.notifications
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `component_id` int DEFAULT NULL,
  `activeStatus` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_notifications_components` (`component_id`),
  CONSTRAINT `FK_notifications_components` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table erp_electronics.notifications: ~2 rows (approximately)
INSERT INTO `notifications` (`id`, `component_id`, `activeStatus`, `created_at`) VALUES
	(3, 37, 1, '2025-04-01 00:41:53'),
	(5, 36, 1, '2025-07-02 00:15:01');

-- Dumping structure for table erp_electronics.storage
CREATE TABLE IF NOT EXISTS `storage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `component_id` int DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  `cabinet` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drawer` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shelf` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `storage_ibfk_1` (`component_id`),
  KEY `storage_ibfk_2` (`device_id`),
  CONSTRAINT `storage_ibfk_1` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `storage_ibfk_2` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table erp_electronics.storage: ~12 rows (approximately)
INSERT INTO `storage` (`id`, `component_id`, `device_id`, `cabinet`, `drawer`, `shelf`) VALUES
	(2, 2, NULL, 'b', '3', 'b3'),
	(3, 3, NULL, 'c', '5', 'c5'),
	(4, 4, NULL, 'd', '7', 'd7'),
	(5, 5, NULL, 'e', '9', 'e9'),
	(6, 6, NULL, 'f', '11', 'f11'),
	(7, 7, NULL, 'j', '13', 'j13'),
	(8, 8, NULL, 'h', '15', 'h15'),
	(9, 9, NULL, 'i', '17', 'j17'),
	(10, 10, NULL, 'j', '19', 'j19'),
	(13, NULL, NULL, '', '', ''),
	(24, 36, NULL, '', '', ''),
	(25, 37, NULL, '', '20', '7v');

-- Dumping structure for trigger erp_electronics.insert_component_notification
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `insert_component_notification` AFTER INSERT ON `components` FOR EACH ROW BEGIN
    IF NEW.required_quantity > NEW.available_quantity THEN
        IF NOT EXISTS (
            SELECT 1 FROM notifications WHERE component_id = NEW.id
        ) THEN
            INSERT INTO notifications (component_id, activeStatus, created_at)
            VALUES (NEW.id, 1, NOW());
        END IF;
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger erp_electronics.update_component_notification
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `update_component_notification` AFTER UPDATE ON `components` FOR EACH ROW BEGIN
    IF NEW.required_quantity > NEW.available_quantity THEN
        IF NOT EXISTS (
            SELECT 1 FROM notifications WHERE component_id = NEW.id
        ) THEN
            INSERT INTO notifications (component_id, activeStatus, created_at)
            VALUES (NEW.id, 1, NOW());
        END IF;
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
