drop database vehicle_rental_software;

use vehicle_rental_software;

INSERT INTO `vehicle_rental_software`.`vehicle`
(`id`,
`vehicle_category`,
`vehicle_name`,
`vehicle_total_passengers`)
VALUES
('car',5,'Benz'),('car',4,'Toyota'),('minivan',4,'Mitsubishi'),('minivan',4,'Skoda'),('minivan',7,'Nissan');

INSERT INTO `vehicle_rental_software`.`place`
(`id`,
`place_category`,
`place_name`)
VALUES
('Airport','Colombo'),('Airport','Galle'),('Private','Matara'),('Private','Malabe'),('Private','Hambantota'),('Disneyland','Disneyland');

INSERT INTO `vehicle_rental_software`.`user`
(`id`,
`user_name`,
`user_password`,
`user_role`)
VALUES
('123','admin','imalka'),('456','admin','imalka1');

INSERT INTO `vehicle_rental_software`.`reservation`
(`id`,
`reservation_completed`,
`reservation_date`,
`reservation_time`,
`reservation_customer_id`,
`reservation_place_from_id`,
`reservation_place_to_id`,
`reservation_vehicle_id`)
VALUES
(false,'2019-05-05','02:03',1,2,1),(true,'2019-05-04','14:05',2,3,2);

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
    `reservation`.`reservation_completed`,
    `reservation`.`reservation_date`,
    `reservation`.`reservation_time`,
    `reservation`.`reservation_customer_id`,
    `reservation`.`reservation_place_from_id`,
    `reservation`.`reservation_place_to_id`,
    `reservation`.`reservation_vehicle_id`
FROM `vehicle_rental_software`.`reservation`;














