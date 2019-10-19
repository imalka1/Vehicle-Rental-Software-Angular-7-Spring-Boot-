drop database vehicle_rental_software;

use vehicle_rental_software;

INSERT INTO `vehicle_rental_software`.`customer`
(
`customer_contact_number`,
`customer_email`,
`customer_name`)
VALUES
(123,'im@gmail.com','im');

INSERT INTO `vehicle_rental_software`.`user`
(`user_name`,
`user_password`,
`user_email`,
`user_role`)
VALUES
('imalka','123','im','admin'),('imalka1','456','imm','driver'),('imalka2','123','im','driver');

INSERT INTO `vehicle_rental_software`.`driver`
(`id`,
`driver_contact_number`,
`driver_present`,
`user_id`)
VALUES
('95','077',true,2),('96','077',true,3);

INSERT INTO `vehicle_rental_software`.`vehicle`
(`id`,
`vehicle_category`,
`vehicle_total_passengers`,
`vehicle_name`,
`vehicle_reserved`)
VALUES
('CBA-1111','car',5,'Benz',false),('CBA-2222','car',4,'Toyota',false),('CBA-3333','minivan',4,'Mitsubishi',false),('CBA-4444','minivan',4,'Skoda',false),('CBA-5555','minivan',7,'Nissan',false);

INSERT INTO `vehicle_rental_software`.`place`
(
`latitude`,
`longitude`,
`place_category`,
`place_name`)
VALUES
(7.180272,79.884080,'Airport','Katunayaka'),(6.293070, 81.123698,'Airport','Mattala'),(9.661750, 80.024650,'Disneyland','Disneyland');

INSERT INTO `vehicle_rental_software`.`reservation`
(
`reservation_completed`,
`reservation_date_and_time`,
`reservation_customer_id`,
`reservation_place_from_id`,
`reservation_place_to_id`,
`reservation_vehicle_id`,
`reservation_payment_key`,
`reservation_amount`,
`submission_date_and_time`)
VALUES
(false,'2019-05-05 02:03',1,1,2,1,0,0,curdate()),(true,'2019-05-04 14:05',1,2,3,2,0,0,curdate());

INSERT INTO `vehicle_rental_software`.`reservation`
(
`reservation_completed`,
`reservation_date`,
`reservation_time`,
`reservation_customer_id`,
`reservation_vehicle_id`,
`reservation_payment_key`)
VALUES
(false,'2019-05-05 02:03','02:03',1,1,0),(true,'2019-05-04','14:05',1,2,0);

SELECT `vehicle`.`id`,
    `vehicle`.`vehicle_category`,
    `vehicle`.`vehicle_name`,
    `vehicle`.`vehicle_reserved`,
    `vehicle`.`vehicle_total_passengers`
FROM `vehicle_rental_software`.`vehicle`;


SELECT `user`.`id`,
    `user`.`user_name`,
    `user`.`user_password`,
    `user`.`user_role`
FROM `vehicle_rental_software`.`user`;

SELECT user_id FROM user WHERE user_name='imalka' AND password='123' AND role='admin';

SELECT `reservation`.`id`,
    `reservation`.`reservation_amount`,
    `reservation`.`reservation_completed`,
    `reservation`.`reservation_date_and_time`,
    `reservation`.`reservation_payment_key`,
    `reservation`.`submission_date_and_time`,
    `reservation`.`reservation_customer_id`,
    `reservation`.`reservation_place_from_id`,
    `reservation`.`reservation_place_to_id`,
    `reservation`.`reservation_vehicle_id`
FROM `vehicle_rental_software`.`reservation`;

SELECT `customer`.`id`,
    `customer`.`customer_contact_number`,
    `customer`.`customer_email`,
    `customer`.`customer_name`
FROM `vehicle_rental_software`.`customer`;

SELECT `driver_vehicle`.`id`,
    `driver_vehicle`.`date_of_assigned`,
    `driver_vehicle`.`on_duty`,
    `driver_vehicle`.`driver_id`,
    `driver_vehicle`.`vehicle_id`
FROM `vehicle_rental_software`.`driver_vehicle`;

SELECT `driver`.`id`,
    `driver`.`driver_contact_number`,
    `driver`.`driver_present`,
    `driver`.`user_id`
FROM `vehicle_rental_software`.`driver`;














