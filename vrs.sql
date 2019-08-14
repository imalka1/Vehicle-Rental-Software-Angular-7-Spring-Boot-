drop database vehicle_rental_software;

use vehicle_rental_software;

INSERT INTO `vehicle_rental_software`.`customer`
(
`customer_contact_number`,
`customer_email`,
`customer_name`)
VALUES
(123,'im@gmail.com','im');

INSERT INTO `vehicle_rental_software`.`vehicle`
(
`vehicle_category`,
`vehicle_total_passengers`,
`vehicle_name`)
VALUES
('car',5,'Benz'),('car',4,'Toyota'),('minivan',4,'Mitsubishi'),('minivan',4,'Skoda'),('minivan',7,'Nissan');

INSERT INTO `vehicle_rental_software`.`place`
(
`place_category`,
`place_name`)
VALUES
('Airport','Colombo'),('Airport','Galle'),('Private','Matara'),('Private','Malabe'),('Private','Hambantota'),('Disneyland','Disneyland');

INSERT INTO `vehicle_rental_software`.`user`
(`user_name`,
`user_password`,
`user_role`)
VALUES
('imalka','123','admin'),('imalka1','456','admin');

INSERT INTO `vehicle_rental_software`.`reservation`
(
`reservation_completed`,
`reservation_date`,
`reservation_time`,
`reservation_customer_id`,
`reservation_place_from_id`,
`reservation_place_to_id`,
`reservation_vehicle_id`,
`reservation_payment_key`,
`reservation_amount`,
`submission_date_and_time`)
VALUES
(false,'2019-05-05','02:03',1,1,2,1,0,0,curdate()),(true,'2019-05-04','14:05',1,2,3,2,0,0,curdate());

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

SELECT `place`.`id`,
    `place`.`place_category`,
    `place`.`place_name`
FROM `vehicle_rental_software`.`place`;

SELECT `vehicle`.`id`,
    `vehicle`.`vehicle_category`,
    `vehicle`.`vehicle_name`,
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

















