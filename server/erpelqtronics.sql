-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.7.1-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
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
CREATE DATABASE IF NOT EXISTS `erp_electronics` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `erp_electronics`;

-- Dumping structure for table erp_electronics.components
CREATE TABLE IF NOT EXISTS `components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `family` varchar(100) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `purpose` text DEFAULT NULL,
  `package_type` varchar(100) DEFAULT NULL,
  `nominal_value` varchar(100) DEFAULT NULL,
  `electrical_supply` varchar(100) DEFAULT NULL,
  `unit_cost` varchar(10) DEFAULT NULL,
  `other_cost` varchar(10) DEFAULT NULL,
  `available_quantity` int(11) DEFAULT NULL,
  `required_quantity` int(11) DEFAULT NULL,
  `suppliers_name` varchar(50) DEFAULT NULL,
  `suppliers_contact_details` text DEFAULT NULL,
  `receipt_date` varchar(50) DEFAULT NULL,
  `data_sheet` varchar(300) DEFAULT NULL,
  `invoice_number` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table erp_electronics.components: ~22 rows (approximately)
DELETE FROM `components`;
INSERT INTO `components` (`id`, `family`, `name`, `purpose`, `package_type`, `nominal_value`, `electrical_supply`, `unit_cost`, `other_cost`, `available_quantity`, `required_quantity`, `suppliers_name`, `suppliers_contact_details`, `receipt_date`, `data_sheet`, `invoice_number`) VALUES
	(1, 'Electrical', 'Capacitor', 'Energy storage', 'Box', '100µF', '220V', '500', '50', 100, 150, 'ElecSupplies', 'john@elecsupplies.com', '2025-01-01', 'capacitor_data.pdf', 'INV12345'),
	(2, 'Mechanical', 'Motor', 'Power generation', 'Carton', '5HP', '110V', '1500', '100', 50, 75, 'MotorCo', 'jane@motorco.com', '2025-01-02', 'motor_data.pdf', 'INV12346'),
	(3, 'Electrical', 'Switch', 'Circuit control', 'Bag', '10A', '230V', '200', '20', 200, 250, 'SwitchGear', 'paul@switchgear.com', '2025-01-03', 'switch_data.pdf', 'INV12347'),
	(4, 'Mechanical', 'Gearbox', 'Mechanical transmission', 'Box', '2HP', '380V', '3000', '150', 30, 60, 'GearTech', 'alice@geartech.com', '2025-01-04', 'gearbox_data.pdf', 'INV12348'),
	(5, 'Electrical', 'Transformer', 'Voltage regulation', 'Crate', '500KVA', '415V', '8000', '250', 20, 30, 'TransPower', 'mike@transpower.com', '2025-01-05', 'transformer_data.pdf', 'INV12349'),
	(6, 'Electrical', 'Capacitor3', 'Energy storage', 'Carton', '200µF', '250V', '600', '60', 120, 180, 'ElecSolutions', 'emily@elecsolutions.com', '2025-01-06', 'capacitor_data_v2.pdf', 'INV12350'),
	(7, 'Mechanical', 'Motor3', 'Power generation', 'Wooden crate', '10HP', '220V', '2500', '200', 70, 95, 'PowerMotors', 'chris@powermotors.com', '2025-01-07', 'motor_data_v2.pdf', 'INV12351'),
	(8, 'Electrical', 'Switch3', 'Circuit control', 'Plastic case', '15A', '240V', '300', '30', 250, 300, 'ControlGear', 'linda@controlgear.com', '2025-01-08', 'switch_data_v2.pdf', 'INV12352'),
	(9, 'Mechanical', 'Gearbox3', 'Mechanical transmission', 'Metal case', '3HP', '400V', '4000', '180', 40, 80, 'PrecisionGears', 'samuel@precisiongears.com', '2025-01-09', 'gearbox_data_v2.pdf', 'INV12353'),
	(10, 'Electrical', 'Transformer3', 'Voltage regulation', 'Pallet', '750KVA', '430V', '10000', '300', 25, 35, 'VoltagePros', 'sarah@voltagepros.com', '2025-01-10', 'transformer_data_v2.pdf', 'INV12354'),
	(11, 'Passive Components', 'Motor4', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(12, 'Passive Components', 'Motorsky', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(13, 'Passive Components', 'Motorsk', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 90, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(14, 'Passive Components', 'Motorskwee', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(15, 'Passive Components', 'Mo', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 600, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(16, 'Passive Components', 'Moeeee', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(17, 'Passive Components', 'Moeeee4', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', NULL, 'INV-2025-001'),
	(18, 'Passive Components', 'Mos', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 500, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', '1742989043952-1.pdf', 'INV-2025-001'),
	(19, 'Passive Components', 'Motorskweeg', 'Voltage Divider', 'SMD', '10kΩ', '5V', '5', '6', 2000, 1000, 'ElectroParts Co.', 'contact@electroparts.com', '2025-01-10', '1742988861050-1.pdf', 'INV-2025-001'),
	(20, 'Electrical', 'Switch4', 'Circuit control', 'Plastic case', '15A', '240V', '300', '30', 45, 50, 'ControlGear', 'linda@controlgear.com', '2025-01-08', '1742988724475-3.pdf', 'INV12352'),
	(24, '', 'jhjbn', '', '', '', '', '', '', 12, 10, '', '', '', NULL, ''),
	(25, '', 'wwwq', '', '', '', '', '', '', 3, 5, '', '', '', '1743522500315-www.carfaxonline.com-2.pdf', '');

-- Dumping structure for table erp_electronics.devices
CREATE TABLE IF NOT EXISTS `devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `purpose` text DEFAULT NULL,
  `electrical_supply` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `available_quantity` int(11) DEFAULT NULL,
  `unit_cost` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table erp_electronics.devices: ~21 rows (approximately)
DELETE FROM `devices`;
INSERT INTO `devices` (`id`, `name`, `purpose`, `electrical_supply`, `size`, `available_quantity`, `unit_cost`) VALUES
	(2, 'Device Alpha', NULL, 'Supply A', 'Small', 100, 26),
	(3, 'Device Beta', NULL, 'Supply B', 'Medium', 200, 30),
	(4, 'Device Gamma', NULL, 'Supply C', 'Large', 150, 41),
	(5, 'Device Delta', NULL, 'Supply A', 'Medium', 120, 35),
	(6, 'Device Epsilon', NULL, 'Supply B', 'Small', 180, 28),
	(7, 'Device Zeta', NULL, 'Supply C', 'Large', 130, 45),
	(8, 'Device Eta', NULL, 'Supply A', 'Medium', 170, 33),
	(9, 'Device Theta', NULL, 'Supply B', 'Large', 160, 38),
	(10, 'Device Iota', NULL, 'Supply C', 'Small', 90, 22),
	(11, 'Device Kappa', NULL, 'Supply A', 'Medium', 140, 34),
	(12, 'Device Lambda', NULL, 'Supply B', 'Large', 110, 50),
	(13, 'Device Mu', NULL, 'Supply C', 'Small', 210, 19),
	(14, 'Device Nu', NULL, 'Supply A', 'Medium', 180, 33),
	(15, 'Device Xi', NULL, 'Supply B', 'Large', 125, 40),
	(16, 'Device Omicron', NULL, 'Supply C', 'Small', 95, 21),
	(17, 'Device Pi', NULL, 'Supply A', 'Medium', 160, 36),
	(18, 'Device Rho', NULL, 'Supply B', 'Large', 150, 43),
	(19, 'Device Sigma', NULL, 'Supply C', 'Small', 85, 19),
	(20, 'Device Tau', NULL, 'Supply A', 'Medium', 175, 32),
	(21, 'Device Upsilon', '', 'Supply B', 'Large2', 40, 48);

-- Dumping structure for table erp_electronics.device_components
CREATE TABLE IF NOT EXISTS `device_components` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` int(11) NOT NULL,
  `component_id` int(11) NOT NULL,
  `quantity_per_device` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  KEY `component_id` (`component_id`),
  CONSTRAINT `device_components_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `device_components_ibfk_2` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table erp_electronics.device_components: ~2 rows (approximately)
DELETE FROM `device_components`;
INSERT INTO `device_components` (`id`, `device_id`, `component_id`, `quantity_per_device`) VALUES
	(1, 21, 11, 3),
	(3, 21, 8, 2),
	(6, 20, 6, 8);

-- Dumping structure for table erp_electronics.images
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `component_id` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_device_idx` (`device_id`),
  KEY `fk_component` (`component_id`),
  CONSTRAINT `fk_component` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_device` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table erp_electronics.images: ~1 rows (approximately)
DELETE FROM `images`;
INSERT INTO `images` (`id`, `image_url`, `component_id`, `device_id`) VALUES
	(43, '1743068803268-2images.jpg', 20, NULL);

-- Dumping structure for table erp_electronics.notifications
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `component_id` int(11) DEFAULT NULL,
  `activeStatus` tinyint(4) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_notifications_components` (`component_id`),
  CONSTRAINT `FK_notifications_components` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table erp_electronics.notifications: ~0 rows (approximately)
DELETE FROM `notifications`;

-- Dumping structure for table erp_electronics.storage
CREATE TABLE IF NOT EXISTS `storage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `component_id` int(11) DEFAULT NULL,
  `device_id` int(11) DEFAULT NULL,
  `cabinet` varchar(10) DEFAULT NULL,
  `drawer` varchar(10) DEFAULT NULL,
  `shelf` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `storage_ibfk_1` (`component_id`),
  KEY `storage_ibfk_2` (`device_id`),
  CONSTRAINT `storage_ibfk_1` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `storage_ibfk_2` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table erp_electronics.storage: ~26 rows (approximately)
DELETE FROM `storage`;
INSERT INTO `storage` (`id`, `component_id`, `device_id`, `cabinet`, `drawer`, `shelf`) VALUES
	(1, 1, NULL, 'a', '2', 'a2'),
	(2, 2, NULL, 'b', '3', 'b3'),
	(3, 3, NULL, 'c', '5', 'c5'),
	(4, 4, NULL, 'd', '7', 'd7'),
	(5, 5, NULL, 'e', '9', 'e9'),
	(6, 6, NULL, 'f', '11', 'f11'),
	(7, 7, NULL, 'j', '13', 'j13'),
	(8, 8, NULL, 'h', '15', 'h15'),
	(9, 9, NULL, 'i', '17', 'j17'),
	(10, 10, NULL, 'j', '19', 'j19'),
	(11, 11, NULL, 'j', '19', 'j19'),
	(12, 12, NULL, 'j', '19', 'j19'),
	(13, 13, NULL, NULL, NULL, NULL),
	(14, 14, NULL, NULL, NULL, NULL),
	(15, 15, NULL, NULL, NULL, NULL),
	(16, 6, NULL, NULL, NULL, NULL),
	(17, 17, NULL, NULL, NULL, NULL),
	(18, 18, NULL, NULL, NULL, NULL),
	(19, 19, NULL, NULL, NULL, NULL),
	(20, 20, NULL, '20', NULL, NULL),
	(21, NULL, 2, '1', '2', '2'),
	(22, NULL, 8, '3', '3', '25'),
	(23, NULL, 11, '4', '4', '774'),
	(24, NULL, 17, '4', '4', '4'),
	(27, 24, NULL, '', '', ''),
	(28, 25, NULL, '', '', '');

-- Dumping structure for trigger erp_electronics.insert_component_notification
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
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
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `update_component_notification` AFTER UPDATE ON `components` FOR EACH ROW BEGIN
    IF NEW.required_quantity > NEW.available_quantity THEN
        IF NOT EXISTS (
            SELECT 1 FROM notifications WHERE component_id = NEW.id
        ) THEN
            INSERT INTO notifications (component_id, activeStatus, created_at)
            VALUES (NEW.id, 1, NOW());
        END IF;
    ELSEIF NEW.required_quantity < NEW.available_quantity THEN
        DELETE FROM notifications
        WHERE component_id = NEW.id;
    END IF;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
