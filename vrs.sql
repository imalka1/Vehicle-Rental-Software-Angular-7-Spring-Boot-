drop database vehicle_rental_software;


INSERT INTO `vehicle_rental_software`.`vehicle`
(
`category`,
`total_passengers`,
`vehicle_name`)
VALUES
('car',5,'Benz'),('car',4,'Toyota'),('minivan',4,'Mitsubishi'),('minivan',4,'Skoda'),('minivan',7,'Nissan');


INSERT INTO `vehicle_rental_software`.`place`
(
`category`,
`place_name`)
VALUES
('airport','Colombo'),('airport','Galle'),('private','Matara'),('private','Malabe'),('private','Hambantota');

SELECT `place`.`place_id`,
    `place`.`category`,
    `place`.`place_name`
FROM `vehicle_rental_software`.`place`;

SELECT `vehicle`.`vehicle_id`,
    `vehicle`.`category`,
    `vehicle`.`total_passengers`,
    `vehicle`.`vehicle_name`
FROM `vehicle_rental_software`.`vehicle`;





