use erp_electronics;

CREATE TABLE IF NOT EXISTS `components` (
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
);

CREATE TABLE IF NOT EXISTS `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `purpose` text,
  `electrical_supply` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `available_quantity` int DEFAULT NULL,
  `unit_cost` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `device_components` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `component_id` int NOT NULL,
  `quantity_per_device` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`component_id`) REFERENCES `components`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `component_id` int DEFAULT NULL,
  `device_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_device_idx` (`device_id`),
  KEY `fk_component` (`component_id`),
  CONSTRAINT `fk_component` FOREIGN KEY (`component_id`) REFERENCES `components` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_device` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)


